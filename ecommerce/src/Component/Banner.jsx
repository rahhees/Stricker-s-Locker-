import React from "react";
import banner from '../ProductImage/meeesi.jpg'

const Banner = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Banner Image */}
      <img
        src={banner}
        alt="Football Banner"
        className="w-full h-full object-cover"
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Stricker's Locker
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Premium jerseys & football gear from top clubs worldwide ⚽
        </p>
        <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
