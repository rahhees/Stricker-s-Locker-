import React, { useEffect, useReducer, useState } from "react";
import Axios from "axios";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const initialState = {
  firstName: "",
  LastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Registration = (state, action) => {
  switch (action.type) {
    case "SET_FIRST_NAME":
      return { ...state, firstName: action.payload };
    case "SET_LAST_NAME":
      return { ...state, LastName: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "LOAD_FROM_STORAGE":
      return { ...state, ...action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const RegistrationForm = () => {
  const [state, dispatch] = useReducer(Registration, initialState);
  const [error, setError] = useState("");
  const [submitData, setSubmitData] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  
  const [termsCheck,setTermsCheck]=useState(false)

  // Load data from localStorage
  
  useEffect(() => {
    const storedUsers = localStorage.getItem("registeredUsers");
    if (storedUsers) {
      setRegisteredUsers(JSON.parse(storedUsers));
    }
    const savedFormData = localStorage.getItem("registrationFormData");
    if (savedFormData) {
      dispatch({ type: "LOAD_FROM_STORAGE", payload: JSON.parse(savedFormData) });
    }
  }, []);

  // Auto-save form data
  useEffect(() => {
    console.log("csllrd")
    const formData = {

      firstName: state.firstName,
      LastName: state.LastName,
      email: state.email,
    };
    if (state.firstName || state.LastName || state.email) {
      localStorage.setItem("registrationFormData", JSON.stringify(formData));
    }
  }, [state.firstName, state.LastName, state.email]);

  // Handle API submit
  useEffect(() => {
    if (!submitData) return;

    const registerUser = async () => {
      try {
        const response = await Axios.post("http://localhost:5000/users", submitData);
        console.log("Registration Successful:", response.data);
        alert("Successfully Added ✅");
        dispatch({ type: "RESET_FORM" });
        setSubmitData(null);
      } catch (err) {
        setError(err.response?.data?.message || "Network error ❌");
        setSubmitData(null);
      }
    };

    registerUser();
  }, [submitData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.password !== state.confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    
    if (!termsCheck) {
       
      setError("Terms do not match ❌");
      return;
    }

    // const passwordRegex =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    // if (!passwordRegex.test(state.password)) {
    //   setError(
    //     "Password must be 8-20 characters, include uppercase, lowercase, number, and special character."
    //   );
    //   return;
    // }

    try {
      const checkResponse = await Axios.get(
        `http://localhost:5000/users?email=${state.email}`
      );
      if (checkResponse.data.length > 0) {
        setError("This email already exists! Please use another.");
        return;
      }

      setError("");
      setSubmitData(state);
    } catch {
      setError("Something went wrong while checking the email ❌");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-pink-600 to-blue-600 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Elite Football Store</h1>
        <p className="text-lg text-center max-w-md mb-8">
          Premium jerseys, boots, and gear from the world’s top football clubs
          and players ⚽
        </p>

        <div className="grid grid-cols-3 gap-4 my-6">
          <div className="bg-blue-600 rounded-full w-14 h-14 flex items-center justify-center font-bold">
            FB
          </div>
          <div className="bg-white text-black rounded-full w-14 h-14 flex items-center justify-center font-bold">
            RM
          </div>
          <div className="bg-blue-400 rounded-full w-14 h-14 flex items-center justify-center font-bold">
            PSG
          </div>
          <div className="bg-red-600 rounded-full w-14 h-14 flex items-center justify-center font-bold">
            MU
          </div>
          <div className="bg-red-400 rounded-full w-14 h-14 flex items-center justify-center font-bold">
            L
          </div>
          <div className="bg-cyan-400 rounded-full w-14 h-14 flex items-center justify-center font-bold">
            MC
          </div>
        </div>

        <div className="space-y-4 w-full max-w-sm">
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <h3 className="font-semibold">Official Merchandise</h3>
            <p className="text-sm">Authentic jerseys & gear from top clubs</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <h3 className="font-semibold">Player Collections</h3>
            <p className="text-sm">Exclusive items from football stars</p>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <h3 className="font-semibold">Premium Quality</h3>
            <p className="text-sm">Professional boots & equipment</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-2">Welcome</h2>
          <p className="text-gray-600 text-center mb-6">
            Join the elite football community
          </p>

          {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="First Name"
                value={state.firstName}
                onChange={(e) =>
                  dispatch({ type: "SET_FIRST_NAME", payload: e.target.value })
                }
                className="w-1/2 border rounded-lg px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={state.LastName}
                onChange={(e) =>
                  dispatch({ type: "SET_LAST_NAME", payload: e.target.value })
                }
                className="w-1/2 border rounded-lg px-3 py-2"
                required
              />
            </div>

            <input
              type="email"
              placeholder="Enter your email"
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", payload: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
              required
            />

            <input
              type="password"
              placeholder="Create a password"
              value={state.password}
              onChange={(e) =>
                dispatch({ type: "SET_PASSWORD", payload: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2"
              required
            />

            <input
              type="password"
              placeholder="Confirm your password"
              value={state.confirmPassword}
              onChange={(e) =>
                dispatch({
                  type: "CONFIRM_PASSWORD",
                  payload: e.target.value,
                })
              }
              className="w-full border rounded-lg px-3 py-2"
              required
            />

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="terms" className="w-4 h-4" onChange={()=>setTermsCheck((prev)=>!prev)} />
              <label htmlFor="terms" className="text-sm">
                I agree to the{" "}
                <a href="/*" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Create Account
               
            </button>
           
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">Or continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => alert("Google login clicked!")}
              className="flex-1 flex items-center justify-center space-x-2 border rounded-lg py-2 hover:bg-gray-50 transition"
            >
              <FaGoogle />
              <span>Google</span>
            </button>
            <button
              onClick={() => alert("Facebook login clicked!")}
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

export default RegistrationForm;
