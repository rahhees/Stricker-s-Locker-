import React, { useEffect, useState } from "react";
import api from "../Api/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [users, setUsers] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser){
        navigate("/login")
         return;
      }
        
   

      try {
        const res = await api.get(`/users/${storedUser}`);
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching user:", err.response?.data || err.message);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await api.patch(`/users/${users.id}`, users);
      setUsers(res.data);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile!");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUsers((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  if (!users){
navigate('/login')
return
  } 

  return (
    <div className="max-w-lg mx-auto p-6 mt-12 bg-white shadow-xl rounded-2xl border mt-40">
      {/* Profile Header */}
      <div className="flex flex-col items-center">
        <img
          src={users.image || "https://via.placeholder.com/120"}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-indigo-500 object-cover shadow-md"
        />
        <h2 className="text-2xl font-bold text-gray-800 mt-4">{users.firstName}</h2>
        <p className="text-gray-500 text-sm">
          Manage your account details and update info
        </p>
      </div>

      {/* Profile Info */}
      <div className="mt-6">
        {!isEditing ? (
          <div className="space-y-3 text-gray-700">
            <p>
              <strong className="text-gray-800">Name:</strong>{" "}
              {users.firstName} {users.lastName}
            </p>
            <p>
              <strong className="text-gray-800">Email:</strong> {users.email}
            </p>
            <p>
              <strong className="text-gray-800">Password:</strong>********
              {/* {users.password} */}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              name="firstName"
              value={users.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              name="lastName"
              value={users.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="email"
              name="email"
              value={users.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="password"
              name="password"
              value={users.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-2 border rounded-md"
           />

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
               
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-600"
              />
            
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSave}
                className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
