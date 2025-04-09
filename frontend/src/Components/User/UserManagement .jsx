import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

const UserManagement = () => {
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client"
  });


  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.data || data); 
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  
  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      password: "", 
      role: user.role
    });
    setIsCreating(false);
  };

  
  const handleNew = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "client"
    });
    setIsCreating(true);
  };

  
  const handleCancel = () => {
    setEditingUser(null);
    setIsCreating(false);
  };

 
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      
      fetchUsers();
    } catch (err) {
      setError(err.message);
      console.error("Error deleting user:", err);
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingUser ? `/api/users/${editingUser}` : '/api/users';
      const method = editingUser ? "PUT" : "POST";
      
      
      const submitData = {...formData};
      if (editingUser && !submitData.password) {
        delete submitData.password;
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Operation failed");
      }

     
      setEditingUser(null);
      setIsCreating(false);
      fetchUsers();
    } catch (err) {
      setError(err.message);
      console.error("Error submitting form:", err);
    }
  };

  
  const handleBack = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={handleBack}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          &larr; Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-center text-blue-600">User Management</h1>
        <button
          onClick={handleNew}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
        >
          Create New User
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      {(isCreating || editingUser) && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {isCreating ? "Create New User" : "Edit User"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Password {editingUser && "(leave blank to keep unchanged)"}</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required={!editingUser}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="client">Client</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                {isCreating ? "Create User" : "Update User"}
              </button>
            </div>
          </form>
        </div>
      )}

     
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">User List</h2>
        {loading ? (
          <div className="text-center py-4">Loading users...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-700">Name</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-700">Email</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-700">Role</th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition duration-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-300"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;