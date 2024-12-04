import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { IoIosWarning } from "react-icons/io";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { jwtToken } = useAuth();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    const verifyPayment = async () => {
      try {
        // Make sure this URL points to your BACKEND server, not the frontend
        const response = await axios.get(
          `http://localhost:8080/payments/success?session_id=${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        console.log(response);

        setPaymentStatus("success");
      } catch (error) {
        console.error(error);
        setPaymentStatus("failed");
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [searchParams, jwtToken]);

  if (isLoading) {
    return <div className="text-center text-xl text-gray-600 mt-10">Verifying payment...</div>;
  }

  if (paymentStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
        <div className="lg:w-[30%] lg:h-1/2 bg-white flex justify-center flex-col items-center p-10 shadow-2xl rounded-lg">
          <BsFillPatchCheckFill className="text-green-500" size={100} />
          <h1 className="text-2xl py-10 font-semibold text-green-800">Payment Successful!</h1>
          <div>
            <Link to="/" className="bg-theme text-white px-5 py-3 rounded-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
        {/* Add more details or redirect as needed */}
      </div>
    );
  }

  if (paymentStatus === "failed") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
        <div className="lg:w-[30%] lg:h-1/2 bg-white flex justify-center flex-col items-center p-10 shadow-2xl rounded-lg">
          <IoIosWarning className="text-red-500" size={100} />
          <h1 className="text-2xl pt-5 pb-10 font-semibold text-red-700">Payment Failed!</h1>
          <div>
            <Link to="/" className="bg-black text-white px-5 py-3 rounded-lg">
              Go Back
            </Link>
          </div>
        </div>
        {/* Add more details or redirect as needed */}
      </div>
    );
  }

};

export default PaymentSuccess;
