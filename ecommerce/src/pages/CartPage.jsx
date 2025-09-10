import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Lock } from "lucide-react";

// Assuming you have a CartContext.js file in this path
import { CartContext } from "../Context/CartContext";




function CartPage() {
  // Destructure state and functions from the CartContext
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

  // Calculate the order totals
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const estimatedTax = subtotal * 0.08; // Example tax rate
  const total = subtotal + estimatedTax;

  // Hook for navigation
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white-300 flex justify-center  mt-30">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step-by-Step Header */}
        <div className="flex justify-center mb-18">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col items-center">
              <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <span className="text-red-600 text-xs mt-1">Cart</span>
            </div>
            <div className="h-0.5 w-16 bg-gray-300 mt-3" />
            <div className="flex flex-col items-center text-gray-400">
              <div className="bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <span className="text-xs mt-1">Shipping</span>
            </div>
            <div className="h-0.5 w-16 bg-gray-300 mt-3" />
            <div className="flex flex-col items-center text-gray-400">
              <div className="bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <span className="text-xs mt-1">Payment</span>
            </div>
            <div className="h-0.5 w-16 bg-gray-300 mt-3" />
            <div className="flex flex-col items-center text-gray-400">
              <div className="bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <span className="text-xs mt-1">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Conditional rendering for empty cart */}
        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your Cart is Empty 🛒</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Section - Shopping Cart Items */}
            <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Shopping Cart
              </h2>
              <div className="space-y-4 h-96 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center md:justify-between border border-gray-200 rounded-lg py-4 px-4 mb-4"
                  >
                    {/* Item Details */}
                    <div className="flex items-start md:items-center gap-4 w-full md:w-auto">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-contain rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {item.name}
                        </h3>
                        {/* Optional: Render additional details */}
                        <p className="text-sm text-gray-500">
                          {item.size && `Size: ${item.size}`}
                          {item.color && ` | Color: ${item.color}`}
                        </p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="mx-4 text-lg">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 text-sm mt-2">
                          Remove
                        </button>
                      </div>
                    </div>
                    {/* Price */}
                    <div className="mt-4 md:mt-0 text-lg font-bold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button
                  onClick={() => navigate("/")}
                  className="text-red-600 text-sm font-semibold hover:underline"
                >
                  ← Continue Shopping
                </button>
              </div>
            </div>

            {/* Right Section - Order Summary */}
            <div className="bg-white shadow-md rounded-lg p-6 h-fit">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Subtotal ({cart.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">Estimated Tax</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-800 font-bold text-xl pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/Shipping")}
                className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md"
              >
                Proceed to Shipping
              </button>

              <div className="mt-4 text-sm text-gray-500 space-y-2">
                <p className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Free shipping on orders over $75
                </p>
                <p className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  30-day return policy
                </p>
                <p className="flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-gray-500" />
                  Secure checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;