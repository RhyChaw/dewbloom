// app/dashboard/page.jsx (Next.js App Router)
"use client";
import React from "react";
import { Home, User, Settings, LogOut } from "lucide-react";

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-700 text-white flex flex-col">
        <div className="px-6 py-4 text-2xl font-bold border-b border-purple-500">
          DewBloom
        </div>
        <nav className="flex-1 px-4 py-6 space-y-4">
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-600 transition"
          >
            <Home size={20} /> Home
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-600 transition"
          >
            <User size={20} /> Profile
          </a>
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-600 transition"
          >
            <Settings size={20} /> Settings
          </a>
        </nav>
        <button className="flex items-center gap-3 p-2 m-4 rounded-lg bg-purple-600 hover:bg-purple-500 transition">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome Back 👋
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow rounded-xl">📊 Analytics</div>
            <div className="p-6 bg-white shadow rounded-xl">📝 Notes</div>
            <div className="p-6 bg-white shadow rounded-xl">⚙️ Settings</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
