import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import api from "../Api/AxiosInstance";
import { toast } from "react-toastify";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

// wishlist with loccal storage
  
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [wishlistLength, setWishlistLength] = useState(() =>
    wishlist.length
  );

  // Keep the wishlist length
  
  useEffect(() => {
    setWishlistLength(wishlist.length);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Load wishlist from API when user changes

  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await api.get(`/users/${user.id}`);
        setWishlist(res.data.wishlist || []);
      } catch (err) {
        console.error("Error loading wishlist:", err);
      }
    };

    fetchWishlist();
  }, [user]);

// add to the whislist page

  const addToWishlist = async (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });

    
    if (user) {
      try {
        const updatedWishlist = [
          ...wishlist.filter((item) => item.id !== product.id),
          product,
        ];
      
        await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
      } catch (err) {
        console.error("Error syncing wishlist:", err);
      }
     
    }
  };
  // remove from whislist 

  const removeFromWishlist = async (id) => {
    setWishlist((prev) => {
      const updatedWishlist = prev.filter((item) => item.id !== id);
      if (user) {
        api.patch(`/users/${user.id}`, { wishlist: updatedWishlist }).catch(console.error);
      }
      return updatedWishlist;

    });
    
  
  };

  // clearing from the wishlist 

  const clearWishlist = async () => {
    setWishlist([]);
    if (user) {
      api.patch(`/users/${user.id}`, { wishlist: [] }).catch(console.error);
    }
  
  };

  return (
    <WishlistContext.Provider
      value={{   wishlist,   wishlistLength,   addToWishlist,   removeFromWishlist,  clearWishlist, }}>
      {children}
    </WishlistContext.Provider>
  );
};
