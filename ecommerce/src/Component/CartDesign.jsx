import { Heart, ShoppingCart, Star, Eye, Zap } from "lucide-react";
import { CartContext } from "../Context/CartContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
  viewMode,
}) {
  const { setCartLength } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden transition-all duration-300 group border border-gray-100
        ${viewMode === "list" 
          ? "flex items-center gap-6 p-6 shadow-md hover:shadow-lg" 
          : "shadow-sm hover:shadow-xl hover:-translate-y-1"
        }`}
    >
      {/* Product Image Container */}
      <div
        className={`relative cursor-pointer overflow-hidden ${
          viewMode === "grid" 
            ? "h-72 w-full" 
            : "h-40 w-40 flex-shrink-0 rounded-lg"
        } bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-300`}
        onClick={() => navigate(`/products/${product.id}`)}
      >
        {/* Default Image */}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain mx-auto transition-all duration-500 group-hover:scale-110" 
        />

        {/* Hover Image (only if available) */}
        {product.hoverImage && (
          <img 
            src={product.hoverImage}  
            alt={`${product.name} alternate`}  
            className="w-full h-full object-contain mx-auto absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
          />
        )}

        {/* Quick View Overlay - Only show on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <button 
            onClick={(e) => {   
              e.stopPropagation();   
              navigate(`/products/${product.id}`); 
            }}
            className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0"
          >
            <Eye size={16} />
            Quick View
          </button>
        </div>

        {/* Top badges container */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {/* Sale Badge */}
          {product.salePrice && (
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
              SALE
            </div>
          )}

          {/* New Badge */}
          {product.isNew && (
            <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
              <Zap size={10} />
              NEW
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0
            ${isInWishlist(product.id)
              ? "bg-red-500 text-white shadow-md"
              : "bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 shadow-sm"
            } hover:scale-110 opacity-0 group-hover:opacity-100`}
        >
          <Heart
            size={18}
            className={isInWishlist(product.id) ? "fill-current" : ""}
          />
        </button>
      </div>

      {/* Product Details */}
      <div
        className={`p-5 flex flex-col ${
          viewMode === "list" ? "flex-1" : ""
        }`}
      >
        {/* Category - Subtle */}
        {product.category && (
          <span className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-medium">
            {product.category}
          </span>
        )}

        {/* Product Name */}
        <h3
          className="font-semibold text-gray-900 text-base leading-tight cursor-pointer hover:text-blue-600 transition-colors mb-2 line-clamp-2"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {product.name}
        </h3>

        {/* Rating - Compact */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-gray-600 text-sm font-medium">
              {product.rating?.toFixed(1)}
            </span>
            {product.reviewCount && (
              <span className="text-gray-400 text-xs">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Description (for list view only) */}
        {viewMode === "list" && product.description && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="mb-3 mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.salePrice || product.price}
            </span>
            {product.salePrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.price}
              </span>
            )}
          </div>
        </div>

        {/* Stock Status - Simplified */}
        {product.stock !== undefined && (
          <div className="flex items-center gap-2 mb-4">
            <div
              className={`w-2 h-2 rounded-full ${
                product.stock > 10  ? "bg-green-500"  : product.stock > 0  ? "bg-yellow-500"  : "bg-red-500"
              }`}
            />
            <span
              className={`text-xs font-medium ${
                product.stock > 10
                  ? "text-green-600"
                  : product.stock > 0
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {product.stock > 10
                ? "In Stock"
                : product.stock > 0
                ? `Only ${product.stock} left`
                : "Out of Stock"}
            </span>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={product.stock === 0}
        >
          <ShoppingCart size={18} />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;