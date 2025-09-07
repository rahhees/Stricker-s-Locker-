import React, { useContext } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import { CartContext } from "../Context/CartContext";
import ProductCard from "../Component/CartDesign";


function WishlistPage() {

  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
 

  // check if product is already in wishlist

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} onAddToWishlist={addToWishlist}
              isInWishlist={isInWishlist}
              viewMode="grid"/>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
