
import React from 'react';
import ProductCard from './CartDesign'; // your existing product card

function Trending({ products, onAddToCart, onAddToWishlist, isInWishlist }) {
  // Filter top sale or trending items
  const trendingProducts = products.filter(p => p.featured === "true");

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h2 className="text-2xl font-bold mb-6">Top Sale Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {trendingProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
            isInWishlist={isInWishlist}
            viewMode="grid"
          />
        ))}
      </div>
    </div>
  );
}

export default Trending;
