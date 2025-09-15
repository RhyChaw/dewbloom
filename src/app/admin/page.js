"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Mock users data
  useEffect(() => {
    if (isAuthenticated) {
      // Simulate fetching users from backend
      const mockUsers = [
        { id: 1, email: "user1@example.com", name: "Alice Johnson", joinDate: "2024-01-15", status: "active" },
        { id: 2, email: "user2@example.com", name: "Bob Smith", joinDate: "2024-01-20", status: "active" },
        { id: 3, email: "user3@example.com", name: "Carol Davis", joinDate: "2024-02-01", status: "pending" },
        { id: 4, email: "user4@example.com", name: "David Wilson", joinDate: "2024-02-05", status: "active" },
        { id: 5, email: "user5@example.com", name: "Eva Brown", joinDate: "2024-02-10", status: "suspended" },
        { id: 6, email: "user6@example.com", name: "Frank Miller", joinDate: "2024-02-15", status: "active" },
        { id: 7, email: "user7@example.com", name: "Grace Lee", joinDate: "2024-02-20", status: "active" },
        { id: 8, email: "user8@example.com", name: "Henry Taylor", joinDate: "2024-02-25", status: "pending" }
      ];
      setUsers(mockUsers);
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === "RC" && credentials.password === "123") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCredentials({ username: "", password: "" });
    setUsers([]);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[var(--background)]">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="card-surface p-8">
            <h1 className="text-3xl font-bold text-black mb-6 text-center">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Username</label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Password</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                  required
                />
              </div>
              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}
              <button type="submit" className="w-full btn-primary">
                Login
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link href="/" className="btn-secondary">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Admin Panel</h1>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-surface p-6">
            <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
            <p className="text-3xl font-bold text-black">{users.length}</p>
          </div>
          <div className="card-surface p-6">
            <h3 className="text-sm font-medium text-gray-600">Active Users</h3>
            <p className="text-3xl font-bold text-green-600">
              {users.filter(u => u.status === "active").length}
            </p>
          </div>
          <div className="card-surface p-6">
            <h3 className="text-sm font-medium text-gray-600">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {users.filter(u => u.status === "pending").length}
            </p>
          </div>
          <div className="card-surface p-6">
            <h3 className="text-sm font-medium text-gray-600">Suspended</h3>
            <p className="text-3xl font-bold text-red-600">
              {users.filter(u => u.status === "suspended").length}
            </p>
          </div>
        </div>

        {/* Users Table */}
        <div className="card-surface">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-black">User Management</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-medium">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-black">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.joinDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active' ? 'bg-green-100 text-green-800' :
                        user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-purple-600 hover:text-purple-900 mr-3">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Suspend
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 card-surface p-6">
          <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">
              Export Users
            </button>
            <button className="btn-secondary">
              Send Newsletter
            </button>
            <button className="btn-secondary">
              View Analytics
            </button>
            <button className="btn-secondary">
              System Settings
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
