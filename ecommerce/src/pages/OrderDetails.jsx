import React, { useEffect, useState, useContext } from "react";
import api from "../Api/AxiosInstance";
import { AuthContext } from "../Context/AuthContext";

const OrderDetails = () => {
  const { user } = useContext(AuthContext); 
  const [orders, setOrders] = useState([]);

  // Fetch user's orders
  const fetchOrders = async () => {
    try {
      const res = await api.get(`/users/${user.id}`); // fetch the user
      setOrders(res.data.order || []); // set the order array
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="mb-6 p-4 border rounded-lg bg-white shadow-md"
          >
            <h2 className="font-semibold text-lg mb-2">
              Order #{index + 1}
            </h2>
            <p>
              Status:{" "}
              <span className="font-medium text-green-600">
                {order.status}
              </span>
            </p>
            <p>Total: ${order.total}</p>
            <p>
              Ordered At:{" "}
              {new Date(order.createdAt).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>

            {/* Product List */}
            <div className="mt-4">
              <h3 className="font-semibold">Products:</h3>
              <ul className="space-y-3 mt-2">
                {order.products?.map((p, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-4 border-b pb-2"
                  >
                    {/* Product Image */}
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    {/* Product Info */}
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-gray-600">
                        ${p.price} × {p.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderDetails;
