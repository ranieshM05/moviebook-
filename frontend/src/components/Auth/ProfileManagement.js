import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfileManagementPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      // Fetch profile data from localStorage
      const storedName = localStorage.getItem("profileName") || "John Doe";
      const storedEmail = localStorage.getItem("profileEmail") || "example@example.com";
      const storedDetails = localStorage.getItem("profileDetails") || "Add your details here.";

      setName(storedName);
      setEmail(storedEmail);
      setDetails(storedDetails);
      setLoading(false);
    }
  }, [navigate]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Save updated profile data to localStorage
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileEmail", email);
    localStorage.setItem("profileDetails", details);

    alert("Profile updated successfully");
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear all data from localStorage
    alert("Logged out successfully!");
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl mb-4">Edit Profile</h2>
      </div>

      <form onSubmit={handleProfileUpdate}>
        <div className="mb-4">
          <label className="block text-sm">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
            disabled={!isEditing}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            disabled={!isEditing}
          />
        </div>

        {isEditing && (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4"
          >
            Save Changes
          </button>
        )}
      </form>

      <button
        onClick={toggleEditMode}
        className="bg-blue-500 text-white py-2 px-4 rounded-full mb-4 mt-4"
      >
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>

      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-3 rounded-lg mt-4"
      >
        Log Out
      </button>
    </div>
  );
}

export default ProfileManagementPage;
