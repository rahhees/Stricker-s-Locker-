import { createContext,useState } from "react";

// Wishlist Logic Here...

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const existing = prevWishlist.find((item) => item.id === product.id);

      if (existing) {
        // If already in wishlist → remove it (toggle behavior)
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        // Otherwise add it
        return [...prevWishlist, product];
      }
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};