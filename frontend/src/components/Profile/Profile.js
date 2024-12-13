import React from "react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")); // Get user from local storage

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">User Profile</h2>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default Profile;
