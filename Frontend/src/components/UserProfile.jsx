import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Orders from "./Orders";
import axios from "axios";

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState("Profile");
    const { profile } = useSelector(state => state.users);
    const { jwtToken } = useAuth()
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/user/order/${profile.user.userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`, // Adjust token retrieval as necessary
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data)
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(()=>{
        fetchOrders()
    },[])

    const renderTabContent = () => {
        console.log(profile.user);

        switch (activeTab) {
            case "Profile":
                return (
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">Profile Details</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">UserId:</span>
                                <span className="font-medium text-gray-700">{profile.user.userId}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Full Name:</span>
                                <span className="font-medium text-gray-700">{profile.user.fullName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Email:</span>
                                <span className="font-medium text-gray-700">{profile.user.email}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Phone:</span>
                                <span className="font-medium text-gray-700">{profile.user.phoneNumber}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Address:</span>
                                <span className="font-medium text-gray-700">
                                    {profile.user.address}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            case "Orders":
                return (
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">Order History</h3>
                        <Orders orders={orders} />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-theme text-white p-6 flex justify-between items-center">
                    <div className="ml-6">
                        <h2 className="text-2xl font-bold">{profile.user.fullName}</h2>
                        <p className="text-sm text-blue-100">{profile.user.email}</p>
                    </div>
                    <div>
                        <Link to='/' className="bg-white p-2 px-5 text-theme rounded-lg">Home</Link>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <nav className="flex justify-around">
                        {["Profile", "Orders"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-4 text-gray-700 border-b-2 ${activeTab === tab ? "border-custom-red text-blue-500" : "border-transparent"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                {renderTabContent()}
            </div>
        </div>
    );
};

export default UserProfile;