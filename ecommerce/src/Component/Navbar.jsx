import React, { useContext, useState, useRef, useEffect } from "react";
import { Search, User, ShoppingCart, Heart, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { SearchContext } from "../Context/SearchContext";
import { WishlistContext } from "../Context/WishlistContext";
import { toast } from "react-toastify";
import api from "../Api/AxiosInstance";  
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const {user}=useContext(AuthContext)

  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navigate = useNavigate();

  const { cartLength } = useContext(CartContext);
  const { wishlistLength } = useContext(WishlistContext);
  const { searchTerm, setSearchTerm, applySearch } = useContext(SearchContext);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Fetch product suggestions from API
  const fetchSuggestions = async (query) => {
    try {
      const res = await api.get(`/products?search=${query}`); 
      // 👆 adjust query param to match backend API
      setSuggestions(res.data.slice(0, 5)); // show only 5
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    fetchSuggestions(value);
  };

  const highlightMatch = (text, query) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="text-red-600 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applySearch();
    navigate("/products");
    setSearchOpen(false);
    setMobileMenuOpen(false);
    setSuggestions([]);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
    setProfileOpen(false);
    setSuggestions([]);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    toast.success("Signed out successfully!");
    navigate("/login");
    setProfileOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 pt-4">
      <nav
        className={`max-w-6xl mx-auto 
        bg-white/90 backdrop-blur-lg 
        rounded-full border border-white/20
        shadow-2xl transition-all duration-500 ease-in-out
        ${isScrolled ? "shadow-xl bg-white/95" : "shadow-2xl"}`}
      >
        <div className="px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              onClick={() => handleNavigate("/")}
              className="flex items-center cursor-pointer py-2 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mr-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900 leading-none group-hover:text-red-600 transition-colors">
                  Wolf Athletix
                </div>
                <div className="text-xs text-gray-500 leading-none">Premium Football Gear</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {["Home", "Products", "Contact", "About"].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    handleNavigate(item === "Home" ? "/" : `/${item.toLowerCase()}`)
                  }
                  className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-all duration-300 rounded-full hover:bg-red-50 relative group"
                >
                  {item}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                </button>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2">
              {/* Mobile Search Icon */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-gray-700 hover:text-red-600 transition-all duration-300 rounded-full hover:bg-red-50 md:hidden"
              >
                <Search size={20} />
              </button>

              {/* Desktop Search */}
              <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="bg-gray-50/50 border border-gray-200/50 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 w-56 text-sm placeholder-gray-400 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Search size={16} />
                </button>

                {/* ✅ Suggestions */}
                {suggestions.length > 0 && (
                  <div className="absolute top-full mt-2 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {suggestions.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleNavigate(`/products/${item.id}`)}
                        className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 transition"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-8 h-8 object-cover rounded"
                        />
                        <span>{highlightMatch(item.name, searchTerm)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </form>

              {/* Wishlist */}
              <button
                onClick={() => handleNavigate("/Wishlist")}
                className="relative p-2.5 text-gray-700 hover:text-red-600 transition-all duration-300 rounded-full hover:bg-red-50 group"
              >
                <Heart size={20} className="group-hover:scale-110 transition-transform" />
                {wishlistLength > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-lg animate-pulse">
                    {wishlistLength}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => handleNavigate("/CartPage")}
                className="relative p-2.5 text-gray-700 hover:text-red-600 transition-all duration-300 rounded-full hover:bg-red-50 group"
              >
                <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
                {cartLength > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-lg animate-pulse">
                    {cartLength}
                  </span>
                )}
              </button>

              {/* Profile Dropdown */}
              <div  className={`${user ? "display" : "relative hidden lg:block"}`} ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-red-600 transition-all duration-300 rounded-full hover:bg-red-50 group"
                >
                  <User size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Account</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl border border-gray-200 shadow-2xl py-2 z-50 animate-fade-in-down">
                    <button
                      onClick={() => handleNavigate("/profile")}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-all duration-200"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => handleNavigate("/Order")}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-all duration-200"
                    >
                      Order History
                    </button>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-100 transition-all duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 text-gray-700 hover:text-red-600 transition-all duration-300 rounded-full hover:bg-red-50"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className={`absolute transition-all duration-300 ${
                      mobileMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                    }`}
                  />
                  <X
                    size={24}
                    className={`absolute transition-all duration-300 ${
                      mobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {searchOpen && (
            <div className="md:hidden border-t border-gray-200/30 px-4 py-4 relative">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="w-full bg-gray-50/50 border border-gray-200/50 rounded-full px-4 py-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 text-sm placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Search size={16} />
                </button>
              </form>

              {/* ✅ Suggestions for mobile too */}
              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleNavigate(`/products/${item.id}`)}
                      className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100 transition"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <span>{highlightMatch(item.name, searchTerm)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden border-t border-gray-200/30 bg-white/50 backdrop-blur-sm rounded-b-3xl"
          >
            <div className="px-8 py-4 space-y-2">
              {["Home", "Products", "Contact", "About"].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    handleNavigate(item === "Home" ? "/" : `/${item.toLowerCase()}`)
                  }
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:text-red-600 hover:bg-red-50/50 font-medium transition-all duration-200 rounded-full"
                >
                  {item}
                </button>
              ))}

              <hr className="border-gray-200/50 my-3" />
                 <button
                onClick={() => handleNavigate("/profile")}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-red-600 hover:bg-red-50/50 font-medium transition-all duration-200 rounded-full"
              >
                My Profile
              </button>

              <button
                onClick={() => handleNavigate("/profile")}
                className="block w-full text-left py-3 px-4 text-gray-700 hover:text-red-600 hover:bg-red-50/50 font-medium transition-all duration-200 rounded-full"
              >
                My Profile
              </button>
              <button
                onClick={handleSignOut}
                className="block w-full text-left py-3 px-4 text-red-600 hover:bg-red-50/50 font-medium transition-all duration-200 rounded-full"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
