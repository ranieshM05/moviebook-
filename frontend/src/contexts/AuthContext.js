import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    try {
      const response = await axios.post("https://moviebook-5.onrender.com/api/auth/login", credentials); // Updated URL
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
