import React, { useReducer, useState, useContext } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import api from "../Api/AxiosInstance";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import loginImage from '../assets/Images/login_im.jpg'
import { toast } from "react-toastify";
import Product from "./Product";

// REGISTRATION

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
  role:"user",
  cart:[],
  wishlist:[],
  order:[
    {}
  ],
  shippingaddress:{},

};

function AuthPage() {

  const [activeTab, setActiveTab] = useState("signup"); 

  // Manage The Registration States

  const [regState, regDispatch] = useReducer(registrationReducer, initialState);
  const [regError, setRegError] = useState("")

// Manage The Login States

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  const { loginuser, loginError } = useContext(AuthContext);

  const navigate = useNavigate();

  // Register User

  const registerUser = async (data) => {

    try {
      await api.post("/users", data);
      toast.success("Registration Successful ");
      regDispatch({ type: "RESET_FORM" });
      toast.error("Please Login To Continue ");
      setActiveTab('signin')
    } catch (err) {
      setRegError(err.response?.data?.message || "Network error ");
    }
    
  };

  // Handle Registration

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (regState.password !== regState.confirmPassword) {
      setRegError("Passwords do not match ");
    
      return;
    }


    try {
      const checkResponse = await api.get(`/users?email=${regState.email}`);

      if (checkResponse.data.length > 0) {
        setRegError("This email already exists! Please use another.");
        return;

      } else {
        await registerUser(regState);
      
      }
      setRegError("");

    } catch {
      setRegError("Something went wrong while checking the email");
    }
  };


  // Handle Login

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginuser(loginEmail, loginPassword);
    if (result.success) {
      navigate("/");
      toast.success("Registered Successfully")
    }
  };


  return (
    <div className="flex min-h-screen  top-0  ">


  <div className="w-1/2 h-screen">

  <img 
    src={loginImage} alt="Football"  className="w-full h-full object-cover"/>

</div>
   
      <div className="flex flex-col justify-center items-center w-1/2 ml-1/2 p-10 ml-30">
         <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="flex mb-6 bg-gray-100 rounded-lg overflow-hidden">

            <button onClick={() => setActiveTab("signin")}  className={`flex-1 py-2 font-bold ${ activeTab === "signin" ? "bg-white shadow" : "text-gray-500"}`}>
             
              Sign In

            </button>

            <button onClick={() => setActiveTab("signup")} className={`flex-1 py-2 font-bold ${ activeTab === "signup" ? "bg-white shadow" : "text-gray-500"}`}>
             
              Sign Up

            </button>

          </div>

          {/* LOGIN FORM  */}
          
          {activeTab === "signin" && (

            <>
              {loginError && <div className="text-red-500 text-sm mb-3">{loginError}</div>}

              <form onSubmit={handleLogin} className="space-y-4">

                <input type="email" placeholder="Enter your email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full border rounded-lg px-3 py-2" required/>
               
                <input  type="password"  placeholder="Enter your password"  value={loginPassword}  onChange={(e) => setLoginPassword(e.target.value)}  className="w-full border rounded-lg px-3 py-2"  required/>

                <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-bold hover:bg-gray-900">
                 
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

                     <input  type="text"  placeholder="First Name"  value={regState.firstName}  onChange={(e) =>    regDispatch({ type: "SET_FIRST_NAME", payload: e.target.value })} className="w-1/2 border rounded-lg px-3 py-2" required/>
                     <input   type="text"   placeholder="Last Name"   value={regState.lastName}   onChange={(e) =>     regDispatch({ type: "SET_LAST_NAME", payload: e.target.value }) } className="w-1/2 border rounded-lg px-3 py-2" required />
               
                </div>
                
                <input  type="email"  placeholder="Enter your email"  value={regState.email}  onChange={(e) =>    regDispatch({ type: "SET_EMAIL", payload: e.target.value })  }  className="w-full border rounded-lg px-3 py-2"  required/>
                <input  type="password"  placeholder="Create a password"  value={regState.password}  onChange={(e) =>    regDispatch({ type: "SET_PASSWORD", payload: e.target.value }) }className="w-full border rounded-lg px-3 py-2" required/>
                <input  type="password"  placeholder="Confirm your password"  value={regState.confirmPassword}  onChange={(e) =>    regDispatch({ type: "CONFIRM_PASSWORD", payload: e.target.value })  }  className="w-full border rounded-lg px-3 py-2"  required/>
             
                <button   type="submit"   className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900"    >
                 
                  Create Account
                  
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
