import { useEffect, useState, useRef } from "react";

export const Appbar = () => {
  const [username, setUsername] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) setUsername(name);
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login"; 
  };

  return (
    <div className="shadow-md h-16 px-6 flex items-center justify-between bg-white relative">
      <div className="text-xl font-semibold text-blue-600 tracking-wide">
        PayTM
      </div>

      <div className="flex items-center gap-4" ref={menuRef}>
        <span className="text-gray-700 font-medium">
          Hello, {username || "User"}
        </span>

        {/* Profile Avatar */}
        <div
          className="h-12 w-12 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700 font-semibold text-lg cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        >
          {(username && username.charAt(0).toUpperCase()) || "U"}
        </div>

        {/* Dropdown Menu */}
        {openMenu && (
          <div className="absolute right-0 top-16 bg-white border shadow-md rounded-md w-32">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
