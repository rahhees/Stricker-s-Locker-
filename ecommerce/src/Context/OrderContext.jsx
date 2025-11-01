import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);

  const [shippingDetails, setShippingDetails] = useState(
    user?.shippingaddress || {
      name: "",
      address: "",
      phone: "",
      city: "",
      pincode: "",
    }
  );

  const [totalAmount, setTotalAmount] = useState(0);

  const saveShippingDetails = async (details) => {
    try {
      const res = await fetch(`http://localhost:5010/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingaddress: details,
        }),
      });

      const updatedUser = await res.json();

      setShippingDetails(details);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      console.error("Error saving shipping details:", err);
    }
  };

  const addCartPayment = (paymentId, amount) => {
    console.log("Cart Payment Success:", { paymentId, amount });
  };

  const addBuyNowPayment = (paymentId, amount, productId) => {
    console.log("Buy Now Payment Success:", { paymentId, amount, productId });
  };

  return (
    <OrderContext.Provider
      value={{
        shippingDetails,
        setShippingDetails: saveShippingDetails, 
        totalAmount,
        setTotalAmount,
        addCartPayment,
        addBuyNowPayment,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
