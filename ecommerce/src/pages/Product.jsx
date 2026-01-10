import React, { useContext, useEffect, useState, useCallback } from "react";
import { Filter, ShoppingBag, X, CheckCircle2 } from "lucide-react";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import ProductCard from "../Component/CartDesign";
import { useNavigate } from "react-router-dom";
import { productService } from "../Services/ProductService";
import * as Dialog from "@radix-ui/react-dialog";

function Product() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [totalPages, setTotalPages] = useState(1);
  
  // Radix Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { addToWishlist, wishlist = [] } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  // --- Updated: Add to Cart with Radix Modal ---
  const handleAddToCartWithModal = async (product) => {
    try {
      await addToCart(product);
      setLastAddedProduct(product);
      setIsModalOpen(true);
      
      // Automatically close after 4 seconds
      setTimeout(() => setIsModalOpen(false), 4000);
    } catch (error) {
      console.error("Could not add item to cart", error);
    }
  };

  const mapSortOption = (option) => {
    switch (option) {
      case "Price: Low to High":
        return { sortBy: "price", order: "asc" };
      case "Price: High to Low":
        return { sortBy: "price", order: "desc" };
      case "Newest":
        return { sortBy: "createdAt", order: "desc" };
      case "Top Rated":
        return { sortBy: "rating", order: "desc" };
      default:
        return {};
    }
  };


  
  const getFullImageUrl = (path) => {
    const BACKEND_URL = "https://localhost:57401"; // Match your C# API Port
    if (!path) return "/placeholder-image.png";
    if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${BACKEND_URL}${cleanPath}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const sort = mapSortOption(sortOption);

        const params = {
          page: currentPage,
          pageSize: itemsPerPage,
          sortBy: sort.sortBy,
          order: sort.order,
          category: categoryFilter !== "All" ? categoryFilter : undefined
        };

        const res = await productService.getProductByFilter(params);

        setProducts(res.data.items);
        setTotalPages(res.data.totalPages);

        console.group("Product Sort Debug");
        console.log("UI Sort:", sortOption);
        console.log("API Params:", sort);
        console.groupEnd();

      } catch (err) {
        console.error("Error fetching products", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [currentPage, sortOption, categoryFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOption, categoryFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4 mt-5">
          <Filter size={16} className="text-white" />
          <span className="text-white text-sm font-medium">Sort By:</span>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          >
            <option>All</option>
            <option>Featured</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Top Rated</option>
          </select>
        </div>
      </div>

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={() => handleAddToCartWithModal(p)}
                onAddToWishlist={addToWishlist}
                isInWishlist={isInWishlist}
                onClick={() => p.stock > 0 && navigate(`/product/${p.id}`)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16 text-gray-400 font-medium">
          No products found. Try adjusting your filters.
        </div>
      )}

      {/* --- Optimized Radix Dialog (Toast-Style Bottom Modal) --- */}
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          {/* Subtle Overlay */}
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300" />
          
          <Dialog.Content 
            className="fixed bottom-0 left-0 right-0 lg:left-auto lg:right-8 lg:bottom-8 lg:w-[380px] bg-gray-900/95 border-t lg:border border-gray-700 p-5 shadow-2xl z-50 focus:outline-none animate-in slide-in-from-bottom-full lg:slide-in-from-right-full duration-500 rounded-t-3xl lg:rounded-2xl backdrop-blur-md"
          >
            <div className="flex flex-col gap-4">
              {/* Top Section: Icon & Close */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-green-400 font-semibold text-sm">
                  <CheckCircle2 size={18} />
                  <span>Success</span>
                </div>
                <Dialog.Close asChild>
                  <button className="text-gray-500 hover:text-white p-1 hover:bg-gray-800 rounded-full transition-all">
                    <X size={18} />
                  </button>
                </Dialog.Close>
              </div>

              {/* Middle Section: Product Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/5 rounded-xl overflow-hidden border border-gray-700 p-1 flex-shrink-0">
                  <img 
                    src={getFullImageUrl(lastAddedProduct?.image || lastAddedProduct?.imageUrl )}
                    className="w-full h-full object-contain" 
                    alt={lastAddedProduct?.name} 
                  />
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <Dialog.Title className="text-white font-bold text-base truncate">
                    {lastAddedProduct?.name}
                  </Dialog.Title>
                  <Dialog.Description className="text-gray-400 text-xs mt-0.5">
                    Added to your shopping cart.
                  </Dialog.Description>
                </div>
              </div>

              {/* Bottom Section: Actions */}
              <div className="flex gap-2 items-center mt-2">
                <button 
                  onClick={() => navigate("/cart")}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} />
                  View Cart
                </button>
                <Dialog.Close asChild>
                  <button className="px-4 bg-transparent hover:bg-gray-800 text-gray-300 text-xs font-bold py-2.5 rounded-xl transition-all border border-gray-700 active:scale-95">
                    Close
                  </button>
                </Dialog.Close>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default Product;