import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';

import Home from './pages/Home';
import './App.css';
import Product from './pages/Product';
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';
import Cart from './pages/CartPage'
import Trending from './Component/Trending';
import WhislistPage from './pages/WhislistPage';
import ProtectedRoute from './Component/Routes/ProtectedRoute';
import { SearchProvider } from './Context/SearchContext';
import ShippingPage from './pages/ShippingPage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"





function App() {
  return (
    <>
     <SearchProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <ToastContainer position='top-right' autoClose={1000}/>
            <Routes>

              <Route path="/login" element={<Login />} />

                 <Route element={<ProtectedRoute/>}>

                    <Route path='/CartPage' element={<Cart />} />

                    <Route path='/Trending' element={<Trending />} />

                    <Route path='/Wishlist' element={<WhislistPage />} />

                    <Route path='/Shipping' element={<ShippingPage/>}/>

              </Route>

                   <Route path="/" element={<Home />} />

                  <Route path="/products" element={<Product />} />



                   <Route path='*' element={<h1>404 Page Was Not Found</h1>} />

            </Routes>
    

          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
            </SearchProvider>

    </>
  );
}

export default App;
