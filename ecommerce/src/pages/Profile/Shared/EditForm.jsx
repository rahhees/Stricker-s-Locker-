import React from "react";

const EditForm = ({ user, setUser }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-4">
      <input
        name="firstName"
        value={user.firstName || ""}
        onChange={handleChange}
        placeholder="First Name"
        className="input"
      />

      <input
        name="lastName"
        value={user.lastName || ""}
        onChange={handleChange}
        placeholder="Last Name"
        className="input"
      />

      <input
        name="email"
        value={user.email || ""}
        onChange={handleChange}
        placeholder="Email"
        className="input"
        disabled
      />

      <input
        name="phone"
        value={user.phone || ""}
        onChange={handleChange}
        placeholder="Phone"
        className="input"
      />

      <input
        name="address"
        value={user.address || ""}
        onChange={handleChange}
        placeholder="Address"
        className="input"
      />
    </div>
  );
};

export default EditForm;
