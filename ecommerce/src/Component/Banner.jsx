import React, { useState, useEffect, useContext } from "react";
import { ChevronDown, Star, TrendingUp, Award, Users, ArrowRight, Play, ShoppingBag, Shield, Trophy, Facebook, Twitter, Instagram, Youtube, Menu, X, Search, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

export default function WolfAthletixHomepage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const jerseys = [
    {
      id: 1,
      name: "Real Madrid 2025",
      player: "Kylian Mbappé",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://fanatics.frgimages.com/real-madrid/mens-adidas-kylian-mbapp%C3%A9-blue-real-madrid-2025/26-third-replica-player-jersey_ss5_p-203344219+pv-1+u-yhckhdgugsxidlubpjgb+v-viciifrbx2lq217zaabp.jpg?_hv=2&w=900",
      badge: "BESTSELLER",
      team: "Real Madrid",
      league: "La Liga"
    },
    {
      id: 2,
      name: "Barcelona 2025",
      player: "Lamine Yamal",
      price: 84.99,
      originalPrice: 109.99,
      image: "https://fanatics.frgimages.com/barcelona/mens-nike-lamine-yamal-blue-barcelona-2025/26-replica-player-jersey_ss5_p-203284529+u-egcn4pkk9yugwdxafypr+v-qzpq44aof1eqxv3qwuph.jpg?_hv=2&w=600",
      badge: "NEW ARRIVAL",
      team: "Barcelona",
      league: "La Liga"
    },
    {
      id: 3,
      name: "Bayern Munich 2025",
      player: "Jamal Musiala",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://fanatics.frgimages.com/bayern-munich/mens-adidas-jamal-musiala-red-bayern-munich-home-2025/26-replica-player-jersey_ss5_p-203285437+u-fr4adypqbsbugwazyk7a+v-rkrk1a5p8ew6vifc6fmh.jpg?_hv=2&w=600",
      badge: "LIMITED",
      team: "Bayern Munich",
      league: "Bundesliga"
    },
    {
      id: 4,
      name: "Liverpool 2025",
      player: "Mohamed Salah",
      price: 87.99,
      originalPrice: 114.99,
      image: "https://fanatics.frgimages.com/liverpool/mens-adidas-mohamed-salah-red-liverpool-2025/26-home-replica-jersey_ss5_p-203287645+pv-1+u-wp0urskvqyjxaonbpzuo+v-9k59v8orvs04ywnbipcu.jpg?_hv=2&w=900",
      badge: "SALE",
      team: "Liverpool",
      league: "Premier League"
    },
    {
      id: 5,
      name: "Chelsea 2025",
      player: "Enzo Fernandes",
      price: 92.99,
      originalPrice: 119.99,
      image: "https://fanatics.frgimages.com/chelsea/mens-nike-enzo-fern%C3%A1ndez-blue-chelsea-2024/25-home-authentic-player-jersey_ss5_p-201693568+pv-1+u-ntgp3kh6vklk2z2vsbru+v-0oagdkbgwsj4lkpjpd1l.jpg?_hv=2&w=900",
      badge: "FAN FAVORITE",
      team: "Chelsea",
      league: "Premier League"
    },
    {
      id: 6,
      name: "Manchester City",
      player: "Haaland",
      price: 89.99,
      originalPrice: 115.99,
      image: "https://fanatics.frgimages.com/manchester-city/youth-puma-erling-haaland-light-blue-manchester-city-2024/25-home-replica-player-jersey_ss5_p-201685396+pv-1+u-dv3va5qrri9m3msckp5k+v-yh2urq1td9v13vdngo40.jpg?_hv=2&w=900",
      badge: "TRENDING",
      team: "Manchester City",
      league: "Premier League"
    }
  ];

  const teams = [
    { name: "Real Madrid", logo: "https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png", league: "La Liga" },
    { name: "Barcelona", logo: "https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png", league: "La Liga" },
    { name: "Bayern Munich", logo: "https://logos-world.net/wp-content/uploads/2020/06/Bayern-Munich-Logo.png", league: "Bundesliga" },
    { name: "Liverpool", logo: "https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png", league: "Premier League" },
    { name: "Chelsea", logo: "https://logos-world.net/wp-content/uploads/2020/06/Chelsea-Logo.png", league: "Premier League" },
    { name: "Manchester City", logo: "https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.png", league: "Premier League" },
    { name: "PSG", logo: "https://logos-world.net/wp-content/uploads/2020/06/Paris-Saint-Germain-Logo.png", league: "Ligue 1" },
    { name: "Juventus", logo: "https://logos-world.net/wp-content/uploads/2020/06/Juventus-Logo.png", league: "Serie A" }
  ];

  const leagues = [
    { name: "Premier League", logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg" },
    { name: "La Liga", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/LaLiga.svg" },
    { name: "Bundesliga", logo: "https://upload.wikimedia.org/wikipedia/en/d/df/Bundesliga_logo_%282017%29.svg" },
    { name: "Serie A", logo: "https://upload.wikimedia.org/wikipedia/en/e/e1/Serie_A_logo_%282019%29.svg" },
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % jerseys.length);
    }, 4000);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [jerseys.length]);

  const calculateDiscount = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % jerseys.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + jerseys.length) % jerseys.length);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Hero Section with Sliding Images */}
      <section className="relative pt-20 pb-20 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-0"></div>
        <div className="absolute top-0 right-0 w-1/3 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/30 px-4 py-2 rounded-full mb-6">
                <Star className="w-4 h-4 text-red-500" />
                <span className="text-red-400 font-medium">OFFICIAL STORE</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                  Football
                </span>
                <br />
                <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                  Jerseys & Gear
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Official licensed football jerseys from the world's top clubs and players. Wear the same kits as your favorite stars.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={() => navigate('/products')} className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-red-500/25">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-6 h-6" />
                    Shop Collection
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
                
                <button className="group border-2 border-gray-600 hover:border-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-white hover:text-black">
                  <a href="https://www.instagram.com/wolf.athletix/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                    <Play className="w-6 h-6" />
                    Watch Story
                  </a>
                </button>
              </div>
            </div>
            
            {/* Image Carousel */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 to-blue-600/20 rounded-3xl blur-xl opacity-70"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 overflow-hidden h-[500px]">
                {/* Slides */}
                {jerseys.map((jersey, index) => (
                  <div
                    key={jersey.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <img 
                        src={jersey.image} 
                        alt={jersey.name} 
                        className="w-full h-80 object-contain transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {jersey.badge}
                        </span>
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
                
                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevSlide}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900 p-2 rounded-full transition-colors"
                >
                  <ChevronDown className="w-6 h-6 rotate-90" />
                </button>
                <button
                  onClick={goToNextSlide}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900 p-2 rounded-full transition-colors"
                >
                  <ChevronDown className="w-6 h-6 -rotate-90" />
                </button>
                
                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                  {jerseys.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentSlide ? 'bg-red-600' : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Teams */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Top
              </span>
              <span className="text-red-500"> Teams</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse jerseys from the world's most popular football clubs
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {teams.map((team, index) => (
              <button key={index} className="group bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-4 transition-all duration-300 hover:scale-105">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 mb-2 bg-white rounded-full p-2 flex items-center justify-center">
                    <img src={team.logo} alt={team.name} className="w-12 h-12 object-contain" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-red-400 transition-colors">{team.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-black">
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

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
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
            {jerseys.slice(0, 6).map((jersey) => (
              <div key={jersey.id} className="group bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-red-500 hover:scale-105">
                <div className="relative overflow-hidden">
                  <img 
                    src={jersey.image} 
                    alt={jersey.name} 
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {jersey.badge}
                    </span>
                  </div>
                  <button className="absolute top-4 right-4 p-2 bg-gray-900/80 rounded-full hover:bg-red-600 transition-colors">
                    <Heart className="w-5 h-5" />
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
                    <button 
                      onClick={() => addToCart(jersey)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/products')}
              className="group bg-gradient-to-r from-gray-800 to-gray-900 hover:from-red-600 hover:to-red-700 border border-gray-700 hover:border-red-500 px-8 py-4 rounded-xl font-bold transition-all duration-500 hover:scale-105"
            >
              <div className="flex items-center gap-3">
                View All Jerseys
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
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
            <p className="text-gray-400 max-w-2xl mx-auto">
              Find jerseys from your favorite football leagues
            </p>
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

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-gray-800 to-black border border-gray-700 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-black mb-4">
              Stay Updated with <span className="text-red-500">Wolf Athletix</span>
            </h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to get updates on new arrivals, exclusive offers, and promotions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              />
              <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="font-black text-lg">WOLF ATHLETIX</span>
              </div>
              <p className="text-gray-400 mb-4">
                Official licensed football jerseys and merchandise from the world's top clubs and players.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/wolf.athletix/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-red-500 transition-colors">Jerseys</button></li>
                <li><button className="text-gray-400 hover:text-red-500 transition-colors">Training Wear</button></li>
                <li><button className="text-gray-400 hover:text-red-500 transition-colors">Accessories</button></li>
                <li><button className="text-gray-400 hover:text-red-500 transition-colors">New Arrivals</button></li>
                <li><button className="text-gray-400 hover:text-red-500 transition-colors">Sale</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-red-500 transition-colors">Contact Us</button></li>
                <li><button className="text-gray-400 hover:text-red-500 transition-colors">FAQs</button></li>
                <li><button className="text-gray-400 hover:text-red-500 transition-colors">Shipping & Returns</button></li>
                <li><button className="text-gray-400 hover:text-red-500 transition-colors">Size Guide</button></li>
                <li><button className="text-gray-400 hover:text-red-500 transition-colors">Track Order</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Info</h3>
              <address className="text-gray-400 not-italic">
                <p className="mb-2">123 Football Street</p>
                <p className="mb-2">Sports City, SC 12345</p>
                <p className="mb-2">Email: info@wolfathletix.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Wolf Athletix. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}