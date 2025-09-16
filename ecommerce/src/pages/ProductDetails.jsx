// ProductDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Api/AxiosInstance";
import { ShoppingCart, Star, Heart, Share2, Shield, Truck, RotateCcw, Award, Link } from "lucide-react";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import ProductCard from "../Component/CartDesign";

function ProductDetails() {
  
     const [product, setProduct] = useState(null);
     const [relatedProducts, setRelatedProducts] = useState([]);
     const [isWishlisted, setIsWishlisted] = useState();
     const [selectedImage, setSelectedImage] = useState(0);
     const [quantity, setQuantity] = useState(1);
     // Zoom functionality states
     const [isHovering, setIsHovering] = useState(false);
     const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

     const {addToCart} = useContext(CartContext)
     const {addToWishlist, wishlist} = useContext(WishlistContext)
     const { id } = useParams();
  

   const handleWishlist = () => {
    addToWishlist(product);
    setIsWishlisted(!isWishlisted);
  };

  // Zoom functionality handlers
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const isInWishlist = (id) =>
    wishlist ? wishlist.some((item) => item.id === id) : false;

    useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);

        
        const allRes = await api.get("/products");
        
        const related = allRes.data.filter(
          (p) =>
            p.category?.toLowerCase() === res.data.category?.toLowerCase() &&
            p.id !== res.data.id
        );
        setRelatedProducts(related);
      } catch (err) {
        console.error("Error fetching product", err);
      }
    };
    fetchProduct();
  }, [id]);


  const navigate = useNavigate()

  const handleBuy = ()=>{
   navigate("/Shipping", {
    state: { product, quantity }
  });
};

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 ">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4 "></div>
          <p className="text-xl text-gray-600">Loading Product...</p>
        </div>
      </div>
    );
  }


  // multiple imagesss


    const productImages = product.images  ? (Array.isArray(product.images) ? product.images : [product.images])
      : [product.image || "https://via.placeholder.com/600x600"];




  return (
    <div className="min-h-screen  from-gray-50 via-white to-gray-100 mt-10">
    <div className="max-w-7xl mx-auto px-4 pt-6">
    <nav className="text-sm text-gray-500 mb-4 ">
          {/* <span>Home</span> <span className="mx-2"></span> 
          <span>Products</span> <span className="mx-2"></span>
          <span className="text-gray-900 font-medium">{product.name}</span> */}
    </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="space-y-4">
          <div className="relative group">
          <div className="bg-white rounded-3xl shadow-lg p-8 overflow-hidden">


                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-contain transition-transform duration-300 group-hover:scale-105"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ cursor: isHovering ? 'zoom-in' : 'default' }}
                />
                
                {/* Zoom Preview Window */}
                {isHovering && (
                  <div 
                    className="absolute top-0 left-full ml-4 w-96 h-96 border-4 border-white shadow-2xl rounded-3xl overflow-hidden pointer-events-none z-50 bg-white"
                    style={{
                      backgroundImage: `url(${productImages[selectedImage]})`,
                      backgroundSize: '300%',
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                )}
           
                <button onClick={handleWishlist} className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200" >
                  <Heart 
                    size={20} 
                    className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"} />
                </button>

           </div>
           </div>

          
            <div className="flex space-x-3 overflow-x-auto">
              {productImages.map((img, index) => (
                <button    key={index}    onClick={() => setSelectedImage(index)}    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${      selectedImage === index         ? 'border-black shadow-lg'         : 'border-gray-200 hover:border-gray-300'    }`} >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/*  Product Information */}

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                  ✓ In Stock
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                  Fast Delivery
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

   
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star   key={i}   size={20}   className={ i < Math.floor(product.rating || 4.5)       ? "fill-yellow-400 text-yellow-400"       : "text-gray-300"} /> ))}
              </div>
            </div>

            


            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-xl text-gray-500 line-through">₹{Math.floor(product.price * 1.3)}</span>
              <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded-lg">
              {Math.floor((1 - product.price / (product.price * 1.3)) * 100)}% OFF
              </span>
            </div>


            {/* Quantity Selector */}
          <div className="flex items-center gap-4">
          <span className="font-medium text-gray-900">Quantity:</span>
          <div className="flex items-center border-2 border-gray-200 rounded-full">
           <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-l-full transition-colors">
             -
          </button>
           <span className="w-12 text-center font-medium">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-r-full transition-colors" >
            +
          </button>
          </div>

 {/* show total price */}
             <span className="ml-4 font-semibold text-lg text-gray-900">
                ₹{(product.price * quantity).toFixed(2)}
              </span>
               </div>


            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={()=>addToCart(product)}
                className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg">
                <ShoppingCart size={24} />
                Add to Cart
              </button>
              
              <button onClick={handleBuy} className="w-full bg-gray-100 text-gray-900 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-200 transition-all duration-200">
                Buy Now
              </button>
            </div>
            

                {/* symbols in detailss */}

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over ₹500</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <RotateCcw size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Secure Payment</p>
                  <p className="text-sm text-gray-600">100% secure checkout</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Award size={20} className="text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Quality Assured</p>
                  <p className="text-sm text-gray-600">Premium materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <ProductCard 
                  key={item.id} 
                  product={item}
                  onAddToCart={addToCart}
                  onAddToWishlist={addToWishlist}
                  isInWishlist={isInWishlist}
                  viewMode="grid"
                  onClick={() => navigate(`/products/${item.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;