const PaymentFailed = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
            <p className="text-lg text-gray-700">You have cancelled the payment process. Please try again.</p>
        </div>
    );
};

export default PaymentFailed;
