import { lazy, Suspense, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';
import Cart from './pages/CartPage';
import Trending from './Component/Trending';
import WhislistPage from './pages/WhislistPage';
import ProtectedRoute from './Component/Routes/ProtectedRoute';
import { SearchProvider } from './Context/SearchContext';
import ShippingPage from './pages/ShippingPage';
import { ToastContainer } from "react-toastify";
import ProductDetails from './pages/ProductDetails';
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from './pages/ProfilePage';
import Navbar from './Component/Navbar';
import PaymentPage from './pages/PaymentPage';
import { OrderProvider } from './Context/OrderContext';
import ConfirmationPage from './pages/ConfirmationPage';
import ContactPage from './pages/ContactPage';
import OrderDetails from './pages/OrderDetails';
import AddProduct from './Component/Admin/ProductAdmin';
import LoginAdmin from './Component/Admin/LoginAdmin';
import OrderAdmin from './Component/Admin/OrderAdmin';
import NewProduct from './Component/Admin/NewProduct';
import AboutPage from './pages/AboutPage';
import { Users } from 'lucide-react';
import ViewUsers from './Component/Admin/ViewUsers';
import AdminDashboard from './Component/Admin/AdminDashboard';


const Product=lazy(function(){
  return import("./pages/Product")
})

function App() {
  const location = useLocation();

  // Hide Navbar on login page
  const hideNavbarPaths = ['/login','/admin','/Dashboard','/OrderAdmin','/AddProduct','/ViewProduct','/NewProduct','/ViewUsers'];

  return (
    <>
    
{/* </Route> */}
    <Suspense fallback={<div>loading</div>}>
    <SearchProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <OrderProvider>
              <ToastContainer position='top-right' autoClose={2000} />

              {/* Render Navbar conditionally */}
              {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

              <Routes>
                {/* Public route */}
                <Route path="/login" element={<Login />} />



    <Route path="/admin" element={<LoginAdmin />} />
    <Route path="/ViewProduct" element={<AddProduct/>}/>
    <Route path='/OrderAdmin' element={<OrderAdmin/>}/>
    <Route path='/NewProduct' element={<NewProduct/>}/>
    <Route path='/ViewUsers' element={<ViewUsers/>}/>
    <Route path='/Dashboard' element={<AdminDashboard/>}/>


                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path='/CartPage' element={<Cart />} />
                  <Route path='/Trending' element={<Trending />} />
                  <Route path='/Wishlist' element={<WhislistPage />} />
                  <Route path='/Shipping' element={<ShippingPage />} />
                  <Route path='/Profile' element={<ProfilePage />} />
                  <Route path='/Payment' element={<PaymentPage />} />
                  <Route path='/Confirmation' element={<ConfirmationPage />} />
                  <Route path='/Order' element={<OrderDetails/>}/>
                </Route>

                {/* Public pages */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Product />} />
                <Route path='/products/:id' element={<ProductDetails />} />
                <Route path= '/Contact' element={<ContactPage/>}/>
                <Route path='about' element={<AboutPage/>}/>
                
                {/* 404 */}
                <Route path='*' element={<h1>404 Page Not Found</h1>} />
              </Routes>
            </OrderProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </SearchProvider>
    </Suspense>
</>
  );
}

export default App;
