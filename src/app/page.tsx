"use client";
import OrdersTable from "@/components/OrdersTable";
import Chart from "@/components/Chart";
import Controls from "@/components/Controls";
import { fetchChartData } from "@/utils/getChartData";
import { useEffect, useState } from "react";
import { ChartData, OrderType } from "@/types";
import { Time } from "lightweight-charts";

export default function Home() {
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [interval, setInterval] = useState("1m");
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [orders, setOrders] = useState<OrderType[]>([]);

    useEffect(() => {
        fetchChartData(symbol, interval, setChartData);
        setOrders([]);
    }, [symbol, interval]);

    useEffect(() => {
        const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@trade`);
        // const socket2 = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`);
        // socket2.onmessage = (event) => {
        //     const trade = JSON.parse(event.data);
        //     const time = trade.E;
        //     const open = parseFloat(trade.k.o);
        //     const high = parseFloat(trade.k.h);
        //     const low = parseFloat(trade.k.l);
        //     const close = parseFloat(trade.k.c);
        //     if (chartData[chartData.length - 1].open !== open) {
        //         setChartData((pre) => [
        //             ...pre.slice(1),
        //             {
        //                 time: time,
        //                 open: open,
        //                 high: high,
        //                 low: low,
        //                 close: close,
        //             },
        //         ]);
        //     }
        // };
        socket.onmessage = (event) => {
            const trade = JSON.parse(event.data);
            const updatedChartData = [
                ...chartData.slice(4),
                {
                    time: trade.T,
                    open: parseFloat(trade.p),
                    high: parseFloat(trade.p),
                    low: parseFloat(trade.p),
                    close: parseFloat(trade.p),
                },
            ];
            if (chartData[chartData.length - 1].open !== parseFloat(trade.p)) {
                setChartData(updatedChartData);
            }
            if (trade.m) {
                setOrders((prev) => [
                    ...prev,
                    {
                        time: trade.T,
                        price: parseFloat(trade.p),
                        type: "BUY",
                        quantity: parseFloat(trade.q),
                    },
                ]);
            } else {
                setOrders((prev) => [
                    ...prev,
                    {
                        time: trade.T,
                        price: parseFloat(trade.p),
                        type: "SELL",
                        quantity: parseFloat(trade.q),
                    },
                ]);
            }
        };

        return () => {
            socket.close();
            // socket2.close();
        };
    }, [chartData, interval, symbol]);

    return (
        <div className="w-full min-h-screen bg-transparent flex flex-col">
            <div className="flex relative flex-col">
                <Chart chartData={chartData} />
                <Controls setInterval={setInterval} setSymbol={setSymbol} />
            </div>
            <div className="w-full">
                <OrdersTable data={orders} />
            </div>
        </div>
    );
}
