import React, { useState, useEffect, useContext } from "react";
import { ChevronDown, Star, TrendingUp, Award, Users, ArrowRight, Play, ShoppingBag, Shield, Trophy, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import api from "../Api/AxiosInstance";
import { WishlistContext } from "../Context/WishlistContext";

export default function WolfAthletixHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [jerseys, setJersey] = useState([]);
  const [featuredJerseys, setFeaturedJerseys] = useState([]);
  const[newArrivals,setNewArrivals] = useState([])
  const [players,setPlayers] = useState([])

  const { addToCart } = useContext(CartContext);
  const {addToWishlist}  = useContext(WishlistContext)
  const navigate = useNavigate();

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setJersey(response.data);

      // Featured products
      const featured = response.data.filter(
        (item) => item.featured === "true" || item.featured === true
      );
      setFeaturedJerseys(featured);

      // New arrivals
      const arrivals = response.data.filter(
        (item) => item.newarrival === "true" || item.newarrival === true
      );
      setNewArrivals(arrivals); // ✅ important

    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };
  fetchProducts();
}, []);


  // Carousel auto slide + scroll detection


useEffect(() => {
  if (newArrivals.length === 0) return;

  const timer = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % newArrivals.length);
  }, 4000);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
    clearInterval(timer);
    window.removeEventListener("scroll", handleScroll);
  };
}, [newArrivals.length]);



  const calculateDiscount = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const goToSlide = (index) => setCurrentSlide(index);
const goToNextSlide = () => setCurrentSlide((prev) => (prev + 1) % newArrivals.length);
const goToPrevSlide = () => setCurrentSlide((prev) => (prev - 1 + newArrivals.length) % newArrivals.length);


  const teams = [
    { name: "Real Madrid", logo: "https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png" },
    { name: "Barcelona", logo: "https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png" },
    { name: "Bayern Munich", logo: "https://logos-world.net/wp-content/uploads/2020/06/Bayern-Munich-Logo.png" },
    { name: "Liverpool", logo: "https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png" },
    { name: "Chelsea", logo: "https://logos-world.net/wp-content/uploads/2020/06/Chelsea-Logo.png" },
    { name: "Manchester City", logo: "https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.png" },
  ];

  const leagues = [
    { name: "Premier League", logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg" },
    { name: "La Liga", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/LaLiga.svg" },
    { name: "Bundesliga", logo: "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg" },
    { name: "Serie A", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/Serie_A_ENILIVE_logo.svg/800px-Serie_A_ENILIVE_logo.svg.png" },
    { name: "Ligue 1", logo: "https://upload.wikimedia.org/wikipedia/en/4/42/Ligue1logo.svg" }
  ];

  const features = [
    { icon: Award, title: "Premium Quality", desc: "Official licensed merchandise with authentic detailing" },
    { icon: Shield, title: "100% Authentic", desc: "Guaranteed official products from top brands" },
    { icon: Users, title: "Trusted by 50K+", desc: "Happy customers worldwide" },
    { icon: TrendingUp, title: "Latest Designs", desc: "2025 season collections" },
    { icon: Trophy, title: "Match Worn Spec", desc: "Same specifications as player editions" },
    { icon: Star, title: "Exclusive Items", desc: "Limited edition releases available only here" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 pt-20 pb-10 px-4">

      {/* Hero Section */}
      <section className="min-h-screen relative pt-20 pb-20 md:pb-32 overflow-hidden mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/30 px-4 py-2 rounded-full mb-6">
                <Star className="w-4 h-4 text-red-500" />
                <span className="text-red-400 font-medium">OFFICIAL STORE</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                  Wolf 
                </span>
                <br />
                <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                  Athleticx
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Official licensed football jerseys from the world's top clubs and players.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={() => navigate('/products')} className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-red-500/25">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-6 h-6" />
                    Shop Collection
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                <button className="group border-2 border-gray-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-white hover:text-black">
                  <a href="https://www.instagram.com/wolf.athletix/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white">
                    <Play className="w-6 h-6" />
                    Watch Story
                  </a>
                </button>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="relative">
              <div className="relative bg-gradient-to-br text-white border-gray-800 rounded-3xl p-8 overflow-hidden h-[500px]">
                {newArrivals.map((jersey, index) => (
                  <div key={jersey.id} className={`absolute inset-0 transition-opacity duration-700 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex flex-col items-center justify-center h-full">
                      <img src={jersey.image} alt={jersey.name} className="w-full h-80 object-contain transition-transform duration-700" />
                      <div className="absolute top-6 left-6">
                        {/* <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">{jersey.badge}</span> */}
                      </div>
                      <div className="mt-6 text-center">
                        <h3 className="text-xl font-bold">{jersey.name}</h3>
                        <p className="text-gray-400">{jersey.player} Edition</p>
                        <div className="flex items-center gap-3 mt-2 justify-center">
                          <span className="text-2xl font-bold text-red-500">${jersey.price}</span>
                          <span className="text-lg text-gray-500 line-through">${jersey.originalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={goToPrevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black bg-white p-2 rounded-full transition-colors">
                  <ChevronDown className="w-6 h-6 rotate-90" />
                </button>
                <button onClick={goToNextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black bg-white p-2 rounded-full transition-colors">
                  <ChevronDown className="w-6 h-6 -rotate-90" />
                </button>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {newArrivals.map((_, index) => (
                    <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-red-600' : 'bg-gray-600 hover:bg-gray-500'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-br from-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/30 px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-red-500" />
              <span className="text-red-400 font-medium">TRENDING NOW</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Featured
              </span>
              <span className="text-red-500"> Jerseys</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The most popular jerseys from the current season
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJerseys.map((jersey) => (
              <div key={jersey.id} className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-red-500 hover:scale-105">
                <div className="relative overflow-hidden">
                  <img src={jersey.image} alt={jersey.name} className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    {/* <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">{jersey.badge}</span> */}
                  </div>
                  <button className="absolute top-4 right-4 p-2 bg-gray-900/80 rounded-full hover:bg-red-600 transition-colors">
                    <Heart className="w-5 h-5"  onClick={()=>addToWishlist(jersey)}/>
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{jersey.name}</h3>
                      <p className="text-gray-400">{jersey.player} Edition</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-red-500">${jersey.price}</span>
                      <span className="block text-sm text-gray-500 line-through">${jersey.originalPrice}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                      SAVE {calculateDiscount(jersey.price, jersey.originalPrice)}%
                    </span>
                    <button onClick={() => addToCart(jersey)} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={() => navigate('/products')} className="group bg-red-600  hover:from-red-600 hover:to-red-700 border border-red-500 hover:border-red-500 px-8 py-4 rounded-xl font-bold transition-all duration-500 hover:scale-105 text-white ">
              <div className="flex items-center gap-3">
                View All Jerseys
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Top
              </span>
              <span className="text-red-500"> Teams</span>
            </h2>
          </div>
          <div className="grid grid-row sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 ">
            {teams.map((team, index) => (
              <button key={index} className="group bg-white hover:bg-gray-700 border border-gray-700 rounded-xl p-4 transition-all duration-300 hover:scale-105 ">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-2 bg-white rounded-full p-2 flex items-center justify-center">
                    <img src={team.logo} alt={team.name} className="w-12 h-12 object-contain text-white" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-white transition-colors">{team.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-red-500 transition-all duration-300 hover:scale-105">
                <feature.icon className="w-12 h-12 text-red-500 mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2 text-center">{feature.title}</h3>
                <p className="text-gray-400 text-center">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leagues Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Shop By
              </span>
              <span className="text-red-500"> League</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
         
  {leagues.map((league, index) => (
    <button key={index} className="group bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:scale-105">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 mb-4 bg-white rounded-full p-3 flex items-center justify-center">
          <img src={league.logo} alt={league.name} className="w-16 h-16 object-contain" />
        </div>
        <span className="font-medium group-hover:text-red-400 transition-colors">{league.name}</span>
      </div>
    </button>
  ))}
</div>
        </div>
      </section>

     <section className="py-16 bg-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-black mb-4">
        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Shop By
        </span>
        <span className="text-red-500"> Players</span>
      </h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {players.map((player, index) => (
        <button
          key={index}
          className="group bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:scale-105"
          onClick={() => navigate(`/players/${player.id}`)} // optional navigation
        >
          <div className="flex flex-col items-center">
            {/* Circular Player Image */}
            <div className="w-20 h-20 mb-4 bg-white rounded-full p-1 flex items-center justify-center overflow-hidden">
              <img
                src={player.faceImage}
                alt={player.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="font-medium group-hover:text-red-400 transition-colors text-center">
              {player.name}
            </span>
          </div>
        </button>
      ))}
    </div>
  </div>
</section>

     
     
    
    </div>
  );
}