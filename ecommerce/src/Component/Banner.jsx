import React from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
      return (
        
              <div className="min-h-screen">
              <div className="relative w-full h-screen overflow-hidden">
       
        <img src="../src/assets/Images/stad.jpg" alt="Football Stadium Banner"
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 lg:px-20">
          <div className="max-w-4xl">
          
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md inline-flex items-center gap-1 transition-colors cursor-pointer">
                 SEASON SALE - UP TO 50% OFF
              </div>
              <div className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md inline-flex items-center transition-colors cursor-pointer">
                FREE SHIPPING
              </div>
            </div>

      
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight">
              Wolf
              <span className="block text-red-500">Athletix</span>
            </h1>

         
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 max-w-2xl">
              Gear up for greatness!
            </p>

       
            {/* <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Authentic Jerseys</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>Official Licensed</span>
              </div>
            </div> */}

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => navigate('/products')}
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

      {/* ================= Products/Jersey Section ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2  id="top-jerseys"  className="text-3xl font-bold mb-8 text-gray-900">Top Jerseys</h2>

        {/* Example Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {/* Example cards - replace with mapped products */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <img src="../src/assets/Images/bayern_home.jpg"/>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
             <img src="../src/assets/Images/real_home.jpg"/>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
             <img src="../src/assets/Images/liverpool_home.jpg"/>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
             <img src="../src/assets/Images/barca_home.jpg"/>
          </div>
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/products')}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 font-medium"
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
}
