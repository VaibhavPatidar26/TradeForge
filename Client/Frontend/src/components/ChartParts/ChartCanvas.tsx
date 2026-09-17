import { useEffect, useRef, useState, useCallback } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import type { LogicalRange, ISeriesApi } from "lightweight-charts";
import type { Stock, TimeframeConfig, DrawingTool, Point, TrendlineData } from "./types";

interface ChartCanvasProps {
    stock: Stock;
    chartUnit: string;
    singleCandleDuration: number;
    fromDate: string;
    toDate: string;
    token: string | null;
    timeframes: TimeframeConfig[];
    activeTool: DrawingTool;
    isLoading: boolean;
    setIsLoading: (val: boolean) => void;
    setIsLazyLoading: (val: boolean) => void;
    setDrawingStep: (step: number) => void;
    setActiveTool: (tool: DrawingTool) => void;
    setTotalLinesCount: (count: number) => void;
}

// ── Helper Functions ─────────────────────────────────────────────────────────────

/** Snap unix timestamp (seconds) to bar interval start */
function getBarTime(timestampInSeconds: number, unit: string, interval: number): number {
    let intervalInSeconds = 60;
    if (unit === "minutes") intervalInSeconds = interval * 60;
    else if (unit === "hours") intervalInSeconds = interval * 3600;
    else if (unit === "days") intervalInSeconds = 86400;

    return Math.floor(timestampInSeconds / intervalInSeconds) * intervalInSeconds;
}

/** Get candle timestamp from logical index */
function getTimeFromLogical(logical: number, candles: any[], durationMinutes: number, unit: string): number {
    if (candles.length === 0) return Math.floor(Date.now() / 1000);

    let intervalSec = 60;
    if (unit === "minutes") intervalSec = durationMinutes * 60;
    else if (unit === "hours") intervalSec = durationMinutes * 3600;
    else if (unit === "days") intervalSec = 86400;

    const index = Math.round(logical);
    if (index >= 0 && index < candles.length) {
        return candles[index].time;
    }
    if (index >= candles.length) {
        const last = candles[candles.length - 1];
        return last.time + (index - (candles.length - 1)) * intervalSec;
    }
    const first = candles[0];
    return first.time + index * intervalSec;
}

/** Dynamic conversion from timestamp to logical index across timeframes */
function getLogicalFromTime(time: number, candles: any[], durationMinutes: number, unit: string): number {
    if (candles.length === 0) return 0;

    const first = candles[0];
    const last = candles[candles.length - 1];

    // 1. Try exact timestamp match first
    let low = 0;
    let high = candles.length - 1;
    while (low <= high) {
        const mid = (low + high) >> 1;
        if (candles[mid].time === time) return mid;
        if (candles[mid].time < time) low = mid + 1;
        else high = mid - 1;
    }

    // 2. If current timeframe is Daily ("days"): match by IST calendar date (YYYY-MM-DD)
    if (unit === "days") {
        const targetDateStr = new Date(time * 1000).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
        for (let i = 0; i < candles.length; i++) {
            const candleDateStr = new Date(candles[i].time * 1000).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
            if (candleDateStr === targetDateStr) {
                return i;
            }
        }
    } else {
        // 3. Current timeframe is Intraday ("minutes" / "hours"):
        // Find the candle with the closest timestamp within dataset bounds
        if (time >= first.time && time <= last.time) {
            let closestIdx = 0;
            let minDiff = Math.abs(candles[0].time - time);
            for (let i = 1; i < candles.length; i++) {
                const diff = Math.abs(candles[i].time - time);
                if (diff < minDiff) {
                    minDiff = diff;
                    closestIdx = i;
                }
            }
            return closestIdx;
        }
    }

    // 4. Extrapolate linearly for timestamps outside dataset range (future or past)
    let intervalSec = 60;
    if (unit === "minutes") intervalSec = durationMinutes * 60;
    else if (unit === "hours") intervalSec = durationMinutes * 3600;
    else if (unit === "days") intervalSec = 86400;

    if (time > last.time) {
        return (candles.length - 1) + (time - last.time) / intervalSec;
    } else {
        return (time - first.time) / intervalSec;
    }
}

/** Parse raw candle data into lightweight-charts format */
function parseRawCandles(candlesArray: any[]): any[] {
    return candlesArray
        .map((c) => ({
            time: Math.floor(new Date(c[0]).getTime() / 1000),
            open: Number(c[1]),
            high: Number(c[2]),
            low: Number(c[3]),
            close: Number(c[4]),
        }))
        .sort((a, b) => a.time - b.time);
}

/** Merge two candle arrays & deduplicate */
function mergeAndDeduplicate(existing: any[], incoming: any[]): any[] {
    const map = new Map<number, any>();
    for (const c of incoming) map.set(c.time, c);
    for (const c of existing) map.set(c.time, c);

    return Array.from(map.values()).sort((a, b) => a.time - b.time);
}

// ── ChartCanvas Component ─────────────────────────────────────────────────────

export function ChartCanvas({
    stock,
    chartUnit,
    singleCandleDuration,
    fromDate,
    toDate,
    token,
    timeframes,
    isLoading,
    activeTool,
    setIsLoading,
    setIsLazyLoading,
    setDrawingStep,
    setActiveTool,
    setTotalLinesCount,
}: ChartCanvasProps) {
    const chartContainer      = useRef<HTMLDivElement | null>(null);
    const chartInstanceRef    = useRef<ReturnType<typeof createChart> | null>(null);
    const seriesRef           = useRef<ISeriesApi<"Candlestick"> | null>(null);
    const wsRef               = useRef<WebSocket | null>(null);

    // SVG DOM Element Refs for 0-lag RAF sync
    const previewLineRef   = useRef<SVGLineElement | null>(null);
    const previewCircleRef = useRef<SVGCircleElement | null>(null);

    // Data Refs
    const currentCandleRef    = useRef<any>(null);
    const candlesRef          = useRef<any[]>([]);
    const oldestCandleTimeRef = useRef<number | null>(null);
    const isFetchingMoreRef   = useRef<boolean>(false);
    const hasMoreHistoryRef   = useRef<boolean>(true);

    // Trendline State
    const [trendlines, setTrendlines]         = useState<TrendlineData[]>([]);
    const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
    const [drawingStart, setDrawingStart]     = useState<Point | null>(null);
    const [mousePos, setMousePos]             = useState<{ x: number; y: number } | null>(null);

    // Keep Refs synced for RAF loop
    const trendlinesRef   = useRef<TrendlineData[]>(trendlines);
    const drawingStartRef = useRef<Point | null>(drawingStart);
    const mousePosRef     = useRef<{ x: number; y: number } | null>(mousePos);

    useEffect(() => { trendlinesRef.current = trendlines; }, [trendlines]);
    useEffect(() => { drawingStartRef.current = drawingStart; }, [drawingStart]);
    useEffect(() => { mousePosRef.current = mousePos; }, [mousePos]);

    // Dragging State
    const [draggingState, setDraggingState] = useState<{
        lineId: string;
        handle: "start" | "end" | "body";
        startX: number;
        startY: number;
        origStart: Point;
        origEnd: Point;
    } | null>(null);

    // Update total lines count prop
    useEffect(() => {
        setTotalLinesCount(trendlines.length);
    }, [trendlines, setTotalLinesCount]);

    // ── Ultra-Fast Synchronous Point-to-Screen Mapping ───────────────────────
    const pointToScreen = useCallback((pt: Point): { x: number; y: number } | null => {
        if (!chartInstanceRef.current || !seriesRef.current) return null;

        // Try native timestamp lookup first
        let x = chartInstanceRef.current.timeScale().timeToCoordinate(pt.time as any);

        // Fallback to logical index calculation if timestamp is off-screen or between bars
        if (x === null) {
            const logical = getLogicalFromTime(pt.time, candlesRef.current, singleCandleDuration, chartUnit);
            x = chartInstanceRef.current.timeScale().logicalToCoordinate(logical as any);
        }

        const y = seriesRef.current.priceToCoordinate(pt.price);
        if (x === null || y === null) return null;
        return { x, y };
    }, [singleCandleDuration, chartUnit]);

    // ── 0-Lag RAF DOM Synchronization Loop ───────────────────────────────────
    const syncOverlayDOM = useCallback(() => {
        if (!chartInstanceRef.current || !seriesRef.current) return;

        // 1. Sync live preview line
        if (drawingStartRef.current && mousePosRef.current && previewLineRef.current) {
            const p1 = pointToScreen(drawingStartRef.current);
            if (p1) {
                previewLineRef.current.setAttribute("x1", p1.x.toString());
                previewLineRef.current.setAttribute("y1", p1.y.toString());
                previewLineRef.current.setAttribute("x2", mousePosRef.current.x.toString());
                previewLineRef.current.setAttribute("y2", mousePosRef.current.y.toString());
                previewLineRef.current.setAttribute("visibility", "visible");

                if (previewCircleRef.current) {
                    previewCircleRef.current.setAttribute("cx", p1.x.toString());
                    previewCircleRef.current.setAttribute("cy", p1.y.toString());
                    previewCircleRef.current.setAttribute("visibility", "visible");
                }
            }
        }

        // 2. Sync finalized trendlines
        for (const line of trendlinesRef.current) {
            const p1 = pointToScreen(line.start);
            const p2 = pointToScreen(line.end);

            const hitEl = document.getElementById(`tl-hit-${line.id}`);
            const visEl = document.getElementById(`tl-vis-${line.id}`);
            const startEl = document.getElementById(`tl-start-${line.id}`);
            const endEl = document.getElementById(`tl-end-${line.id}`);

            if (!p1 || !p2) {
                if (hitEl) hitEl.setAttribute("visibility", "hidden");
                if (visEl) visEl.setAttribute("visibility", "hidden");
                if (startEl) startEl.setAttribute("visibility", "hidden");
                if (endEl) endEl.setAttribute("visibility", "hidden");
                continue;
            }

            if (hitEl) {
                hitEl.setAttribute("x1", p1.x.toString());
                hitEl.setAttribute("y1", p1.y.toString());
                hitEl.setAttribute("x2", p2.x.toString());
                hitEl.setAttribute("y2", p2.y.toString());
                hitEl.setAttribute("visibility", "visible");
            }
            if (visEl) {
                visEl.setAttribute("x1", p1.x.toString());
                visEl.setAttribute("y1", p1.y.toString());
                visEl.setAttribute("x2", p2.x.toString());
                visEl.setAttribute("y2", p2.y.toString());
                visEl.setAttribute("visibility", "visible");
            }
            if (startEl) {
                startEl.setAttribute("cx", p1.x.toString());
                startEl.setAttribute("cy", p1.y.toString());
                startEl.setAttribute("visibility", "visible");
            }
            if (endEl) {
                endEl.setAttribute("cx", p2.x.toString());
                endEl.setAttribute("cy", p2.y.toString());
                endEl.setAttribute("visibility", "visible");
            }
        }
    }, [pointToScreen]);

    // Continuous RAF Sync when drawings exist or tool is active
    useEffect(() => {
        let animId: number;
        const loop = () => {
            syncOverlayDOM();
            animId = requestAnimationFrame(loop);
        };
        animId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animId);
    }, [syncOverlayDOM]);

    // 1. Lock/Unlock Chart Scroll & Scale when drawing or dragging
    useEffect(() => {
        if (chartInstanceRef.current) {
            if (activeTool !== null || draggingState !== null) {
                chartInstanceRef.current.applyOptions({
                    handleScroll: false,
                    handleScale: false,
                });
            } else {
                chartInstanceRef.current.applyOptions({
                    handleScroll: { mouseWheel: true, pressedMouseMove: true, vertTouchDrag: true, horzTouchDrag: true },
                    handleScale: { mouseWheel: true, pinch: true, axisPressedMouseMove: { time: true, price: true } },
                });
            }
        }
    }, [activeTool, draggingState]);

    // Reset drawing state when activeTool turns off
    useEffect(() => {
        if (activeTool === null) {
            setDrawingStart(null);
            setMousePos(null);
            setDrawingStep(1);
        }
    }, [activeTool, setDrawingStep]);

    // 2. Keyboard listeners (Escape to cancel/deselect, Delete to remove selected)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setActiveTool(null);
                setDrawingStart(null);
                setMousePos(null);
                setSelectedLineId(null);
            }
            if ((e.key === "Delete" || e.key === "Backspace") && selectedLineId) {
                setTrendlines((prev) => prev.filter((l) => l.id !== selectedLineId));
                setSelectedLineId(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [setActiveTool, selectedLineId]);

    // 3. Clear Event Listener
    useEffect(() => {
        const handleClearEvent = () => {
            setTrendlines([]);
            setSelectedLineId(null);
            setDrawingStart(null);
            setMousePos(null);
        };
        window.addEventListener("tradeforge-clear-drawings", handleClearEvent);
        return () => window.removeEventListener("tradeforge-clear-drawings", handleClearEvent);
    }, []);

    const prevInstrumentKeyRef = useRef<string | null>(null);

    // 4. Main Chart Setup & WebSocket Initialization
    useEffect(() => {
        if (!chartContainer.current || !stock?.instrument_key) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setIsLazyLoading(false);
        candlesRef.current = [];
        oldestCandleTimeRef.current = null;
        isFetchingMoreRef.current = false;
        hasMoreHistoryRef.current = true;

        // Clear trendlines ONLY when switching to a different stock
        if (prevInstrumentKeyRef.current !== stock.instrument_key) {
            setTrendlines([]);
            prevInstrumentKeyRef.current = stock.instrument_key;
        }

        setSelectedLineId(null);
        setDrawingStart(null);
        setMousePos(null);

        const chart = createChart(chartContainer.current, {
            width: chartContainer.current.clientWidth,
            height: chartContainer.current.clientHeight,
            layout: { background: { color: "#000000" }, textColor: "#d1d5db" },
            grid: { vertLines: { color: "#1f2937" }, horzLines: { color: "#1f2937" } },
            rightPriceScale: { autoScale: false },
            localization: {
                timeFormatter: (timestamp: number) => {
                    const date = new Date(timestamp * 1000);
                    if (chartUnit === "days") {
                        return date.toLocaleDateString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        });
                    }
                    return date.toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    });
                },
            },
            timeScale: {
                timeVisible: chartUnit !== "days",
                secondsVisible: false,
                borderColor: "#1f2937",
                tickMarkFormatter: (timestamp: number, tickMarkType: number) => {
                    const date = new Date(timestamp * 1000);
                    if (chartUnit === "days") {
                        return date.toLocaleDateString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "short",
                        });
                    }
                    const timeStr = date.toLocaleTimeString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    });
                    if (tickMarkType <= 2) {
                        const dateStr = date.toLocaleDateString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "short",
                        });
                        return `${dateStr} ${timeStr}`;
                    }
                    return timeStr;
                },
            },
            handleScroll: { mouseWheel: true, pressedMouseMove: true, vertTouchDrag: true, horzTouchDrag: true },
            handleScale: { mouseWheel: true, pinch: true, axisPressedMouseMove: { time: true, price: true } },
        });

        chartInstanceRef.current = chart;
        const series = chart.addSeries(CandlestickSeries);
        seriesRef.current = series;

        // Sync overlay on pan/zoom
        chart.timeScale().subscribeVisibleLogicalRangeChange(() => {
            syncOverlayDOM();
        });

        // ── Lazy Loading Scroll Listener ───────────────────────────────────────
        chart.timeScale().subscribeVisibleLogicalRangeChange((newRange: LogicalRange | null) => {
            if (
                newRange !== null &&
                newRange.from < 15 &&
                !isFetchingMoreRef.current &&
                hasMoreHistoryRef.current &&
                oldestCandleTimeRef.current !== null &&
                wsRef.current?.readyState === WebSocket.OPEN
            ) {
                isFetchingMoreRef.current = true;
                setIsLazyLoading(true);

                const oldestDate = new Date(oldestCandleTimeRef.current * 1000);
                const fetchToDate = oldestDate.toISOString().split("T")[0];

                const tfConfig = timeframes.find((tf) => tf.unit === chartUnit && tf.duration === singleCandleDuration);
                const chunkDays = tfConfig ? tfConfig.chunkDays : 30;

                const fetchFromDateObj = new Date(oldestDate);
                fetchFromDateObj.setDate(fetchFromDateObj.getDate() - chunkDays);
                const fetchFromDate = fetchFromDateObj.toISOString().split("T")[0];

                wsRef.current.send(
                    JSON.stringify({
                        type: "FETCH_MORE_CANDLES",
                        instrument_key: stock.instrument_key,
                        candleDuration: singleCandleDuration,
                        unit: chartUnit,
                        from_date: fetchFromDate,
                        to_date: fetchToDate,
                    })
                );
            }
        });

        // ── WebSocket Connection ───────────────────────────────────────────────
        const ws = new WebSocket("ws://localhost:8080");
        wsRef.current = ws;

        ws.onopen = () => {
            ws.send(JSON.stringify({ type: "auth_connection", token }));
            ws.send(
                JSON.stringify({
                    type: "CANDLE_STICK",
                    instrument_key: stock.instrument_key,
                    candleDuration: singleCandleDuration,
                    unit: chartUnit,
                    from_date: fromDate,
                    to_date: toDate,
                })
            );
        };

        ws.onmessage = (event) => {
            let data: any;
            try { data = JSON.parse(event.data); } catch { return; }

            switch (data.type) {
                case "SENDING_CANDLE_DATA": {
                    if (Array.isArray(data.candles)) {
                        const uniqueCandles = parseRawCandles(data.candles);
                        candlesRef.current = uniqueCandles;

                        if (uniqueCandles.length > 0) {
                            oldestCandleTimeRef.current = uniqueCandles[0].time;
                            currentCandleRef.current = uniqueCandles[uniqueCandles.length - 1];
                        }

                        series.setData(uniqueCandles);

                        const priceScale = series.priceScale();
                        priceScale.applyOptions({ autoScale: true });
                        requestAnimationFrame(() => priceScale.applyOptions({ autoScale: false }));

                        const total = uniqueCandles.length;
                        chart.timeScale().setVisibleLogicalRange({ from: total - 100, to: total + 5 });
                    }
                    setIsLoading(false);
                    syncOverlayDOM();
                    break;
                }

                case "MORE_CANDLES_DATA": {
                    if (Array.isArray(data.candles) && data.candles.length > 0) {
                        const newCandles = parseRawCandles(data.candles);
                        const merged = mergeAndDeduplicate(candlesRef.current, newCandles);
                        candlesRef.current = merged;

                        if (merged.length > 0) oldestCandleTimeRef.current = merged[0].time;
                        series.setData(merged);
                    } else {
                        hasMoreHistoryRef.current = false;
                    }
                    isFetchingMoreRef.current = false;
                    setIsLazyLoading(false);
                    syncOverlayDOM();
                    break;
                }

                case "PRICE_UPDATE": {
                    if (data.instrumentKey === stock?.instrument_key) {
                        const newPrice = Number(data.price);
                        if (isNaN(newPrice)) return;

                        const nowInSec = Math.floor(Date.now() / 1000);
                        const barTime = getBarTime(nowInSec, chartUnit, singleCandleDuration);

                        if (!currentCandleRef.current || currentCandleRef.current.time !== barTime) {
                            currentCandleRef.current = {
                                time: barTime,
                                open: newPrice,
                                high: newPrice,
                                low: newPrice,
                                close: newPrice,
                            };
                        } else {
                            currentCandleRef.current = {
                                ...currentCandleRef.current,
                                high: Math.max(currentCandleRef.current.high, newPrice),
                                low: Math.min(currentCandleRef.current.low, newPrice),
                                close: newPrice,
                            };
                        }

                        series.update(currentCandleRef.current);
                        syncOverlayDOM();
                    }
                    break;
                }
            }
        };

        ws.onerror = () => {
            setIsLoading(false);
            setIsLazyLoading(false);
        };

        return () => {
            ws.close();
            chart.remove();
            wsRef.current = null;
            seriesRef.current = null;
            chartInstanceRef.current = null;
        };
    }, [stock, chartUnit, singleCandleDuration, fromDate, toDate, token, timeframes, setIsLoading, setIsLazyLoading, syncOverlayDOM]);

    // ── Overlay Pointer Event Handlers ───────────────────────────────────────────

    const handleContainerPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!chartContainer.current || !chartInstanceRef.current || !seriesRef.current) return;

        // If active tool is trendline, handle drawing clicks
        if (activeTool === "trendline") {
            const rect = chartContainer.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const logical = chartInstanceRef.current.timeScale().coordinateToLogical(x);
            const price = seriesRef.current.coordinateToPrice(y);

            if (logical === null || price === null || isNaN(price)) return;

            const time = getTimeFromLogical(logical, candlesRef.current, singleCandleDuration, chartUnit);
            const currentPoint: Point = { time, price, logical };

            // Step 1: Set Start Point
            if (!drawingStart) {
                setDrawingStart(currentPoint);
                setMousePos({ x, y });
                setDrawingStep(2);
            }
            // Step 2: Set End Point & Finalize Line
            else {
                const newLine: TrendlineData = {
                    id: Date.now().toString(),
                    start: drawingStart,
                    end: currentPoint,
                    color: "#3b82f6",
                };
                setTrendlines((lines) => [...lines, newLine]);
                setSelectedLineId(newLine.id);
                setDrawingStart(null);
                setMousePos(null);
                setDrawingStep(1);
                setActiveTool(null);
            }
        }
        // If clicking empty canvas space, deselect line
        else if (selectedLineId && !draggingState) {
            setSelectedLineId(null);
        }
    };

    const handleContainerPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!chartContainer.current || !chartInstanceRef.current || !seriesRef.current) return;

        const rect = chartContainer.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Case A: Drawing Live Preview Line
        if (activeTool === "trendline" && drawingStart) {
            setMousePos({ x, y });
            return;
        }

        // Case B: Dragging Existing Trendline (Body or Handles)
        if (draggingState) {
            const currentPrice = seriesRef.current.coordinateToPrice(y);
            const currentLogical = chartInstanceRef.current.timeScale().coordinateToLogical(x);

            if (currentPrice === null || currentLogical === null || isNaN(currentPrice)) return;
            const currentTime = getTimeFromLogical(currentLogical, candlesRef.current, singleCandleDuration, chartUnit);

            const currentPoint: Point = { time: currentTime, price: currentPrice, logical: currentLogical };

            setTrendlines((prev) =>
                prev.map((line) => {
                    if (line.id !== draggingState.lineId) return line;

                    if (draggingState.handle === "start") {
                        return { ...line, start: currentPoint };
                    }
                    if (draggingState.handle === "end") {
                        return { ...line, end: currentPoint };
                    }
                    if (draggingState.handle === "body") {
                        const startMousePrice = seriesRef.current?.coordinateToPrice(draggingState.startY) ?? currentPrice;
                        const startMouseLogical = chartInstanceRef.current?.timeScale().coordinateToLogical(draggingState.startX) ?? currentLogical;

                        const priceDelta = currentPrice - startMousePrice;
                        const logicalDelta = currentLogical - startMouseLogical;

                        const origStartLogical = getLogicalFromTime(draggingState.origStart.time, candlesRef.current, singleCandleDuration, chartUnit);
                        const origEndLogical = getLogicalFromTime(draggingState.origEnd.time, candlesRef.current, singleCandleDuration, chartUnit);

                        const newStartLogical = origStartLogical + logicalDelta;
                        const newEndLogical = origEndLogical + logicalDelta;

                        return {
                            ...line,
                            start: {
                                logical: newStartLogical,
                                price: draggingState.origStart.price + priceDelta,
                                time: getTimeFromLogical(newStartLogical, candlesRef.current, singleCandleDuration, chartUnit),
                            },
                            end: {
                                logical: newEndLogical,
                                price: draggingState.origEnd.price + priceDelta,
                                time: getTimeFromLogical(newEndLogical, candlesRef.current, singleCandleDuration, chartUnit),
                            },
                        };
                    }
                    return line;
                })
            );
        }
    };

    const handleContainerPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (draggingState) {
            try { (e.target as Element).releasePointerCapture(e.pointerId); } catch {}
            setDraggingState(null);
        }
    };

    const drawingStartScreen = drawingStart ? pointToScreen(drawingStart) : null;

    return (
        <div
            className={`relative flex-1 w-full h-full ${activeTool !== null ? "cursor-crosshair" : ""}`}
            onPointerDown={handleContainerPointerDown}
            onPointerMove={handleContainerPointerMove}
            onPointerUp={handleContainerPointerUp}
        >
            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900/60 backdrop-blur-xs text-white select-none">
                    <span className="text-sm font-medium">Loading chart…</span>
                </div>
            )}

            {/* Interactive SVG Overlay */}
            <svg
                className={`absolute inset-0 w-full h-full z-10 overflow-hidden ${
                    activeTool !== null ? "pointer-events-auto cursor-crosshair" : "pointer-events-none"
                }`}
            >
                {/* Live Preview Line (Start Point -> Cursor) */}
                {drawingStartScreen && mousePos && (
                    <g>
                        <line
                            ref={previewLineRef}
                            x1={drawingStartScreen.x}
                            y1={drawingStartScreen.y}
                            x2={mousePos.x}
                            y2={mousePos.y}
                            stroke="#60a5fa"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                        />
                        <circle
                            ref={previewCircleRef}
                            cx={drawingStartScreen.x}
                            cy={drawingStartScreen.y}
                            r={5}
                            fill="#60a5fa"
                        />
                    </g>
                )}

                {/* Finalized Interactive Trendlines */}
                {trendlines.map((line) => {
                    const p1 = pointToScreen(line.start);
                    const p2 = pointToScreen(line.end);
                    const isSelected = line.id === selectedLineId;

                    return (
                        <g key={line.id} className="pointer-events-auto">
                            {/* Invisible wider hit region for body clicking/dragging */}
                            <line
                                id={`tl-hit-${line.id}`}
                                x1={p1?.x ?? 0}
                                y1={p1?.y ?? 0}
                                x2={p2?.x ?? 0}
                                y2={p2?.y ?? 0}
                                stroke="transparent"
                                strokeWidth={14}
                                className="cursor-move"
                                onPointerDown={(e) => {
                                    e.stopPropagation();
                                    if (activeTool !== null) return;
                                    setSelectedLineId(line.id);
                                    if (chartContainer.current) {
                                        try { (e.target as Element).setPointerCapture(e.pointerId); } catch {}
                                        const rect = chartContainer.current.getBoundingClientRect();
                                        setDraggingState({
                                            lineId: line.id,
                                            handle: "body",
                                            startX: e.clientX - rect.left,
                                            startY: e.clientY - rect.top,
                                            origStart: line.start,
                                            origEnd: line.end,
                                        });
                                    }
                                }}
                            />

                            {/* Visible Trendline */}
                            <line
                                id={`tl-vis-${line.id}`}
                                x1={p1?.x ?? 0}
                                y1={p1?.y ?? 0}
                                x2={p2?.x ?? 0}
                                y2={p2?.y ?? 0}
                                stroke={isSelected ? "#60a5fa" : line.color}
                                strokeWidth={isSelected ? 3 : 2}
                                className="cursor-pointer"
                            />

                            {/* Start Point Handle Circle */}
                            {isSelected && (
                                <circle
                                    id={`tl-start-${line.id}`}
                                    cx={p1?.x ?? 0}
                                    cy={p1?.y ?? 0}
                                    r={6}
                                    fill="#ffffff"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    className="cursor-grab active:cursor-grabbing hover:scale-125 transition-transform"
                                    onPointerDown={(e) => {
                                        e.stopPropagation();
                                        if (activeTool !== null) return;
                                        setSelectedLineId(line.id);
                                        if (chartContainer.current) {
                                            try { (e.target as Element).setPointerCapture(e.pointerId); } catch {}
                                            const rect = chartContainer.current.getBoundingClientRect();
                                            setDraggingState({
                                                lineId: line.id,
                                                handle: "start",
                                                startX: e.clientX - rect.left,
                                                startY: e.clientY - rect.top,
                                                origStart: line.start,
                                                origEnd: line.end,
                                            });
                                        }
                                    }}
                                />
                            )}

                            {/* End Point Handle Circle */}
                            {isSelected && (
                                <circle
                                    id={`tl-end-${line.id}`}
                                    cx={p2?.x ?? 0}
                                    cy={p2?.y ?? 0}
                                    r={6}
                                    fill="#ffffff"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    className="cursor-grab active:cursor-grabbing hover:scale-125 transition-transform"
                                    onPointerDown={(e) => {
                                        e.stopPropagation();
                                        if (activeTool !== null) return;
                                        setSelectedLineId(line.id);
                                        if (chartContainer.current) {
                                            try { (e.target as Element).setPointerCapture(e.pointerId); } catch {}
                                            const rect = chartContainer.current.getBoundingClientRect();
                                            setDraggingState({
                                                lineId: line.id,
                                                handle: "end",
                                                startX: e.clientX - rect.left,
                                                startY: e.clientY - rect.top,
                                                origStart: line.start,
                                                origEnd: line.end,
                                            });
                                        }
                                    }}
                                />
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Lightweight Chart Container */}
            <div ref={chartContainer} className="w-full h-full" />
        </div>
    );
}

export default ChartCanvas;
