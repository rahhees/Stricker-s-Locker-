import { useLocation } from "react-router-dom";

function OrderConfirmation() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className="p-8 mt-15">
      <h1 className="text-2xl font-bold text-green-600">✅ Order Confirmed</h1>
      <p>Order ID: {order?.orderId}</p>
      <p>Payment ID: {order?.paymentId}</p>
      <p>Amount Paid: ₹{order?.amount}</p>

      {/* Display ordered items images */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        {order?.items?.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <img  src={item.image || "https://via.placeholder.com/100"}  alt={item.name}  className="w-24 h-24 object-cover rounded-lg shadow"/>
            <p className="text-sm mt-2">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderConfirmation;
