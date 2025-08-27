import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';

import Home from './pages/Home'; 
import './App.css';
import Product from './pages/Product';
import { Authprovider } from './Context/AuthContext';



function App() {
  return (
    <>
   
      

    
    
        <Authprovider>
  <Routes>

               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path="/products" element={<Product />} />

</Routes>
        </Authprovider>

    </>
  );
}

export default App;
