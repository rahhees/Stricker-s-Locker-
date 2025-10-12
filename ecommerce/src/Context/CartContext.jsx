import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import api from "../Api/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Load from localStorage
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [cartLength, setCartLength] = useState(0);

  // 🧮 Keep cart length accurate and sync localStorage
  useEffect(() => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartLength(totalItems);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🧾 Load cart from API when user logs in
  useEffect(() => {
    if (!user) {
      setCart([]);
      localStorage.removeItem("cart");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await api.get(`/users/${user.id}`);
        setCart(res.data.cart || []);
      } catch (err) {
        console.error("Error loading cart:", err);
      }
    };

    fetchCart();
  }, [user]);

  // 🔁 Helper to sync backend
  const syncCartWithBackend = async (updatedCart) => {
    if (!user) return;
    try {
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
     
    } catch (err) {
      console.error("Error syncing cart:", err);
       toast.success("Successfully Increase The Product")
     
    }
  };

  // ➕ Add to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      let updatedCart;

      if (existing) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity }];
      }

      syncCartWithBackend(updatedCart);
      toast.success(`${product.name} added to cart`);
      return updatedCart;
    });
  };

  // 🔄 Update quantity
  const updateQuantity = (id, change) => {
    setCart((prevCart) => {
      const updated = prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0);

      syncCartWithBackend(updated);
      return updated;
    });
  };

  // ❌ Remove from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updated = prevCart.filter((item) => item.id !== id);
      syncCartWithBackend(updated);
      toast.info("Item removed from cart");
      return updated;
    });
  };

  // 🧹 Clear entire cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    syncCartWithBackend([]);
    toast.info("Cart is empty now");
  };

   

  return (
    <CartContext.Provider
      value={{
        cart,
        cartLength,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
