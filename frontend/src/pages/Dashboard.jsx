import React from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <Appbar />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        
        {/* Balance Card */}
        <div className="mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <Balance value={5000} />
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
          <Users />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
