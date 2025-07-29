import { ChartData } from "@/types";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

export const fetchChartData = async (symbol: string, interval: string, callback: Dispatch<SetStateAction<ChartData[]>>) => {
    try {
            const response = await axios.get(
                `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}`
            );
        const formattedData = response.data.map((candle: any[]) => {
                return {
                    time: candle[0] / 1000,
                    open: parseFloat(candle[1]),
                    high: parseFloat(candle[2]),
                    low: parseFloat(candle[3]),
                    close: parseFloat(candle[4]),
                };
            });
            callback(formattedData);
    } catch (error) {
        console.error(error);
    }
};
