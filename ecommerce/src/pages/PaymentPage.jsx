// PaymentPage.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import { toast } from "react-toastify";

function PaymentPage() {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const shippingaddress = user?.shippingaddress || {};

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = () => window.history.back();

  const handleCompleteOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Add script in index.html");
      return;
    }

    setIsProcessing(true);

    const options = {
      key: "rzp_test_edrzdb8Gbx5U5M", // Razorpay demo key
      amount: Math.round(total * 100), // amount in paise
      currency: "INR",
      name: "My Shop",
      description: "Order Payment",
      prefill: {
        name: user?.name || "Guest",
        email: user?.email || "guest@example.com",
        contact: shippingaddress?.mobileno || "9876543210",
      },
      theme: { color: "#dc2626" },
      handler: function (response) {
        // Payment success
        const newOrder = {
          orderId: Date.now(),
          paymentId: response.razorpay_payment_id,
          amount: total,
          date: new Date().toISOString(),
          status: "SUCCESS",
          shippingAddress: shippingaddress,
          items: cart,
          summary: { subtotal, tax, total },
        };

        const previousOrders = user.order && Array.isArray(user.order) ? user.order : [];

        fetch(`http://localhost:5008/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: [...previousOrders, newOrder] }),
        })
          .then(res => res.json())
          .then(() => {
            const updatedUser = { ...user, order: [...previousOrders, newOrder] };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setIsProcessing(false);
            navigate("/Confirmation", { replace: true, state: { order: newOrder } });
            toast.success("Payment Succesully Completed")
          })
          .catch(err => {
            console.error("Error saving order:", err);
            setIsProcessing(false);
            alert("Payment succeeded but failed to save order!");
          });
      },
      modal: {
        ondismiss: () => {
          setIsProcessing(false);
         toast.warn("Payment Failed!")
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Payment Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border space-y-6 mt-15">
          <h2 className="text-2xl font-semibold text-gray-800">Payment Method</h2>
          <p className="text-gray-600">Click “Complete Order” to proceed with Razorpay payment.</p>

          {/* Back & Complete Order buttons */}
          <div className="flex justify-between pt-4 border-t">
            <button
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              ← Back
            </button>
            <button
              onClick={handleCompleteOrder}
              disabled={isProcessing}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
            >
              {isProcessing ? "Processing..." : "Complete Order"}
            </button>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border shadow-md sticky top-8 max-h-[700px] overflow-y-auto space-y-4 mt-15">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>

            {cart.length > 0 ? (
              cart.map(item => (
                <div key={item.id} className="flex items-center justify-between gap-3 mb-3">
                  <img
                    src={item.image || "https://via.placeholder.com/50"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 ml-3">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    ₹{item.price * (item.quantity || 1)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No items in your cart.</p>
            )}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="text-green-600 font-medium">FREE</span></div>
              <div className="flex justify-between"><span>Tax</span><span>₹{tax}</span></div>
              <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span>₹{total}</span></div>
            </div>

            {/* Shipping Address */}
            {shippingaddress && Object.keys(shippingaddress).length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-medium text-gray-700 mb-2">Shipping Address</h3>
                <p className="font-semibold">{shippingaddress.firstname} {shippingaddress.lastname}</p>
                <p>{shippingaddress.address} {shippingaddress.apartment}</p>
                <p>{shippingaddress.city}, {shippingaddress.state} {shippingaddress.postalcode}</p>
                <p>{shippingaddress.mobileno}</p>
                <p>{shippingaddress.country}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
