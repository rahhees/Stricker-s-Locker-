import React from "react";
import { NavLink } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const AdminDashboard = () => {
  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 7000 },
    { month: "May", sales: 6000 },
    { month: "Jun", sales: 8000 },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "200px", background: "#f8f9fa", padding: "20px" }}>
        <h2>Admin Panel</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
          <NavLink to="/users">View Users</NavLink>
          <NavLink to="/orders">View Orders</NavLink>
          <NavLink to="/products">Add Product</NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Dashboard</h1>

        {/* Cards */}
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={{ flex: 1, padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3>View Users</h3>
            <NavLink to="/users">Go</NavLink>
          </div>
          <div style={{ flex: 1, padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3>View Orders</h3>
            <NavLink to="/orders">Go</NavLink>
          </div>
          <div style={{ flex: 1, padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3>Add Product</h3>
            <NavLink to="/products">Go</NavLink>
          </div>
        </div>

        {/* Chart */}
        <div style={{ marginTop: "40px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
          <h3>Sales Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
