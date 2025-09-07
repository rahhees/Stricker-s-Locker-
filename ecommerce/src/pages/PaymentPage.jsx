// import { createContext, useState } from "react";

// export const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//   const [shippingDetails, setShippingDetails] = useState({});
//   const [totalAmount, setTotalAmount] = useState(0);

//   const addCartPayment = (paymentId, amount) => {
//     console.log("Cart payment:", paymentId, amount);
//   };

//   const addBuyNowPayment = (paymentId, amount, productId) => {
//     console.log("Buy Now payment:", paymentId, amount, productId);
//   };

//   return (
//     <OrderContext.Provider
//       value={{ shippingDetails, totalAmount, addCartPayment, addBuyNowPayment }}
//     >
//       {children}
//     </OrderContext.Provider>
//   );
// };
