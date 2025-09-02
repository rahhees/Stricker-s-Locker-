import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { ShoppingCart, Star, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


function CartPage() {
  
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <ShoppingCart className="mr-2" /> Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty 🛒</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map(({ id, name, price, image, quantity, rating }) => (
              <div
                key={id}
                className="flex items-center justify-between p-4 bg-white shadow rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={image}
                    alt={name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{name}</h2>
                    <p className="text-gray-600">${price}</p>
                {rating !== undefined && rating !== null && (
           <div className="flex text-yellow-500">
             {[...Array(Math.max(0, parseInt(rating)))].map((_, i) => (
             <Star key={i} size={14} fill="gold" />
    )
  )
  }
  </div>
)}
                  </div>
                </div>

            {/* Quantity of Items */}

                <div className="flex items-center gap-2">  
                  <button
                    onClick={() => updateQuantity(id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => updateQuantity(id, 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal + Remove */}
                <div className="flex items-center gap-3">
                  <p className="font-semibold">
                    ${(price * quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Total */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Clear Cart
              </button>
              <button onClick={()=>navigate('/Shipping')}   className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
