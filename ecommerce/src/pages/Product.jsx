import React, { useContext, useEffect, useState } from "react";
import { Filter, Grid3X3, List } from "lucide-react";
import api from "../Api/AxiosInstance";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import ProductCard from "../Component/CartDesign";
import { useNavigate } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [categoryFilter, SetCategoryFilter] = useState("All");

  const { addToWishlist, wishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const navigate = useNavigate();

  const isInWishlist = (id) =>
    wishlist.some((item) => item.id === id);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching data...", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply category filter
  let filteredProductss = products.filter((p) => {
    return (
      categoryFilter === "All" ||
      p.category?.toLowerCase() === categoryFilter.toLowerCase()
    );
  });

  // Sorting
  filteredProductss = filteredProductss.sort((a, b) => {
    if (sortOption === "Featured")
      return (b.featured === "true") - (a.featured === "true");
    if (sortOption === "Price: Low to High") return a.price - b.price;
    if (sortOption === "Price: High to Low") return b.price - a.price;
    if (sortOption === "Newest")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOption === "Top Rated") return b.rating - a.rating;
    return 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 pt-25">
      {/* Filters & Sorting */}
      <div className="max-w-7xl mx-auto flex flex-col gap-4 mb-6">
        {/* Sort + Category */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-gray-600">
              <Filter size={16} />
              <span className="text-sm font-medium">Sort By:</span>
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All</option>
              <option>Featured</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => SetCategoryFilter(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All</option>
              <option>Balls</option>
              <option>Jersey</option>
              <option>Shorts</option>
              <option>Socks</option>
              <option>Gloves</option>
              <option>Accessories</option>
            </select>
          </div>

          {/* Toggle grid/list */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">View:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid/List */}
      {filteredProductss.length > 0 ? (
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          } max-w-7xl mx-auto`}
        >
          {filteredProductss.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
              isInWishlist={isInWishlist}
              viewMode={viewMode}
              onClick={() => navigate(`/products/${p.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600">
            No products found. Try adjusting your filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default Product;
