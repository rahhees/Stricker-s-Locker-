import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';
import Cart from './pages/CartPage';
// import Trending from './Component/Trending';
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
import ViewUsers from './Component/Admin/ViewUsers';
import AdminDashboard from './Component/Admin/AdminDashboard';
import footballAnimation from './animation/FootballAnimation.json'
import Lottie from 'lottie-react'
import '../src/App.css'


// Football-themed loading component

       

const Product = lazy(() => import("./pages/Product"));



const Animation = () => {
  return (
    <Lottie
      animationData={footballAnimation}
      loop={true}
      style={{ width: 200, height: 200, margin: 'auto', marginTop: '20%' }}
    />
  );
};

  

function App() {
  const location = useLocation();


  
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
   
    const timer = setTimeout(() => setShowLoader(false), 1000);

    return () => clearTimeout(timer);
  }, []);
  const hideNavbarPaths = [
    '/login',
    '/admin/login',
    '/admin/dashboard',
    '/admin/users',
    '/admin/orderadmin',
    '/admin/productadmin',
    '/admin/newproductadmin',
    '/404'
  ];

  if (showLoader) {
    // Always show football animation for X seconds
    return <Animation />;
  }

  
  return (
    <>
      <Suspense fallback={<Animation />}>
        <SearchProvider>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <OrderProvider>
                  <ToastContainer position='top-right' autoClose={2000} />

                  {/* Show Navbar only if path is not in hidden list */}
                  {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

                  <Routes>

                    {/* Public pages */}
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Product />} />
                    <Route path='/products/:id' element={<ProductDetails />} />
                    <Route path='/contact' element={<ContactPage />} />
                    <Route path='/about' element={<AboutPage />} />

                    {/* Auth routes (public) */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
                    <Route path="/admin/login" element={<LoginAdmin />} />

                    {/* Admin protected routes */}
                    <Route element={<ProtectedRoute roles={['admin']} />}>
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                      <Route path="/admin/orderadmin" element={<OrderAdmin />} />
                      <Route path="/admin/productadmin" element={<AddProduct />} />
                      <Route path="/admin/newproductadmin" element={<NewProduct />} />
                      <Route path="/admin/users" element={<ViewUsers />} />
                    </Route>

                    {/* User protected routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path='/cartpage' element={<Cart />} />
                      {/* <Route path='/trending' element={<Trending />} /> */}
                      <Route path='/wishlist' element={<WhislistPage />} />
                      <Route path='/shipping' element={<ShippingPage />} />
                      <Route path='/profile' element={<ProfilePage />} />
                      <Route path='/payment' element={<PaymentPage />} />
                      <Route path='/confirmation' element={<ConfirmationPage />} />
                      <Route path='/order' element={<OrderDetails />} />
                    </Route>

                    {/* 404 page */}
                    <Route path="/404" element={<h1>404 Page Not Found</h1>} />
                    <Route path="*" element={<Navigate to="/404" replace />} />

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