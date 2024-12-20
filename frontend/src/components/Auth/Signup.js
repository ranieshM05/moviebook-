import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Save credentials to localStorage
    localStorage.setItem('signupEmail', email);
    localStorage.setItem('signupPassword', password);

    alert('Signup successful! Please log in.');
    navigate('/login');
  };

  return (
    <form className="max-w-md mx-auto mt-10" onSubmit={handleSignup}>
      <h2 className="text-2xl mb-4">Sign Up</h2>

      <input
        type="text"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
        required
      />

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

      <input
        type="password"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
      />

      {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
