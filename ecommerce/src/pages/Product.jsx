import React, { useState, useEffect } from "react";
import { Star, ShoppingCart, Search } from "lucide-react";
import axios from "axios";
import api from "../Api/AxiosInstance";

function Product() {

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedTeams, setSelectedTeams] = useState([])

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);




  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Logic for handleCategory 
 

  const handleCategoryChange = (category) => {
    console.log("Selected ", selectedCategories, 'Category', category);

    if (selectedCategories == category) {
      // remove category if already selected
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      // add category if not selected
      setSelectedCategories([...selectedCategories, category]);
    }
  };



  const handleTeamChange = (team) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ?
        prev.filter((t) => t !== team) :
        [...prev, team])

    const fiteredProducts = products.filter((p) => {

      // search filter 
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category);

      // Team filter
      const matchesTeam =
        selectedTeams.length === 0 || selectedTeams.includes(p.team);

      return matchesSearch && matchesCategory && matchesTeam;
    })

  }
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Football Store</h1>
        <p className="text-lg text-gray-200">
          Premium gear from the world&apos;s top clubs and brands
        </p>
        <a href="/" className="mt-4 inline-block text-blue-300 hover:text-white underline">
          ← Back to Home
        </a>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 py-10 flex gap-8">
        {/* Sidebar Filters */}
        <aside className="w-64 bg-white rounded-xl shadow-md p-6 hidden md:block">
          <h2 className="font-bold text-lg mb-4">Filters</h2>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Categories</h3>
            <ul className="space-y-2 text-gray-700">
              <li><input type="checkbox" className="mr-2" onChange={() => setSelectedCategories([])} /> All </li>
              <li><input type="checkbox" className="mr-2" onChange={(e) => handleCategoryChange(e.target.value)}
                value="Jersey" checked={selectedCategories.includes('Jerseys')} /> Jerseys </li>
              <li><input type="checkbox" className="mr-2" onChange={(e) => handleCategoryChange(e.target.value)}
                value="Shorts" checked={selectedCategories.includes("Shorts")} /> Shorts </li>
              <li><input type="checkbox" className="mr-2" onChange={(e) => handleCategoryChange(e.target.value)}
                checked={selectedCategories.includes("Boots")} /> Boots </li>
              <li><input type="checkbox" className="mr-2" onChange={(e) => handleCategoryChange(e.target.value)}
                checked={selectedCategories.includes("Gloves")} /> Gloves </li>
              <li><input type="checkbox" className="mr-2" onChange={(e) => handleCategoryChange(e.target.value)}
                checked={selectedCategories.includes("Accessories")} /> Accessories</li>
            </ul>
          </div>

          {/* Teams */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Teams</h3>
            <ul className="space-y-2 text-gray-700">
              <li><input type="checkbox" className="mr-2" onChange={() => handleTeamChange("Barcelona")}
                checked={selectedTeams.includes("Barcelona")} /> Barcelona </li>
              <li><input type="checkbox" className="mr-2" onChange={() => handleTeamChange("Real Madrid")}
                checked={selectedTeams.includes("Real Madrid")} /> Real Madrid </li>
              <li><input type="checkbox" className="mr-2" onChange={() => handleTeamChange("PSG")}
                checked={selectedTeams.includes("PSG")} /> PSG </li>
              <li><input type="checkbox" className="mr-2" onChange={() => handleTeamChange("Manchester United")}
                checked={selectedTeams.includes("Manchester United")} /> Manchester United </li>
              <li><input type="checkbox" className="mr-2" onChange={() => handleTeamChange("Liverpool")}
                checked={selectedTeams.includes("Liverpool")} /> Liverpool </li>
            </ul>
          </div>

          
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search & Sort */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            {/* Search bar */}
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sort Dropdown */}
            <select className="border rounded-lg px-4 py-2">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition relative flex flex-col"
              >
                {/* Badges */}
                {product.offer && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                    {product.offer}
                  </span>
                )}
                {product.limited && (
                  <span className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded-md">
                    Limited Edition
                  </span>
                )}

                {/* Product Image */}
                <div className="w-full h-48 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-grow p-4">
                  <h2 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h2>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-blue-600">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm line-through text-gray-500">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < product.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                          }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      ({product.rating})
                    </span>
                  </div>

                  {/* Add to Cart */}
                  <button className="mt-auto flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;

