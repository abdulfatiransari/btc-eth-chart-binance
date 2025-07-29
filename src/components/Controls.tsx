import React, { Dispatch, SetStateAction } from "react";

type Props = {
    setSymbol: Dispatch<SetStateAction<string>>;
    setInterval: Dispatch<SetStateAction<string>>;
};

const Controls = (props: Props) => {
    return (
        <div className="flex justify-between font-bold uppercase flex-wrap absolute bottom-0 z-10 w-full bg-black/70 px-4 py-2 gap-3 mt-5">
            <div className="flex gap-3 items-center">
                Select Interval:
                <button onClick={() => props.setInterval("1m")} className=" text-base rounded hover:text-cyan-300 ">
                    1m
                </button>
                <button onClick={() => props.setInterval("5m")} className=" text-base rounded hover:text-cyan-300 ">
                    5m
                </button>
                <button onClick={() => props.setInterval("15m")} className=" text-base rounded hover:text-cyan-300 ">
                    15m
                </button>
                <button onClick={() => props.setInterval("1h")} className=" text-base rounded hover:text-cyan-300 ">
                    1h
                </button>
            </div>
            <div className="flex gap-3 items-center justify-center">
                Select Pair:
                <button onClick={() => props.setSymbol("BTCUSDT")} className=" text-base rounded hover:text-cyan-300 ">
                    BTC/USDT
                </button>
                <button onClick={() => props.setSymbol("ETHUSDT")} className=" text-base rounded hover:text-cyan-300 ">
                    ETH/USDT
                </button>
            </div>
        </div>
    );
};

export default Controls;
