export interface Stock {
    instrument_key: string;
    name: string;
    exchange: string;
    trading_symbol: string;
    segment: string;
    instrument_type: string;
}

export interface TimeframeConfig {
    label: string;
    unit: string;
    duration: number;
    initialDays: number;
    chunkDays: number;
}

export const TIMEFRAMES: TimeframeConfig[] = [
    { label: "1m",  unit: "minutes", duration: 1,  initialDays: 15,  chunkDays: 15  },
    { label: "2m",  unit: "minutes", duration: 2,  initialDays: 15,  chunkDays: 15  },
    { label: "3m",  unit: "minutes", duration: 3,  initialDays: 30,  chunkDays: 30  },
    { label: "5m",  unit: "minutes", duration: 5,  initialDays: 30,  chunkDays: 30  },
    { label: "15m", unit: "minutes", duration: 15, initialDays: 60,  chunkDays: 60  },
    { label: "30m", unit: "minutes", duration: 30, initialDays: 90,  chunkDays: 90  },
    { label: "1H",  unit: "hours",   duration: 1,  initialDays: 180, chunkDays: 180 },
    { label: "1D",  unit: "days",    duration: 1,  initialDays: 365, chunkDays: 365 },
];

export interface Point {
    time: number;
    price: number;
    logical: number;
}

export interface TrendlineData {
    id: string;
    start: Point;
    end: Point;
    color: string;
}

export type DrawingTool = "trendline" | null;
