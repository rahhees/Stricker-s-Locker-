import React, { Children, createContext, useState } from 'react'
import axios from 'axios'
export const AuthContext =createContext()

export const Authprovider=({children})=>{
    const [user,setUser]=useState({})
      const [loginError, setLoginError] = useState("");
    


    //   for login 

const loginuser=async(loginEmail,loginPassword)=>{
     if (!loginEmail || !loginPassword) {
      setLoginError("Please fill in both fields");
      return;
    }
const response = await axios.get(`http://localhost:5001/users?email=${loginEmail.trim()}`);
if (response.data.length > 0) {
  const user = response.data[0];
  if (user.password === loginPassword) {
    alert("Login Successful ✅");
    setLoginError("");
  } else {
    setLoginError("Invalid credentials ❌");
  }
} else {
  setLoginError("Invalid credentials ❌");
}

}

async function registeredUser(){
         if (regState.password !== regState.confirmPassword) {
      setRegError("Passwords do not match ❌");
      return;
    }

    if (!termsCheck) {
      setRegError("You must accept the terms ❌");
      return;
    }

   

    try {
      const checkResponse = await Axios.get(
        `http://localhost:5000/users?email=${regState.email}`
      );
      if (checkResponse.data.length > 0) {
        setRegError("This email already exists! Please use another.");
        return;
      }

      setRegError("");
      setSubmitData(regState);
    } catch {
      setRegError("Something went wrong while checking the email ❌");
    }

}
    return (
    <AuthContext.Provider value={{loginuser,loginError}}>
        {children}
    </AuthContext.Provider>
  )
}
  