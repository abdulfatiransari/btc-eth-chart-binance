import { Time } from "lightweight-charts";

export interface ChartData {
    time: Time;
    open: number;
    high: number;
    low: number;
    close: number;
}

export interface OrderType {
    time: number;
    type: "BUY" | "SELL";
    price: number;
    quantity: number;
}
