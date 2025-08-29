import React, { useReducer, useState, useEffect } from "react";

import { FaGoogle, FaFacebook } from "react-icons/fa";
import api from "../Api/AxiosInstance"
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


const registrationReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIRST_NAME":
      return { ...state, firstName: action.payload };
      case "SET_LAST_NAME":
        return { ...state, lastName: action.payload };
        case "SET_EMAIL":
      return { ...state, email: action.payload };
      case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
      case "RESET_FORM":
        return initialState;
        default:
          return state;
        }
      };
      const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
      
      function AuthPage () {
        const [activeTab, setActiveTab] = useState("signin"); // 'signin' or 'signup'

  // Registration states
  const [regState, regDispatch] = useReducer(registrationReducer, initialState);
  const [regError, setRegError] = useState("");
  const [submitData, setSubmitData] = useState(null);
  const [termsCheck, setTermsCheck] = useState(false);
console.log(regState)

  // Login states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const{loginuser,loginError}=useContext(AuthContext)

  // Registration submit


    const registerUser = async (data) => {

      
     

      try {
        const response = await api.post("/users", data);
        alert("Registration Successful ✅");
        regDispatch({ type: "RESET_FORM" });
        setTermsCheck(false);
        setSubmitData(null);

      } catch (err) {
      
        setRegError(err.response?.data?.message || "Network error ❌" );
      
      }
    };

    


  const handleRegistration = async (e) => {
    e.preventDefault();

    if (regState.password !== regState.confirmPassword) {
      setRegError("Passwords do not match ❌");
      return;
    }

    if (!termsCheck) {
      setRegError("You must accept the terms ❌");
      return;
    }

    try {
      const checkResponse = await api.get(
        `/users?email=${regState.email}`
      );

      console.log(checkResponse.data);
      
      if (checkResponse.data.length > 0) {
        setRegError("This email already exists! Please use another.");
        return;
      }else{
       await registerUser(regState)
      }

      setRegError("");
      setSubmitData(regState);

    } catch {
      setRegError("Something went wrong while checking the email ❌");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginuser(loginEmail,loginPassword)
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE DESIGN */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-pink-600 to-blue-600 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Elite Football Store</h1>
        <p className="text-lg text-center max-w-md mb-8">
          Premium jerseys, boots, and gear from the world’s top football clubs and players ⚽
        </p>
        {/* Example football badges */}
        <div className="grid grid-cols-3 gap-4 my-6">
          {["FB", "RM", "PSG", "MU", "L", "MC"].map((club) => (
            <div
              key={club}
              className="bg-white/30 rounded-full w-14 h-14 flex items-center justify-center font-bold"
            >
              {club}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          {/* Tabs */}
          <div className="flex mb-6 bg-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab("signin")}
              className={`flex-1 py-2 font-bold ${activeTab === "signin" ? "bg-white shadow" : "text-gray-500"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-2 font-bold ${activeTab === "signup" ? "bg-white shadow" : "text-gray-500"}`}
            >
              Sign Up
            </button>
          </div>

          {/* LOGIN FORM */}
          {activeTab === "signin" && (
            <>
              {loginError && <div className="text-red-500 text-sm mb-3">{loginError}</div>}
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900"
                >
                  Sign In
                </button>
              </form>
            </>
          )}

          {/* REGISTRATION FORM */}

          {activeTab === "signup" && (
            <>
              {regError && <div className="text-red-500 text-sm mb-3">{regError}</div>}
              <form onSubmit={handleRegistration} className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={regState.firstName}
                    onChange={(e) =>
                      regDispatch({ type: "SET_FIRST_NAME", payload: e.target.value })
                    }
                    className="w-1/2 border rounded-lg px-3 py-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={regState.lastName}
                    onChange={(e) =>
                      regDispatch({ type: "SET_LAST_NAME", payload: e.target.value })
                    }
                    className="w-1/2 border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={regState.email}
                  onChange={(e) =>
                    regDispatch({ type: "SET_EMAIL", payload: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
                <input
                  type="password"
                  placeholder="Create a password"
                  value={regState.password}
                  onChange={(e) =>
                    regDispatch({ type: "SET_PASSWORD", payload: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={regState.confirmPassword}
                  onChange={(e) =>
                    regDispatch({ type: "CONFIRM_PASSWORD", payload: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={termsCheck}
                    onChange={() => setTermsCheck((prev) => !prev)}
                    className="w-4 h-4"
                  />
                  <label className="text-sm">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms & Conditions
                    </a>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900"
                >
                  Create Account
                </button>
              </form>
            </>
          )}

          {/* Social Buttons */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">Or continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => alert("Google clicked")}
              className="flex-1 flex items-center justify-center space-x-2 border rounded-lg py-2 hover:bg-gray-50 transition"
            >
              <FaGoogle />
              <span>Google</span>
            </button>
            <button
              onClick={() => alert("Facebook clicked")}
              className="flex-1 flex items-center justify-center space-x-2 border rounded-lg py-2 hover:bg-gray-50 transition"
            >
              <FaFacebook />
              <span>Facebook</span>

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
