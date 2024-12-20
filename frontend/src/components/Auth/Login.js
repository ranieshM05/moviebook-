import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem('signupEmail');
    const storedPassword = localStorage.getItem('signupPassword');

    if (email === storedEmail && password === storedPassword) {
      alert('Login successful!');
      localStorage.setItem('token', 'userLoggedIn'); // Simulate a token

      // Redirect to the originally intended page or home page
      const redirectTo = location.state?.redirectTo || '/';
      navigate(redirectTo);
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token to log out the user
    alert('You have been logged out.');
    navigate('/login'); // Redirect to login page
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Login</h2>

      {/* Conditionally render the logout button if the user is already logged in */}
      {localStorage.getItem('token') ? (
        <div>
          <p>You are already logged in.</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white p-2 rounded mt-4"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
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

          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Login
          </button>
        </>
      )}
    </form>
  );
}

export default Login;
