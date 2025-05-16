import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="text-primary-light dark:text-white font-bold text-xl"
              >
                APAC AI Solution
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/ndvi"
                className="border-transparent text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                NDVI
              </Link>
              <Link
                to="/temperature"
                className="border-transparent text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Temperature
              </Link>
              <Link
                to="/albedo"
                className="border-transparent text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Albedo
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-primary-light dark:hover:text-white focus:outline-none"
            >
              {darkMode ? (
                <FiSun className="h-5 w-5" />
              ) : (
                <FiMoon className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-primary-light dark:hover:text-white focus:outline-none"
            >
              {isOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-primary-light"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/ndvi"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-primary-light"
              onClick={toggleMenu}
            >
              NDVI
            </Link>
            <Link
              to="/temperature"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-primary-light"
              onClick={toggleMenu}
            >
              Temperature
            </Link>
            <Link
              to="/albedo"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-primary-light"
              onClick={toggleMenu}
            >
              Albedo
            </Link>
            <div className="flex items-center justify-between px-4 py-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-primary-light dark:hover:text-white focus:outline-none"
              >
                {darkMode ? (
                  <FiSun className="h-5 w-5" />
                ) : (
                  <FiMoon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
