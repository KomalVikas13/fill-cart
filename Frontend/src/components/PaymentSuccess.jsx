import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { jwtToken } = useAuth();

    useEffect(() => {
        const sessionId = searchParams.get('session_id');

        const verifyPayment = async () => {
            try {
                // Make sure this URL points to your BACKEND server, not the frontend
                const response = await axios.get(`http://localhost:8080/payments/success?session_id=${sessionId}`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                console.log(response);
                setPaymentStatus(response.data);
            } catch (error) {
                console.error(error);
                setPaymentStatus('error');
            } finally {
                setIsLoading(false);
            }
        };

        if (sessionId) {
            verifyPayment();
        }
    }, [searchParams]);

    if (isLoading) {
        return <div className="text-center text-xl text-gray-600 mt-10">Verifying payment...</div>;
    }

    if (paymentStatus === 'success') {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-green-100">
                <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
                {/* Add more details or redirect as needed */}
            </div>
        );
    }

    if (paymentStatus === 'failed') {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-red-100">
                <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>
                {/* Add error handling or retry options */}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl text-gray-700">{paymentStatus}</h1>
            {/* Add error handling */}
        </div>
    );
};

export default PaymentSuccess;
