import React from "react";
import { useNavigate } from "react-router-dom";
import ProdVid from '../assets/Videos/champ.mp4'

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="relative w-full h-screen overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={ProdVid} type="video/mp4" />
        
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md inline-flex items-center gap-1 transition-colors cursor-pointer">
                SEASON SALE - UP TO 50% OFF
              </div>
              <div className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md inline-flex items-center transition-colors cursor-pointer">
                FREE SHIPPING
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight">
              Wolf
              <span className="block text-red-500">Athletix</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 max-w-2xl">
              Gear up for greatness!
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => navigate("/products")}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 font-medium"
              >
                Shop Now
              </button>

              <button className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg rounded-xl backdrop-blur-sm transition-all duration-300 font-medium">
                View Collections
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
            </div>
            <span className="text-xs">Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* Top Jerseys Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 id="top-jerseys" className="text-3xl font-bold mb-8 text-gray-900">
          Top Jerseys
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <img src="../src/assets/Images/bayern_home.jpg" alt="Bayern Home Jersey" />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <img src="../src/assets/Images/real_home.jpg" alt="Real Madrid Home Jersey" />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <img src="../src/assets/Images/liverpool_home.jpg" alt="Liverpool Home Jersey" />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <img src="../src/assets/Images/barca_home.jpg" alt="Barcelona Home Jersey" />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/products")}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 font-medium"
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
}
