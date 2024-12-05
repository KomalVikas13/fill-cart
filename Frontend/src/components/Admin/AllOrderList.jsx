import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BiTrashAlt } from 'react-icons/bi';
import { fetchAllOrders } from '../../redux/slice/orderSlice';

const AllOrderList = () => {
    const { profile, status, users } = useSelector(state => state.users);
    const { orders } = useSelector(state => state.orders);
    const dispatch = useDispatch();
    const navigator = useNavigate();

    useEffect(() => {
        dispatch(fetchAllOrders(profile.token));
    }, [dispatch]);

    if (status == 'loading') {
        return <div>Loading....</div>
    }

    return (
        <div className='flex justify-center flex-col items-center p-10'>
            <h1 className='text-3xl font-bold text-theme'>All Orders</h1>
            <div className="py-10 w-full">
                <table className="table-auto border-collapse border border-gray-400 w-full text-left">
                    <thead className="bg-theme">
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">Order ID</th>
                            <th className="border border-gray-400 px-4 py-2">Total Amount</th>
                            <th className="border border-gray-400 px-4 py-2">Status</th>
                            <th className="border border-gray-400 px-4 py-2">Created At</th>
                            <th className="border border-gray-400 px-4 py-2">Order Items</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId}>
                                <td className="border border-gray-400 px-4 py-2">{order.orderId}</td>
                                <td className="border border-gray-400 px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                                <td className="border border-gray-400 px-4 py-2">{order.orderStatus}</td>
                                <td className="border border-gray-400 px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="border border-gray-400 px-4 py-2">
                                    <table className="table-auto w-full">
                                        <thead>
                                            <tr>
                                                <th className="border border-gray-400 px-4 py-2">Product Name</th>
                                                <th className="border border-gray-400 px-4 py-2">Quantity</th>
                                                <th className="border border-gray-400 px-4 py-2">Price</th>
                                                <th className="border border-gray-400 px-4 py-2">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.orderItems.map((item) => (
                                                <tr key={item.orderItemId}>
                                                    <td className="border border-gray-400 px-4 py-2">{item.product.name}</td>
                                                    <td className="border border-gray-400 px-4 py-2">{item.quantity}</td>
                                                    <td className="border border-gray-400 px-4 py-2">${item.price.toFixed(2)}</td>
                                                    <td className="border border-gray-400 px-4 py-2">{item.product.description}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllOrderList