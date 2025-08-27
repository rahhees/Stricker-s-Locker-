import React, { useState } from "react";
import { Menu, X, Search, User, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigate = (path, category = null) => {
    if (category) {
      navigate(path, { state: { category } });
    } else {
      navigate(path);
    }
  };

  return (
    <>
      {/* TOP NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              onClick={() => handleNavigate("/")}
              className="text-2xl font-bold text-blue-600 cursor-pointer"
            >
              Striker’s Locker
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <button
                onClick={() => handleNavigate("/sale")}
                className="text-red-600 font-semibold hover:text-red-700 transition cursor-pointer"
              >
                Top Sale
              </button>

              {/* Search Bar */}
              <div className="flex items-center border rounded-lg px-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-2 py-1 focus:outline-none"
                />
                <Search size={18} className="text-gray-500" />
              </div>

              {/* Profile */}
              <button
                onClick={() => handleNavigate("/profile")}
                className="hover:text-blue-600 transition flex items-center gap-1 cursor-pointer"
              >
                <User size={20} /> Profile
              </button>

              {/* Sign In */}
              <button
                onClick={() => handleNavigate("/signin")}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 cursor-pointer"
              >
                Sign In
              </button>

              {/* Cart */}
              <button
                onClick={() => handleNavigate("/cart")}
                className="relative flex items-center gap-1 hover:text-blue-600 transition cursor-pointer"
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
                  2
                </span>
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu}>
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="flex flex-col space-y-4 p-4">
              <button
                onClick={() => handleNavigate("/sale")}
                className="text-red-600 font-semibold hover:text-red-700 transition cursor-pointer"
              >
                Sale
              </button>

              {/* Search */}
              <div className="flex items-center border rounded-lg px-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-2 py-1 w-full focus:outline-none"
                />
                <Search size={18} className="text-gray-500" />
              </div>

              <button
                onClick={() => handleNavigate("/profile")}
                className="flex items-center gap-2 hover:text-blue-600 transition cursor-pointer"
              >
                <User size={20} /> Profile
              </button>

              <button
                onClick={() => handleNavigate("/signin")}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-center cursor-pointer"
              >
                Sign In
              </button>

              <button
                onClick={() => handleNavigate("/cart")}
                className="flex items-center gap-2 hover:text-blue-600 transition cursor-pointer"
              >
                <ShoppingCart size={20} /> Cart
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* SECONDARY NAVBAR */}
      <div className="fixed top-16 left-0 w-full bg-gray-100 shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-evenly h-12 items-center">
            <button
              onClick={() => handleNavigate("/")}
              className="hover:text-blue-600 transition cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate("/products", "jerseys")}
              className="hover:text-blue-600 transition cursor-pointer"
            >
              Jerseys
            </button>
            <button
              onClick={() => handleNavigate("/products", "shorts")}
              className="hover:text-blue-600 transition cursor-pointer"
            >
              Shorts
            </button>
            <button
              onClick={() => handleNavigate("/products", "gloves")}
              className="hover:text-blue-600 transition cursor-pointer"
            >
              Gloves
            </button>
            <button
              onClick={() => handleNavigate("/products", "accessories")}
              className="hover:text-blue-600 transition cursor-pointer"
            >
              Accessories
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
