import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function ProfileDropdown({ userData, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    handleLogout();
    setIsOpen(false);
  };

  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Avatar - Click to toggle dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full ring-2 ring-transparent hover:ring-blue-400 transition-all duration-200 flex items-center justify-center bg-gray-700 text-white font-medium text-sm overflow-hidden border border-gray-600"
      >
        {userData?.photoURL ? (
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={userData.photoURL}
            alt="Profile avatar"
          />
        ) : (
          <span className="text-gray-200 font-semibold">
            {userData?.name
              ?.split(" ")
              .map((word) => word.charAt(0))
              .join("")
              .toUpperCase() || "U"}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header Section */}
          <div className="px-4 py-3 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <button className="w-10 h-10 rounded-full ring-2 ring-transparent hover:ring-blue-400 transition-all duration-200 flex items-center justify-center bg-gray-700 text-white font-medium text-sm overflow-hidden border border-gray-600">
                {userData?.photoURL ? (
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={userData.photoURL}
                    alt="Profile avatar"
                  />
                ) : (
                  <span className="text-gray-200 font-semibold">
                    {userData?.name
                      ?.split(" ")
                      .map((word) => word.charAt(0))
                      .join("")
                      .toUpperCase() || "U"}
                  </span>
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {userData?.displayName}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {userData?.email}
                </p>
              </div>
              {userData?.emailVerified && (
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900 text-green-300 border border-green-700">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* User Info Section */}
          <div className="px-4 py-3 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Name:</span>
              <span className="text-white font-mono text-xs bg-gray-700 px-2 py-1 rounded border border-gray-600">
                {userData?.displayName}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Member since:</span>
              <span className="text-white">
                {formatDate(Number(userData?.metadata?.createdAt))}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Last login:</span>
              <span className="text-white">
                {formatDate(Number(userData?.metadata?.createdAt))}
              </span>
            </div>
          </div>

          {/* Actions Section */}
          <div className="px-4 py-3 border-t border-gray-700 space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-150 flex items-center space-x-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>View Profile</span>
            </button>

            <hr className="border-gray-700" />

            <button
              onClick={logout}
              className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-900 hover:bg-opacity-20 rounded-md transition-colors duration-150 flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
