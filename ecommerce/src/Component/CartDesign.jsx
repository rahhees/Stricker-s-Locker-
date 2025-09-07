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
      className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 group border border-gray-100/50 hover:border-red-100
        ${viewMode === "list" ? "flex items-center gap-6 p-6" : "hover:scale-[1.02]"}`}
    >
      {/* Product Image Container */}
      <div
        className={`relative cursor-pointer overflow-hidden ${
          viewMode === "grid" 
            ? "h-56 w-full rounded-2xl" 
            : "h-32 w-32 flex-shrink-0 rounded-2xl"
        } bg-gradient-to-br from-gray-50 to-gray-100 p-4 group-hover:bg-gradient-to-br group-hover:from-red-50 group-hover:to-orange-50 transition-all duration-500`}
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
            className="w-full h-full object-contain mx-auto absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110"
          />
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${product.id}`);
            }}
            className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-medium text-sm hover:bg-white transition-all duration-200 flex items-center gap-2"
          >
            <Eye size={16} />
            Quick View
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToWishlist(product);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full transition-all duration-300 backdrop-blur-sm border
            ${isInWishlist(product.id)
              ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/25"
              : "bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 border-white/20 hover:border-red-200"
            } hover:scale-110 hover:shadow-lg`}
        >
          <Heart
            size={18}
            className={isInWishlist(product.id) ? "fill-current" : ""}
          />
        </button>

        {/* Sale Badge */}
        {product.salePrice && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            SALE
          </div>
        )}

        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Zap size={12} />
            NEW
          </div>
        )}
      </div>

      {/* Product Details */}
      <div
        className={`p-6 flex flex-col justify-between ${
          viewMode === "list" ? "flex-1" : ""
        }`}
      >
        <div className="space-y-3">
          {/* Category */}
          {product.category && (
            <span className="inline-block text-xs font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
              {product.category.toUpperCase()}
            </span>
          )}

          {/* Name */}
          <h3
            className="font-bold text-gray-900 text-lg leading-tight cursor-pointer hover:text-red-600 transition-colors line-clamp-2"
            onClick={() => navigate(`/products/${product.id}`)}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
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
            </div>
            <span className="text-gray-500 text-sm font-medium">
              {product.rating?.toFixed(1) || "0.0"}
            </span>
            {product.reviewCount && (
              <span className="text-gray-400 text-xs">
                ({product.reviewCount} reviews)
              </span>
            )}
          </div>

          {/* Description (for list view) */}
          {viewMode === "list" && product.description && (
            <p className="text-gray-600 text-sm line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {/* Price and Actions */}
        <div className={`flex items-center justify-between mt-4 ${viewMode === "list" ? "mt-6" : ""}`}>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                ${product.salePrice || product.price}
              </span>
              {product.salePrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.price}
                </span>
              )}
            </div>
            {product.salePrice && (
              <span className="text-xs text-red-600 font-medium">
                Save ${(product.price - product.salePrice).toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2.5 rounded-full flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105 active:scale-95"
          >
            <ShoppingCart size={16} />
            <span className={viewMode === "grid" ? "hidden sm:inline" : ""}>
              Add to Cart
            </span>
          </button>
        </div>

        {/* Stock Status */}
        {product.stock !== undefined && (
          <div className="mt-3 flex items-center gap-2">
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
      </div>
    </div>
  );
}

export default ProductCard;