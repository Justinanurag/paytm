import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);

// useEffect(() => {
//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/v1/user/bulk");
//       console.log(response.data.users);
//       setUsers(response.data.users);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   fetchUsers(); // ← IMPORTANT: Call the function
// }, []);

  return (
    <>
      <div className="font-bold mt-6 text-xl text-gray-800">Users</div>

      <div className="my-3">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-3 py-2 border rounded-lg border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
        />
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  return (
    <div className="flex justify-between items-center bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="rounded-full h-14 w-14 bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-xl">
          {user.firstName[0]}
        </div>

        {/* Name */}
        <div>
          <div className="font-semibold text-gray-900 text-lg">
            {user.firstName} {user.lastName}
          </div>
          <div className="text-sm text-gray-500">Active now</div>
        </div>
      </div>

      {/* Right Section */}
      <div>
        <Button label="Send Money" />
      </div>
    </div>
  );
}
