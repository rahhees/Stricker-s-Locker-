import React, { useContext, useEffect, useState } from 'react';
import { Search, Filter, Grid3X3, List, ShoppingCart, Heart } from 'lucide-react';
import api from '../Api/AxiosInstance';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import ProductCard from '../Component/CartDesign'; 
import { useNavigate } from 'react-router-dom';

function Product() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [sortOption, setSortOption] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [categoryFilter, SetCategoryFilter] = useState("All");

  const { wishlist, addToWishlist } = useContext(WishlistContext);
  const { cart, addToCart } = useContext(CartContext);

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);


  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching data...', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log('Cart Updated', cart);
  }, [cart]);

  // Filter by search
  let filteredProducts = products.filter((p) => {
    const query = appliedSearch.toLowerCase();
    return (
      query === '' ||
      p.name.toLowerCase().includes(query) ||
      p.category?.toLowerCase().includes(query) ||
      p.team?.toLowerCase().includes(query)
    );
  });

  // Filter by category
  let filteredProductss = products.filter((p) => {
    const query = appliedSearch.toLowerCase();
    const matchesSearch =
      query === '' ||
      p.name.toLowerCase().includes(query) ||
      p.team?.toLowerCase().includes(query);

    const matchesCategory =
      categoryFilter === 'All' || p.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Sort
  filteredProductss = filteredProductss.sort((a, b) => {
    if (sortOption === 'Featured') return (b.featured === 'true') - (a.featured === 'true');
    if (sortOption === 'Price: Low to High') return a.price - b.price;
    if (sortOption === 'Price: High to Low') return b.price - a.price;
    if (sortOption === 'Newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOption === 'Top Rated') return b.rating - a.rating;
    return 0; 
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setAppliedSearch(searchTerm);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <p className="text-gray-600 mt-1">Discover amazing products at great prices</p>
        </div>

        {/* Search Bar */}
        <form className="w-full sm:w-80 lg:w-64 relative" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black text-white p-1 rounded hover:bg-gray-800"
          >
            <Search size={14} />
          </button>
        </form>

        {/* Cart + Wishlist */}
        <div className="flex items-center gap-3">
          <button  onClick={()=>navigate('/CartPage')}   className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <ShoppingCart size={20} className="text-black-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cart.length}
            </span>
          </button>
          <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            <Heart size={20} className="text-black-500" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {wishlist.length}
            </span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
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

          {/* Category Filter */}
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

        {/* View toggle */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">View:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      {filteredProductss.length > 0 ? (
        <div
          className={`${
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
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
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600">No products found. Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}

export default Product;
