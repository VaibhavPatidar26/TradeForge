
import { useStockStore } from "../../store/stockStore";
import { useEffect } from "react";

const socketUrl = import.meta.env.VITE_SOCKET_URL;

function Chart() {

    const stock = useStockStore(function (state) {
        return state.stock;
    });

    const chartUnit = useStockStore(function (state) {
        return state.chartUnit;
    });

    const chartInterval = useStockStore(function (state) {
        return state.chartInterval;
    });

    const fromDate = useStockStore(function (state) {
        return state.fromDate;
    });

    const toDate = useStockStore(function (state) {
        return state.toDate;
    });


    useEffect(function () {

        if (!stock) {
            return;
        }

        const ws = new WebSocket(socketUrl);


        ws.onopen = function () {

            console.log("Chart socket connected");


            // FIRST: frontend sends request
            ws.send(JSON.stringify({

                type: "CANDLE_STICK",

                instrument_key: stock.instrument_key,

                candleDuration: chartInterval,

                from_date: fromDate,

                to_date: toDate,

                unit: chartUnit

            }));

        };


        // SECOND: frontend receives backend response
        ws.onmessage = function (event) {

            const message = JSON.parse(event.data);

            console.log("Received from backend:", message);


            if (message.type === "SENDING_CANDLE_DATA") {

                console.log("Candles:", message.candles);

                // Later:
                // series.setData(message.candles);

            }

        };


        ws.onerror = function (error) {
            console.log("Chart socket error:", error);
        };


        ws.onclose = function () {
            console.log("Chart socket closed");
        };


        return function () {
            ws.close();
        };

    }, [
        stock,
        chartUnit,
        chartInterval,
        fromDate,
        toDate
    ]);


    return (
        <div>
            display chart here
        </div>
    );
}

export default Chart;

