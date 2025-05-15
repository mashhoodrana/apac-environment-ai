import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              © {new Date().getFullYear()} APAC AI Solution. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-light dark:hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-light dark:hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-light dark:hover:text-white">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-500 dark:text-gray-400 text-xs">
          Developed for Google APAC Solution Challenge
        </div>
      </div>
    </footer>
  );
}