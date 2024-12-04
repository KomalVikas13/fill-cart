import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchProducts, filterProductById } from "../redux/slice/productsSlice.js"

const PlaceOrder = () => {
    const {filteredProducts} = useSelector(state => state.products);
    const cart = useSelector(state => state.cart);
    const { profile } = useSelector(state => state.users);
    console.log(cart.items)
    console.log(profile)
    const { jwtToken } = useAuth() 
    const [orders, setOrders] = useState([]);
    const navigator = useNavigate()
    const {productId} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if (productId) {
            dispatch(fetchProducts()).then(() => {
                dispatch(filterProductById(productId)); // Only filter after products are fetched
            });
        }
        else {
            const transformedOrders = cart.items.map((item, index) => ({
                id: index + 1, // Generate a unique ID for each order
                productId: item.product.productId,
                productName: item.product.name,
                quantity: item.quantity,
                price: item.product.price,
                image:item.product.images[0].imageUrl
            }));
            setOrders(transformedOrders);
        }
    }, [cart.items, dispatch]);
    console.log(filterProductById)
    // Handle Quantity Change
    const updateQuantity = (id, delta) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === id
                    ? { ...order, quantity: Math.max(1, order.quantity + delta) }
                    : order
            )
        );
    };

    // Handle Removing a Product
    const removeProduct = (id) => {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    };

    // Handle Placing Order
    const handlePlaceOrder = async () => {
        // Prepare order data in the required format
        const orderData = {
            totalAmount: orders.reduce((sum, order) => sum + order.quantity * order.price, 0),
            userId: profile.user.userId,
            orderItems: orders.map(order => ({
                productId: order.productId,
                quantity: order.quantity,
                price: order.price
            }))
        };

        console.log("Order Data:", orderData);

        try {
            const response = await axios.post(`http://localhost:8080/user/order`,orderData,{
                headers : {
                    Authorization : `Bearer ${jwtToken}`,
                    "Content-Type": "application/json",
                }
            })
            window.open(response.data.paymentUrl)
            console.log(response)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data)
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 p-6">
            <div className="container mx-auto relative">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
                    Place Your Orders
                </h1>
                <hr className="border-gray-300 mb-8" />

                {/* Order List */}
                <div className="flex flex-col gap-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="flex items-center gap-6 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
                        >
                            <img
                                src={order.image}
                                alt={order.productName}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-grow">
                                <h2 className="text-lg font-semibold text-gray-700">{order.productName}</h2>
                                <div className="flex items-center gap-4 mt-2">
                                    <button
                                        className="bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded text-xl"
                                        onClick={() => updateQuantity(order.id, -1)}
                                    >
                                        -
                                    </button>
                                    <span className="text-lg">{order.quantity}</span>
                                    <button
                                        className="bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded text-xl"
                                        onClick={() => updateQuantity(order.id, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="text-lg font-medium text-gray-700">
                                ${(order.quantity * order.price).toFixed(2)}
                            </div>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                onClick={() => removeProduct(order.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* Place Order Section */}
                <div className="fixed bottom-6 right-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                        Total: ${orders.reduce((sum, order) => sum + order.quantity * order.price, 0).toFixed(2)}
                    </h3>
                    <button
                        className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-16 rounded-xl shadow-md"
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;