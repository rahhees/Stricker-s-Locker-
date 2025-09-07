
import React, { useContext } from 'react';
import ProductCard from './CartDesign';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';

function Trending({ products, onAddToCart, onAddToWishlist, isInWishlist }) {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

 

  const trendingProducts = products.filter(p => p.featured === "true");

  const handleAddToCart = (product) => {
    if (!user) {
      toast.info("Please login first...");
      navigate("/login");
      return;
    }
    onAddToCart(product);
  };

  // wrapper to check login before calling addToWishlist
  const handleAddToWishlist = (product) => {
    if (!user) {
      navigate("/login");
       toast.info(" Please Login first")
      return;
    }
    onAddToWishlist(product);
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6">Top Sale Items</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {trendingProducts.map(product => (
          <ProductCard key={product.id} product={product}  onAddToCart={()=>handleAddToCart(product)}  onAddToWishlist={()=>handleAddToWishlist(product)}  isInWishlist={isInWishlist}  viewMode="grid"/>
        )
       )
      }
      </div>
    </div>
  );
}

export default Trending;
