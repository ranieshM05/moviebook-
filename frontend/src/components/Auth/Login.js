// src/components/Auth/Login.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Save token
        navigate("/"); // Redirect to home
      } else {
        console.error(data.message); // Handle errors
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form className="max-w-md mx-auto mt-10" onSubmit={handleLogin}>
      <h2 className="text-2xl mb-4">Login</h2>
      <input
        type="email"
        className="block w-full p-2 border border-gray-300 rounded mb-4 focus:border-blue-500 focus:outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="block w-full p-2 border border-gray-300 rounded mb-4 focus:border-blue-500 focus:outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Login
      </button>
    </form>
  );
}

export default Login;
