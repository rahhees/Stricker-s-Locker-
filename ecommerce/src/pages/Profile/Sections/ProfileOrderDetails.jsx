import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { orderService } from "../../../Services/OrderService";
import { toast } from "react-toastify";
import Swal from "sweetalert2"; // Import SweetAlert2

const ProfileOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend URL for images
  const BASE_URL = "https://localhost:5174";

  // --- 1. STATUS MAPPER HELPER ---
  // Converts Enum numbers (0,1,2...) to human-readable strings
  const getStatusDisplay = (status) => {
    const statusMap = {
      0: "Pending",
      1: "Processing",
      2: "Shipping",
      3: "Delivered",
      4: "Cancelled",
      "0": "Pending",
      "1": "Processing",
      "2": "Shipping",
      "3": "Delivered",
      "4": "Cancelled"
    };
    
    // If status is already a string (like "SHIPPING"), return it properly capitalized
    if (isNaN(status)) {
        return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    }
    
    return statusMap[status] || status || "Pending";
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderService.getMyOrders();
        const data = response.data || response;
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleCancelOrder = async (OrderId) => {
    // --- 2. SWEETALERT2 CONFIRMATION ---
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this cancellation!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // Red color for cancel
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
      background: "#fff",
      customClass: {
        popup: 'rounded-2xl'
      }
    });

    if (result.isConfirmed) {
      try {
        await orderService.cancelOrder(OrderId);

        setOrders((prevOrders) =>
          prevOrders.map((ord) =>
            ord.id === OrderId ? { ...ord, status: "Cancelled" } : ord
          )
        );

        Swal.fire({
          title: "Cancelled!",
          text: "Your order has been cancelled.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false
        });
        
      } catch (err) {
        console.error("Cancel Failed:", err);
        toast.error(err.response?.data?.message || "Failed to Cancel Order");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-2xl font-bold text-white mb-6 text-center md:text-left">My Orders</h2>

      {!orders || orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-gray-600">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            // Helper to handle status comparison safely
            const displayStatus = getStatusDisplay(order.status);
            const currentStatus = displayStatus.toUpperCase().trim();
            const canCancel = ["PENDING", "PROCESSING"].includes(currentStatus);

            return (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* --- TOP HEADER --- */}
                <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      Placed on{" "}
                      {new Date(order.orderDate).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <span
                    className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      ["SUCCESS", "DELIVERED"].includes(currentStatus)
                        ? "bg-green-100 text-green-700"
                        : currentStatus === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {displayStatus}
                  </span>
                </div>

                {/* --- BODY: Product List --- */}
                <div className="p-6 space-y-6">
                  {order.orderItems?.map((item, index) => {
                    let imageUrl = item.imageUrl;
                    if (imageUrl && !imageUrl.startsWith("http")) {
                      imageUrl = `${BASE_URL}${imageUrl}`;
                    }

                    return (
                      <div key={index} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                        <div className="relative flex-shrink-0 w-24 h-24 border rounded-xl overflow-hidden border-gray-200">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={item.productName || "Product"}
                              className="w-full h-full object-contain p-1"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/150?text=No+Img";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <span className="text-xs">No Image</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-grow">
                          <h4 className="text-lg font-bold text-gray-800">{item.productName || item.name}</h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md border border-gray-200">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ₹{item.price * item.quantity}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-gray-500">₹{item.price} each</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* --- FOOTER: Total & Cancel Action --- */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 font-medium">Total Amount:</span>
                    <span className="text-xl font-bold text-green-700">
                      ₹{order.totalAmount}
                    </span>
                  </div>

                  <div className="flex w-full sm:w-auto">
                    {canCancel ? (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-all shadow-sm active:scale-95"
                      >
                        Cancel Order
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        Cancellation no longer available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProfileOrders;