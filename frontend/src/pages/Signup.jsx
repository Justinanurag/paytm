import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signup = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

const handleSignup = async () => {
  try {
    const res = await axios.post("http://localhost:3000/api/v1/user/register", {
      firstName,
      lastName,
      username: userName,
      password,
    });

    console.log("Signup response:", res.data);   // 👈 VERY IMPORTANT

    if (res.data.success) {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        console.log("Token saved:", res.data.token);
      } else {
        console.warn("No token returned from backend!");
      }
      
      localStorage.setItem("username", userName);
      localStorage.setItem("firstName", firstName);

      navigate("/signin");
    } else {
      alert("Signup failed!");
    }
  } catch (error) {
    console.log("Signup error:", error);
    alert(error.response?.data?.error || "Something went wrong!");
  }
};


  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex justify-center items-center px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-sm px-6 py-8 border border-gray-200">
        
        {/* Title */}
        <Heading label="Create Account" />
        <SubHeading label="Fill in your details to sign up" />

        {/* Inputs */}
        <div className="mt-6 space-y-4">
          <InputBox
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="John"
            label="First Name"
          />

          <InputBox
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Doe"
            label="Last Name"
          />

          <InputBox
            onChange={(e) => setUserName(e.target.value)}
            placeholder="example@gmail.com"
            label="Email"
          />

          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            label="Password"
          />
        </div>

        {/* Button */}
        <div className="pt-6">
          <Button onClick={handleSignup} label="Sign up" className="w-full" />
        </div>

        {/* Bottom Link */}
        <div className="mt-4">
          <BottomWarning
            label="Already have an account?"
            buttonText="Sign in"
            to="/signin"
          />
        </div>

      </div>
    </div>
  );
};
