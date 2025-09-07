import React, { useContext, useReducer } from "react";
import api from "../Api/AxiosInstance";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import { Check, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";




const initialState = {
  firstname: "",
  lastname: "",
  emailaddress: "",
  mobileno: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  postalcode: "",
  country: "",
  shippingMethod: "standard",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

function ShippingPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const navigate =useNavigate()

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newShipping = { ...state };

 console.log("Attempting to save shipping address:", { userId: user?.id, data: newShipping });    try {
      if (!user) {
        alert("⚠️ User not logged in");
        return;
      }

      await api.patch(`/users/${user.id}`, {
      
        shippingaddress: newShipping,
      });

      alert("✅ Shipping address saved successfully!");
      dispatch({ type: "RESET" });
    } catch (err) {
      console.error("❌ Error saving shipping address:", err);
      alert("Failed to save shipping address");
    }
  };

  // Calculate totals based on cart items
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-12">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step-by-Step Header */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {/* Step 1: Cart (Completed) */}
            <div className="flex flex-col items-center">
              <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <span className="text-red-600 text-xs mt-1">Cart</span>
            </div>
            <div className="h-0.5 w-16 bg-red-600 mt-3" />

            {/* Step 2: Shipping (Active) */}
            <div className="flex flex-col items-center">
              <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <span className="text-red-600 text-xs mt-1">Shipping</span>
            </div>

            {/* Step 3: Payment (Inactive) */}
            <div className="h-0.5 w-16 bg-gray-300 mt-3" />
            <div className="flex flex-col items-center text-gray-400">
              <div className="bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <span className="text-xs mt-1">Payment</span>
            </div>
            {/* Step 4: Confirmation (Inactive) */}
            <div className="h-0.5 w-16 bg-gray-300 mt-3" />
            <div className="flex flex-col items-center text-gray-400">
              <div className="bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                4
              </div>
              <span className="text-xs mt-1">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Shipping Form */}
          <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstname"
                  value={state.firstname}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="lastname"
                  value={state.lastname}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Email & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="emailaddress"
                  value={state.emailaddress}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="tel"
                  name="mobileno"
                  value={state.mobileno}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Address */}
              <input
                type="text"
                name="address"
                value={state.address}
                onChange={handleChange}
                placeholder="Street Address"
                className="w-full p-2 border rounded-md"
                required
              />
              <input
                type="text"
                name="apartment"
                value={state.apartment}
                onChange={handleChange}
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full p-2 border rounded-md"
              />

              {/* City, State, Postal */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  value={state.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="state"
                  value={state.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  name="postalcode"
                  value={state.postalcode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Country */}
              <input
                type="text"
                name="country"
                value={state.country}
                onChange={handleChange}
                placeholder="Country"
                className="w-full p-2 border rounded-md"
                required
              />

              {/* Shipping Method */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Shipping Method
                </label>
                <select
                  name="shippingMethod"
                  value={state.shippingMethod}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="standard">Standard - Free</option>
                  <option value="express">Express - $9.99</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700"
              >
                Save Shipping Information
              </button>
            </form>
          </div>

          {/* Right column - Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6 h-fit">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>

            {/* Scrollable cart items */}
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4"
                  >
                    {/* Left side: Image + text */}
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.image ||
                          item.productImage ||
                          "https://via.placeholder.com/60"
                        }
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.size ? `Size: ${item.size} | ` : ""}
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    {/* Right side: Price */}
                    <p className="font-semibold text-right whitespace-nowrap">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Your cart is empty</p>
              )}
            </div>

            {/* Totals */}
            <div className="border-t mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            {/* Added for consistency with previous designs */}
           <button
  onClick={() => navigate('/Payment')}
  className="w-full mt-6 bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700"
>
  Proceed to Payment
</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingPage;