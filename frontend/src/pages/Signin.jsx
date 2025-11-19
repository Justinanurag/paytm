import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        {
          username: userName,
          password,
        }
      );

      if (res.data.token) {
        navigate("/Dashboard");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex justify-center items-center px-4">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-sm px-6 py-8 border border-gray-200">
        
        {/* Title */}
        <Heading label="Sign In" />
        <SubHeading label="Enter your credentials to access your account" />

        {/* Input Fields */}
        <div className="mt-6 space-y-4">
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
          <Button onClick={handleLogin} label="Sign in" className="w-full" />
        </div>

        {/* Bottom Text */}
        <div className="mt-4">
          <BottomWarning
            label="Don't have an account?"
            buttonText="Sign up"
            to="/signup"
          />
        </div>

      </div>
    </div>
  );
};
