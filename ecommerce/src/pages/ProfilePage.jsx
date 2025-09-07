import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");

  // Initialize profile data from logged-in user
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    favoriteTeam: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: user.dob || "",
        favoriteTeam: user.favoriteTeam || "",
      }));
    }
  }, [user]);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home Address",
      line1: "123 Main Street",
      city: "Springfield",
      state: "IL",
      zip: "62701",
      isDefault: true,
    },
  ]);

  const [orders] = useState([
    {
      id: 101,
      date: "2024-05-15",
      status: "Shipped",
      items: [
        { name: "Football Jersey", price: 89.99 },
        { name: "Team Scarf", price: 25.0 },
      ],
    },
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: false,
    newProducts: true,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (id, field, value) => {
    setAddresses((prev) =>
      prev.map((addr) => (addr.id === id ? { ...addr, [field]: value } : addr))
    );
  };

  const addAddress = () => {
    setAddresses((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: "New Address",
        line1: "",
        city: "",
        state: "",
        zip: "",
        isDefault: false,
      },
    ]);
  };

  const deleteAddress = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const setDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">
              Personal Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <button className="w-full sm:w-auto mt-4 px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
              Save Changes
            </button>
          </div>
        );

      case "addresses":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Address Management</h2>
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-gray-50 p-6 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">{address.name}</h3>
                  {address.isDefault && (
                    <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={addAddress}
              className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Add New Address
            </button>
          </div>
        );

      case "orders":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-50 p-6 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">
              Notification Preferences
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  Order Updates
                </span>
                <input
                  type="checkbox"
                  checked={notificationSettings.orderUpdates}
                  onChange={() =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      orderUpdates: !prev.orderUpdates,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const navItems = [
    { id: "profile", label: "Personal Information" },
    { id: "addresses", label: "Addresses" },
    { id: "orders", label: "Order History" },
    { id: "notifications", label: "Notifications" },
    { id: "security", label: "Security" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 sm:p-12">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              My Profile
            </h1>
            <p className="mt-2 text-sm sm:text-base">
              Manage your account and preferences.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* ✅ Show first name of logged-in user */}
            <span className="text-lg font-semibold">
              {profileData.name ? profileData.name.split(" ")[0] : "Guest"}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto mt-[-4rem] p-4 sm:p-6 md:p-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex">
          {/* Sidebar */}
          <nav className="md:w-1/4 p-4 md:p-6 bg-gray-50 border-r border-gray-100">
            <h2 className="text-lg font-bold mb-4">Settings</h2>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg ${
                      activeTab === item.id
                        ? "bg-indigo-100 text-indigo-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main Content */}
          <main className="md:w-3/4 p-6 md:p-8">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default App;
