import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { orderService } from "../../../Services/OrderService";

const ProfileOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
              const fetchOrders = async () => {
    try {
      setLoading(true);
 

      const response = await orderService.getMyOrders();

      setOrders(response.data ||response);
      

    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };
      if(user){
        fetchOrders();
      }

  },[user])




  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h3>
          <p className="text-gray-600">Start shopping to see your orders here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order, index) => (
            <div
              key={order.orderId || index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold mb-1">
                      Order #{order.orderId || index + 1}
                    </h2>
                    <p className="text-green-100 text-sm">
                      {new Date(order.date || order.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      order.status === "SUCCESS"
                        ? "bg-white text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Order Body */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((p) => (
                    <div key={p.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex-grow">
                        <p className="font-semibold text-gray-800">{p.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {p.quantity} x ₹{p.price}
                        </p>
                      </div>
                      <p className="font-bold text-green-600">
                        ₹{p.price * p.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileOrders;