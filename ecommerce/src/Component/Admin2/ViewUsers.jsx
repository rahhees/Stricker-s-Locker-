import React, { useState, useEffect } from "react";
import { adminService } from "../../Services/AdminService";
import { toast } from "react-toastify";
import Swal from "sweetalert2"; // Import SweetAlert2
import { 
  Users, Search, Trash2, ShieldCheck, UserCheck, Mail, Calendar, ShieldAlert, Loader2 
} from "lucide-react";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllUsers();
      
      if (response && response.data) {
        setUsers(response.data); 
      } else {
        setUsers(Array.isArray(response) ? response : []);
      }
    } catch (err) {
      toast.error("Failed to fetch users");
      console.log("error", err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = async (user) => {
    const action = user.isBlocked ? "unblock" : "block";
    
    // Swal Confirmation for Blocking/Unblocking
    const result = await Swal.fire({
      title: `Are you sure?`,
      text: `You are about to ${action} ${user.name || user.email}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: user.isBlocked ? "#10b981" : "#f59e0b", // Green for unblock, Amber for block
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${action} them!`,
      background: "#ffffff",
      customClass: {
        popup: 'rounded-2xl'
      }
    });

    if (result.isConfirmed) {
      try {
        await adminService.toggleBlockStatus(user.id);
        setUsers(users.map(u => 
          u.id === user.id ? { ...u, isBlocked: !u.isBlocked } : u
        ));
        
        Swal.fire({
          title: "Updated!",
          text: `User has been ${user.isBlocked ? "unblocked" : "blocked"}.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      } catch (err) {
        toast.error("Failed to update user status");
      }
    }
  };

  const handleDelete = async (user) => {
    // Swal Confirmation for Deletion
    const result = await Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to delete ${user.name}? This action is permanent and cannot be undone!`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // Red for delete
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete forever",
      background: "#ffffff",
      customClass: {
        popup: 'rounded-2xl'
      }
    });

    if (result.isConfirmed) {
      try {
        await adminService.deleteUser(user.id);
        setUsers(users.filter(u => u.id !== user.id));
        
        Swal.fire({
          title: "Deleted!",
          text: "User account has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      } catch (err) {
        toast.error("Failed to delete user");
      }
    }
  };

  const filteredUsers = Array.isArray(users) ? users.filter(user => {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
    const displayName = (user.name || "").toLowerCase();
    const email = (user.email || "").toLowerCase();
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || displayName.includes(search) || email.includes(search);
  }) : [];

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <Loader2 className="animate-spin text-blue-600" size={40} />
      <p className="text-gray-500 font-medium">Loading user database...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Users className="text-blue-600" size={28} />
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        </div>
        <div className="flex bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
          <button className="px-4 py-1.5 text-sm font-medium bg-blue-50 text-blue-600 rounded-md">All Users</button>
          <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-700">Admins</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">User</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Role</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Joined Date</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <tr key={user.id} className={`hover:bg-gray-50/50 transition-colors ${user.isBlocked ? 'bg-red-50/30' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold border border-gray-200 uppercase">
                        {user.name?.charAt(0) || user.email?.charAt(0)}
                      </div>
                      <div>
                <p className="font-semibold text-gray-800">
                 {user.firstName || user.fullName || user.lastName || "N/A"}
                </p>
                        <p className="text-xs text-gray-500 flex items-center">
                          <Mail size={12} className="mr-1" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center w-fit px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      user.role?.toLowerCase() === 'admin' 
                      ? 'bg-purple-50 text-purple-700 border-purple-100' 
                      : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      {user.role?.toLowerCase() === 'admin' && <ShieldCheck size={12} className="mr-1" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.isBlocked 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                    }`}>
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-2" />
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => handleToggleBlock(user)}
                        className={`p-2 rounded-lg transition-colors ${
                          user.isBlocked 
                          ? 'text-green-600 hover:bg-green-50' 
                          : 'text-amber-600 hover:bg-amber-50'
                        }`}
                        title={user.isBlocked ? "Unblock User" : "Block User"}
                      >
                        {user.isBlocked ? <UserCheck size={18} /> : <ShieldAlert size={18} />}
                      </button>
                      {/* <button 
                        onClick={() => handleDelete(user)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button> */}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-gray-500 italic">No users found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;