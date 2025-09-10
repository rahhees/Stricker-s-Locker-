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
      className={`bg-white rounded-lg overflow-hidden transition-all duration-300 group border-0 shadow-none hover:shadow-lg
        ${viewMode === "list" ? "flex items-center gap-6 p-6" : "hover:scale-[1.02]"}`}
    >
      {/* Product Image Container */}
      <div
        className={`relative cursor-pointer overflow-hidden ${
          viewMode === "grid" 
            ? "h-64 w-full" 
            : "h-32 w-32 flex-shrink-0 rounded-lg"
        } bg-gray-50 transition-all duration-300`}
        onClick={() => navigate(`/products/${product.id}`)}
      >
        {/* Default Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain mx-auto transition-all duration-300 group-hover:scale-105"
        />

        {/* Hover Image (only if available) */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt={`${product.name} alternate`}
            className="w-full h-full object-contain mx-auto absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
          />
        )}

        {/* Quick View Overlay - Only show on hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${product.id}`);
            }}
            className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-100 transition-all duration-200 flex items-center gap-2 shadow-lg"
          >
            <Eye size={16} />
            Quick View
          </button>
        </div>

        {/* Wishlist Button - Always visible but subtle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300
            ${isInWishlist(product.id)
              ? "bg-red-500 text-white"
              : "bg-white/80 hover:bg-white text-gray-600 hover:text-red-500"
            } hover:scale-110 shadow-sm`}
        >
          <Heart
            size={16}
            className={isInWishlist(product.id) ? "fill-current" : ""}
          />
        </button>

        {/* Sale Badge */}
        {product.salePrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            SALE
          </div>
        )}

        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center gap-1">
            <Zap size={10} />
            NEW
          </div>
        )}
      </div>

      {/* Product Details */}
      <div
        className={`p-4 flex flex-col ${
          viewMode === "list" ? "flex-1" : ""
        }`}
      >
        {/* Price - Now at top */}
        <div className="mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.salePrice || product.price}
            </span>
            {product.salePrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.price}
              </span>
            )}
          </div>
        </div>

        {/* Product Name - Simplified */}
        <h3
          className="font-medium text-gray-800 text-sm leading-tight cursor-pointer hover:text-gray-600 transition-colors mb-2 line-clamp-2"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          {product.name}
        </h3>

        {/* Category - Subtle */}
        {product.category && viewMode === "list" && (
          <span className="text-xs text-gray-500 mb-2">
            {product.category}
          </span>
        )}

        {/* Rating - Compact */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-gray-500 text-xs">
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
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        {/* Stock Status - Simplified */}
        {product.stock !== undefined && (
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`w-2 h-2 rounded-full ${
                product.stock > 10
                  ? "bg-green-500"
                  : product.stock > 0
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            />
            <span
              className={`text-xs ${
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
                ? `${product.stock} left`
                : "Out of Stock"}
            </span>
          </div>
        )}

        {/* Add to Cart Button - Full width, simplified */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-200 mt-auto"
          disabled={product.stock === 0}
        >
          <ShoppingCart size={16} />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;