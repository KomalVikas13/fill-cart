import React from "react";
import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";


const PaymentFailed = () => {
    return <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
        <div className="lg:w-[30%] lg:h-1/2 bg-white flex justify-center flex-col items-center p-10 shadow-2xl rounded-lg">
            <MdCancel className="text-red-500" size={100} />
            <h1 className="text-2xl pt-5 pb-10 font-semibold text-red-700">Payment Cancelled!</h1>
            <div>
                <Link to="/" className=" bg-black text-white px-5 py-3 rounded-lg">Go Back</Link>
            </div>
        </div>
    </div >
};

export default PaymentFailed;