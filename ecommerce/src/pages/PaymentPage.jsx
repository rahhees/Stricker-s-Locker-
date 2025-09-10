// PaymentPage.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";

function PaymentPage() {
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const shippingaddress = user?.shippingaddress || {};

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const [selectedPayment, setSelectedPayment] = useState("card");
  const [cardDetails, setCardDetails] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardInputChange = (field, value) =>
    setCardDetails(prev => ({ ...prev, [field]: value }));

  const formatCardNumber = value => {
    const v = value.replace(/\D/g, "");
    return v.match(/.{1,4}/g)?.join(" ") || v;
  };

  const formatExpiry = value => {
    const v = value.replace(/\D/g, "");
    return v.length >= 3 ? v.slice(0, 2) + "/" + v.slice(2, 4) : v;
  };

  const isValidCardDetails = () => {
    return (
      cardDetails.name &&
      cardDetails.number.replace(/\s/g, "").length === 16 &&
      cardDetails.expiry.length === 5 &&
      cardDetails.cvv.length >= 3
    );
  };

  const handleBack = () => window.history.back();

  const openRazorpay = () => {
    if (selectedPayment === "card" && !isValidCardDetails()) {
      alert("Please fill in all card details");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Add script in index.html");
      return;
    }

    setIsProcessing(true);

    const options = {
      key: "rzp_test_edrzdb8Gbx5U5M",
      amount: total * 100,
      currency: "INR",
      name: "My Shop",
      description: "Order Payment",
      handler: function (response) {
        setIsProcessing(false);
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);

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
          .then(data => {
            const updatedUser = { ...user, order: [...previousOrders, newOrder] };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            navigate("/Confirmation", {replace:true, state: { order: newOrder } });
          })
          .catch(err => console.error("Error saving order:", err));
      },
      prefill: {
        name: user?.name || cardDetails.name || "Guest",
        email: user?.email || "guest@example.com",
        contact: shippingaddress?.mobileno || "9876543210",
      },
      theme: { color: "#dc2626" },
      modal: { ondismiss: () => setIsProcessing(false) },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen mt-30">
      <div className="max-w-6xl mx-auto px-4 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        {/* Payment Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Method</h2>
          
          {/* Credit/Debit Card Option */}
          <label className="flex items-center cursor-pointer mb-4">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={selectedPayment === "card"}
              onChange={e => setSelectedPayment(e.target.value)}
              className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
            />
            <span className="ml-3 font-medium text-gray-700">Credit/Debit Card</span>
          </label>

          {selectedPayment === "card" && (
            <div className="ml-7 space-y-4 bg-gray-50 p-4 rounded-lg border">
              <input
                type="text"
                value={cardDetails.name}
                onChange={e => handleCardInputChange("name", e.target.value)}
                placeholder="Cardholder Name"
                className="w-full border px-3 py-2 rounded-md"
              />
              <input
                type="text"
                value={cardDetails.number}
                onChange={e => handleCardInputChange("number", formatCardNumber(e.target.value))}
                placeholder="Card Number"
                maxLength="19"
                className="w-full border px-3 py-2 rounded-md"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={cardDetails.expiry}
                  onChange={e => handleCardInputChange("expiry", formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  maxLength="5"
                  className="w-full border px-3 py-2 rounded-md"
                />
                <input
                  type="password"
                  value={cardDetails.cvv}
                  onChange={e => handleCardInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                  placeholder="CVV"
                  maxLength="4"
                  className="w-full border px-3 py-2 rounded-md"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <button onClick={handleBack} className="text-gray-600 hover:text-gray-800">← Back</button>
            <button
              onClick={openRazorpay}
              disabled={isProcessing}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700"
            >
              {isProcessing ? "Processing..." : "Complete Order"}
            </button>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border space-y-4 sticky top-8 max-h-[600px] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>

            {cart.length > 0 ? cart.map(item => (
              <div key={item.id} className="flex items-center justify-between gap-3 mb-3">
                <img src={item.image || "https://via.placeholder.com/50"} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-1 ml-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                </div>
                <p className="font-semibold text-gray-800">₹{item.price * (item.quantity || 1)}</p>
              </div>
            )) : <p className="text-gray-500">No items available.</p>}

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
