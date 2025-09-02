import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import api from "../Api/AxiosInstance";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [cartLength,setCartLength]=useState(0)

  // Load cart when user changes
  useEffect(() => {
    if (!user) {
      setCart([]); // if no user, clear cart
      return;
    }



    async function fetchCart() {
      try {
        const res = await api.get(`/users/${user.id}`);
        setCart(res.data.cart || []);
        setCartLength(res.data.cart.length||0)
      } catch (error) {
        console.error("Error loading cart from DB:", error);
      }
    }

    fetchCart();
  }, [user]);

  
  useEffect(() => {
    setCartLength(cart.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);




  // ---- Cart Actions ----

  // Add product (if exists → +1, else → new)
  const addToCart = async (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    try {
      await api.patch(`/users/${user.id}`, {
        cart: [
          ...cart.filter((item) => item.id !== product.id),
          {
            ...product,
            quantity:
              (cart.find((i) => i.id === product.id)?.quantity || 0) + 1,
          },
        ],
      });
    } catch (err) {
      console.error("Error syncing addToCart:", err);
    }
  };

  // Update product quantity
  const updateQuantity = async (id, change) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + change } : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    try {
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
    } catch (err) {
      console.error("Error syncing updateQuantity:", err);
    }
  };

  // Remove product
  const removeFromCart = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);

    try {
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
    } catch (err) {
      console.error("Error syncing removeFromCart:", err);
    }
  };

  // Clear cart
  const clearCart = async () => {
    setCart([]);

    try {
      await api.patch(`/users/${user.id}`, { cart: [] });
    } catch (err) {
      console.error("Error syncing clearCart:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart,cartLength,setCartLength }}
    >
      {children}
    </CartContext.Provider>
  );
};
