// ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../Api/AxiosInstance";
import { ShoppingCart, Star, Heart, Share2, Shield, Truck, RotateCcw, Award, Link } from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading amazing product...</p>
        </div>
      </div>
    );
  }

  // Mock additional images for demo
// If product.images exists, use that, otherwise fallback
const productImages = product.images
  ? (Array.isArray(product.images) ? product.images : [product.images])
  : [product.image || "https://via.placeholder.com/600x600"];



  const handleAddToCart = () => {
    // Add cart logic here
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <nav className="text-sm text-gray-500 mb-4">
          <span>Home</span> <span className="mx-2">></span> 
          <span>Products</span> <span className="mx-2">></span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group">
              <div className="bg-white rounded-3xl shadow-lg p-8 overflow-hidden">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-contain transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Wishlist Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200"
                >
                  <Heart 
                    size={20} 
                    className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"} 
                  />
                </button>

                {/* Share Button */}
                <button className="absolute top-6 right-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200">
                  <Share2 size={20} className="text-gray-600 hover:text-blue-500" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 overflow-x-auto">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index 
                      ? 'border-black shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Information */}
          <div className="space-y-6">
            {/* Product Title & Badge */}
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

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < Math.floor(product.rating || 4.5)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-600 font-medium">
                {product.rating?.toFixed(1) || "4.5"} ({Math.floor(Math.random() * 500) + 100} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-xl text-gray-500 line-through">₹{Math.floor(product.price * 1.3)}</span>
              <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded-lg">
                {Math.floor((1 - product.price / (product.price * 1.3)) * 100)}% OFF
              </span>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description || "Experience premium quality with this carefully crafted product. Designed with attention to detail and built to last, this item combines functionality with style to meet your needs perfectly."}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-900">Quantity:</span>
              <div className="flex items-center border-2 border-gray-200 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-l-full transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-r-full transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <ShoppingCart size={24} />
                Add to Cart
              </button>
              
              <button className="w-full bg-gray-100 text-gray-900 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-200 transition-all duration-200">
                Buy Now
              </button>
            </div>

            {/* Features */}
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
      </div>
    </div>
  );
}

export default ProductDetails;