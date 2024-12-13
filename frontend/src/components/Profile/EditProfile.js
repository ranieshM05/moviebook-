import React, { useState } from "react";

function EditProfile() {
  const [email, setEmail] = useState("");

  const handleEdit = (e) => {
    e.preventDefault();
    // Implement edit profile logic here
  };

  return (
    <form className="max-w-md mx-auto mt-10" onSubmit={handleEdit}>
      <h2 className="text-2xl mb-4">Edit Profile</h2>
      <input
        type="email"
        className="block w-full p-2 border border-gray-300 rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="New Email"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Save Changes
      </button>
    </form>
  );
}

export default EditProfile;
