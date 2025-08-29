import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';
import Banner from '../Component/Banner';
import Trending from '../Component/Trending';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';
import api from '../Api/AxiosInstance';

function Home() {
  const { cart, addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist } = useContext(WishlistContext);

  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  return (
    <div>
      <Navbar />
      <Banner />
      <Trending
        products={products} 
        onAddToCart={addToCart} 
        onAddToWishlist={addToWishlist} 
        isInWishlist={isInWishlist}
      />
      <Footer />
    </div>
  );
}

export default Home;
