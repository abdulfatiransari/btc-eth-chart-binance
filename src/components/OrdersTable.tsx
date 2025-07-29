import { OrderType } from "@/types";
import React from "react";

type Props = {
    data: OrderType[];
};

const OrdersTable = (props: Props) => {
    return (
        <div className="border border-black rounded w-full">
            <h2 className="font-bold w-full py-2 text-white bg-black text-lg px-4 text-center">Orders List</h2>
            <div className=" h-full max-h-[31.2rem] overflow-scroll">
                <table className="w-full">
                    <thead className="text-lg sticky top-0 bg-black text-white py-3 pb-4">
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>USDT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((order, index) => (
                            <tr className="even:bg-white h-12 text-black bg-gray-200" key={index}>
                                <td>{new Date(order.time).toLocaleString()}</td>
                                <td>{order.type}</td>
                                <td>{order.price}</td>
                                <td>{order.quantity}</td>
                            </tr>
                        ))}
                        {!props.data.length && (
                            <tr className="even:bg-white h-12 text-black bg-gray-200">
                                <td colSpan={4} className="text-center">
                                    No Data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersTable;
