import React, { useState } from "react";

const Orders = ({orders = []}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const ordersPerPage = 3; 

  // Pagination logic
  const pageCount = Math.ceil(orders.length / ordersPerPage);
  const displayedOrders = orders.slice(
    currentPage * ordersPerPage,
    (currentPage + 1) * ordersPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // If no orders, show a message
  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-5 px-5 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No Orders Found</h1>
          <p className="text-gray-600">You haven't placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Orders List */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {displayedOrders.map((order) => (
          <div
            key={order.orderId}
            className="border-b border-gray-200 p-5 hover:bg-gray-50 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Order #{order.orderId}
                </h3>
                <p className="text-sm text-gray-500">
                  Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                </p>
                <p className="text-sm text-gray-500">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      order.orderStatus === "PAID"
                        ? "text-green-500"
                        : order.orderStatus === "PENDING"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.orderStatus || 'Unknown'}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-lg font-semibold text-gray-800">
                  ${(order.totalAmount || 0).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-3">
              <h4 className="text-sm font-semibold text-gray-600">Items:</h4>
              <ul className="ml-4 mt-1 space-y-1 text-sm text-gray-500">
                {order.orderItems && order.orderItems.map((item) => (
                  <li key={item.orderItemId}>
                    {item.product?.name || 'Unknown Product'} - {item.quantity || 0}x ${(item.price || 0).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Pagination */}
      <div className="flex justify-center mt-5 space-x-2">
        {pageCount > 1 && (
          <>
            {currentPage > 0 && (
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-blue-100"
              >
                Previous
              </button>
            )}

            {[...Array(pageCount)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx)}
                className={`px-3 py-1 border rounded ${
                  currentPage === idx 
                    ? "bg-blue-500 text-white" 
                    : "border-gray-300 hover:bg-blue-100"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            {currentPage < pageCount - 1 && (
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-blue-100"
              >
                Next
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;