import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const CompanyOrders = () => {
    const [ordersstack, setOrdersstack] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let url = 'http://localhost:8085/getcompanyorders';
                const response = await axios.get(url);
                setOrdersstack(response.data);
            } catch (error) {
                console.log('Error fetching provider:', error);
            }
        };

        fetchOrders();
    }, []);
    return (
        <div>
            {ordersstack.length > 0 ? (
                <div className="flex justify-center items-center my-10">
                    <div className={'align-middle'}>
                        <table className="table-auto mx-auto">
                            <thead>
                            <tr>
                                <th className="px-4 py-2">Order List</th>
                                <th className="px-4 py-2">Date of order</th>
                                <th className="px-4 py-2">Status of order</th>
                            </tr>
                            </thead>
                            <tbody>
                            {ordersstack.map(order => (
                                <tr key={order.id}>
                                    <td className="border px-4 py-2">{order.order_list}</td>
                                    <td className="border px-4 py-2">{order.order_date}</td>
                                    <td className="border px-4 py-2">{order.order_status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>) : (
                <div className="flex justify-center items-center my-10">
                    <div className="border px-4 py-2">No matching data available currently!</div>
                </div>
            )}
            <button className={'fixed right-4 bottom-4 px-5 py-4 rounded-2xl text-lg bg-green-700 shadow-lg text-white border-0 '}>
                <Link to="/ManageInventory">
                    <h1 className={'text-lg'}>Inventory</h1>
                </Link>
            </button>
        </div>
    );
};

export default CompanyOrders;