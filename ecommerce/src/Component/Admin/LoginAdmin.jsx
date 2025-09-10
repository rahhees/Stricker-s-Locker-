// src/pages/LoginAdmin.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * Permanent admin credentials (change these for your local use)
 */
const ADMIN_EMAIL = "rahees678@gmail.com";
const ADMIN_PASSWORD = "admin@123";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // If already logged in as admin, redirect to /admin
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      if (stored && stored.role === "admin") {
        navigate("/admin");
      }
    } catch (e) {
      // ignore parse errors
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim to avoid accidental spaces
    const em = email.trim();
    const pw = password;

    if (!em || !pw) {
      toast.error("Please enter email and password.");
      return;
    }

    if (em === ADMIN_EMAIL && pw === ADMIN_PASSWORD) {
      // Persist a simple user object (your AuthContext / ProtectedRoute should read this)
      const adminUser = {
        id: "admin",
        firstName: "Admin",
        lastName: "User",
        email: ADMIN_EMAIL,
        role: "admin",
      };

      localStorage.setItem("user", JSON.stringify(adminUser));
    
      toast.success("Logged in as admin.");
      navigate("/Dashboard");
    } else {
      toast.error("Invalid admin credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
      
          className="w-full p-2 border rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
        >
          Sign in as Admin
        </button>

      </form>
    </div>
  );
};

export default LoginAdmin;
