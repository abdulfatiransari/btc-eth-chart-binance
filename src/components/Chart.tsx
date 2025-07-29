import { ChartData } from "@/types";
import { createChart } from "lightweight-charts";
import React, { useEffect } from "react";

type Props = {
    chartData: ChartData[];
};

const Chart = (props: Props) => {
    useEffect(() => {
        const chart = createChart("chart-container", { width: typeof window !== 'undefined' ? window.outerWidth : 800, height: 400 });
        const chartSeries = chart.addCandlestickSeries();

        chartSeries.setData(props.chartData);

        return () => {
            chart.remove();
        };
    }, [props.chartData]);

    return (
        <div id="chart-container" className="[&>div]:max-w-[89vw] [&>div]:md:max-w-[100vw]"></div>
    );
};

export default Chart;
