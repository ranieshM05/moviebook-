import React, { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Signup successful", data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <form className="max-w-md mx-auto mt-10" onSubmit={handleSignup}>
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <input
        type="email"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
