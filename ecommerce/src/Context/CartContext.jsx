import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import api from "../Api/AxiosInstance";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Cart state with localStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartLength, setCartLength] = useState(cart.length);

  // Keep cartLength and localStorage in sync
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartLength(cart.length);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Load cart from API when user changes
  useEffect(() => {
    if (!user) {
      setCart([]);
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

  const navigate= useNavigate()

//  add to the cart page 


const addToCart = async (product) => {
  if(!user){
    toast.error("Please log in to  add items to your cart!");
    navigate("/login")
    return 
  }
  setCart((prevCart) => {
    const existing = prevCart.find((item) => item.id === product.id);

    if (existing) {
      toast.info("Already in cart!");
      return prevCart; 
    }

    const updatedCart = [...prevCart, { ...product, quantity: 1 }];

    if (user) {
      api.patch(`/users/${user.id}`, { cart: updatedCart }).catch(console.error);
    }

    toast.success("Added to cart!");
    return updatedCart;
  });
};

  // updatting Quantitty

  const updateQuantity = async (id, change) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0);

      if (user) {
        api.patch(`/users/${user.id}`, { cart: updatedCart }).catch(console.error);
      }

      return updatedCart;
    });
  };

  // removing fromm the cart

  const removeFromCart = async (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      if (user) {
        api.patch(`/users/${user.id}`, { cart: updatedCart }).catch(console.error);
      }
      return updatedCart;
    });
    
  };

  // clering from the cartt

  const clearCart = async () => {
    setCart([]);
    if (user) {
      api.patch(`/users/${user.id}`, { cart: [] }).catch(console.error);
    }
    toast.info("Cart is Empty...")
  };

  return (
    <CartContext.Provider
      value={{  cart,  addToCart,  updateQuantity,  removeFromCart,  clearCart,  cartLength,}}>
      {children}
    </CartContext.Provider>
  );
};
