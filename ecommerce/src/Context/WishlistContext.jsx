import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import api from "../Api/AxiosInstance";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [wishlist, setWishlist] = useState([]);
  const [wishlistLength, setWishlistLength] = useState(0);

  // --- Load wishlist when user changes ---
  useEffect(() => {
    if (!user) {
      setWishlist([]); // Clear if no user
      return;
    }

    async function fetchWishlist() {
      try {
        const res = await api.get(`/users/${user.id}`);
        setWishlist(res.data.wishlist || []);
        setWishlistLength(res.data.wishlist?.length || 0);
      } catch (error) {
        console.error("Error loading wishlist from DB:", error);
      }
    }

    fetchWishlist();
  }, [user]);

  // --- Update wishlistLength reactively ---
  useEffect(() => {
    setWishlistLength(wishlist.length);
  }, [wishlist]);

  // --- Add / Remove / Clear wishlist ---
  const addToWishlist = async (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        // If exists, remove it (toggle behavior)
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });

    try {
      await api.patch(`/users/${user.id}`, {
        wishlist: [
          ...wishlist.filter((item) => item.id !== product.id),
          product,
        ],
      });
    } catch (err) {
      console.error("Error syncing wishlist:", err);
    }
  };

  const removeFromWishlist = async (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);

    try {
      await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
    } catch (err) {
      console.error("Error syncing wishlist:", err);
    }
  };

  const clearWishlist = async () => {
    setWishlist([]);

    try {
      await api.patch(`/users/${user.id}`, { wishlist: [] });
    } catch (err) {
      console.error("Error syncing wishlist:", err);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistLength,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        setWishlistLength, // optional if you need it elsewhere
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
