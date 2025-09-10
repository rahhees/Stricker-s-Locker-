import { useLocation } from "react-router-dom";

function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-600">✅ Order Confirmed</h1>
      <p>Order ID: {order?.orderId}</p>
      <p>Payment ID: {order?.paymentId}</p>
      <p>Amount Paid: ₹{order?.amount}</p>
    </div>
  );
}

export default OrderConfirmation;
