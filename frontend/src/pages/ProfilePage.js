import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // For navigation

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Hook for navigation
  const [editing, setEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState(user ? user.name : '');
  const [userId] = useState(user ? user.id : '12345');
  const [details, setDetails] = useState(user ? user.details : '');

  const handleEdit = () => setEditing(true);

  const handleSave = async () => {
    const updatedProfile = { name, userId, details };

    // If there's a profile picture, include it in the request
    if (profilePic) {
      updatedProfile.profilePic = profilePic;
    }

    try {
      const response = await fetch('http://localhost:3001/api/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log('Profile updated:', updatedData);
        setEditing(false);
      } else {
        console.error('Failed to update profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file)); // Preview the uploaded image
    }
  };

  const handleRemoveProfilePic = () => setProfilePic(null);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      
      {user ? (
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Welcome, {name}</h2>
            <button onClick={logout} className="mt-2 bg-red-500 text-white p-2 rounded">
              Logout
            </button>
          </div>
          
          {/* Profile Picture Upload/Remove */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Profile Picture</label>
            <div className="flex items-center space-x-4">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                  No Image
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
                id="profilePicUpload"
              />
              <button
                onClick={() => document.getElementById('profilePicUpload').click()}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Upload
              </button>
              {profilePic && (
                <button
                  onClick={handleRemoveProfilePic}
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Editable Form */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Name</label>
            {editing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            ) : (
              <p>{name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">User ID</label>
            <p>{userId}</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Details</label>
            {editing ? (
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows="3"
              />
            ) : (
              <p>{details}</p>
            )}
          </div>

          {editing ? (
            <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">
              Save Changes
            </button>
          ) : (
            <button onClick={handleEdit} className="bg-blue-500 text-white p-2 rounded">
              Edit Profile
            </button>
          )}
        </div>
      ) : (
        <div>
          <h2>Please log in or sign up.</h2>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => navigate('/auth/login')}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/auth/signup')}
              className="bg-green-500 text-white p-2 rounded"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
