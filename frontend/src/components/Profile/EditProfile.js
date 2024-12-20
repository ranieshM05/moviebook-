import React, { useState, useEffect } from "react";

function EditProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [profilePic, setProfilePic] = useState(user ? user.profilePic : "");
  const [newProfilePic, setNewProfilePic] = useState(null);

  const handleProfilePicChange = (e) => {
    setNewProfilePic(e.target.files[0]);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      name,
      email,
      profilePic: newProfilePic ? URL.createObjectURL(newProfilePic) : profilePic,
    };

    // Save updated user data in localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Optionally, send the updated user data to the backend
    const token = localStorage.getItem('token');
    await fetch('https://moviebook-5.onrender.com/api/auth/update-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    });

    window.location.href = "/profile"; // Redirect to the profile page after update
  };

  return (
    <form className="max-w-md mx-auto mt-10" onSubmit={handleEdit}>
      <h2 className="text-2xl mb-4">Edit Profile</h2>
      <input
        type="text"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
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
        type="file"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        onChange={handleProfilePicChange}
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Save Changes
      </button>
    </form>
  );
}

export default EditProfile;
