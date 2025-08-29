import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';

import Home from './pages/Home'; 
import './App.css';
import Product from './pages/Product';
import { Authprovider } from './Context/AuthContext';
import {  CartProvider} from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';
import Cart from './pages/CartPage'



function App() {
  return (
    <>
   
      

    <WishlistProvider>
      <CartProvider>
        <Authprovider>
        
  <Routes>

               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/products" element={<Product />} />
               <Route path='/cart' element={<Cart/>}/>

</Routes>

        </Authprovider>
        </CartProvider>
        </WishlistProvider>

    </>
  );
}

export default App;
