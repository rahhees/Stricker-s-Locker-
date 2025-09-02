import React, { useContext, useState } from "react";
import { Search, User, ShoppingCart ,Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { SearchContext } from "../Context/SearchContext";
import { WishlistContext } from "../Context/WishlistContext";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { cartLength } = useContext(CartContext);
  const {wishlistLength} = useContext(WishlistContext)
  const {searchTerm,setSearchTerm,applySearch} = useContext(SearchContext)

  const handleSearch = (e)=>{
    e.preventDefault();
    applySearch()
    navigate('/products')
 
  }

  const toggleProfile = () => setProfileOpen(!profileOpen);

  const handleNavigate = (path, category = null) => {
    if (category) {
      navigate(path, { state: { category } });
    } else {
      navigate(path);
    }
  };

  const handleSignOut = () => {
    console.log("Sign Out...");
    localStorage.removeItem("user");
    alert("SignOut Successfully...")
    navigate("/login");

  };

  return (

    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
      
          <div onClick={() => handleNavigate("/")}  className="text-2xl font-bold text-blue-600 cursor-pointer" >

            Wolf Athletix

          </div>
       
          <div className="hidden md:flex space-x-6 items-center">

            <a href="#top-jerseys"className="text-red-600 font-semibold hover:text-red-700 transition cursor-pointer">

              Top Sale
              
               </a>


       <form onSubmit={handleSearch} className="flex items-center border rounded-lg px-2">

          <input type="text"  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  placeholder="Search Products..." className="px-2 py-1 focus:outline-none"/>

         <button type="submit"><Search size={18} className="text-gray-500" /></button>
         
      </form>


            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="hover:text-blue-600 transition flex items-center gap-1 cursor-pointer"
              >
                <User size={20} /> Profile
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md flex flex-col">
                  <button
                    onClick={() => handleNavigate("/profile")}
                    className="px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 hover:bg-gray-100 text-left text-red-600"
                  >
                    Sign Out
                  </button>
                  
                </div>
                
              )}
            </div>

        
     <button onClick={() => handleNavigate("/CartPage")}
              className="relative flex items-center gap-1 hover:text-blue-600 transition cursor-pointer">


                <div className="relative">  <ShoppingCart size={20} />  {cartLength > 0 && (
      <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
        {cartLength}
      </span>)}</div>

              
            </button>

            <button onClick={()=>handleNavigate("/Wishlist")}
                className="relative flex items-center gap-1 hover:text-blue-600 transition cursor-pointer" >

                 <div className="relative"  > <Heart size={20}/>{wishlistLength>0 && (  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistLength}
                </span>)}</div>

            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
