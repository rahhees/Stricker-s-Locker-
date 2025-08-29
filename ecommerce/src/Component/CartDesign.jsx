// src/Component/ProductCard.jsx
import { Heart, ShoppingCart, Star } from "lucide-react";

function ProductCard({ product, onAddToCart, onAddToWishlist, isInWishlist, viewMode }) {
  return (
    <div
      className={`bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition 
        ${viewMode === "list" ? "flex items-center gap-4 p-4" : ""}`}
    >
      {/* Product Image */}
      <div className={`relative ${viewMode === "grid" ? "h-48 w-full" : "h-32 w-32 flex-shrink-0"} p-2`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mx-auto"
        />

        {/* Wishlist button */}
        <button
          onClick={() => onAddToWishlist(product)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition"
        >
          <Heart
            size={20}
            className={isInWishlist(product.id) ? "text-red-500 fill-red-500" : "text-gray-700"}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className={`p-4 flex flex-col justify-between ${viewMode === "list" ? "flex-1" : ""}`}>
        <div>
          {/* Category */}
          {product.category && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
          )}

          {/* Name */}
          <h3 className="font-semibold text-gray-900 mt-2 mb-1">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="text-gray-600 text-xs">
              ({product.rating?.toFixed(1) || "0.0"})
            </span>
          </div>
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-black text-white px-3 py-1 rounded flex items-center gap-1 text-sm hover:bg-gray-800 transition"
          >
            <ShoppingCart size={14} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;