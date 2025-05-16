import React from 'react';
import { Link } from 'react-router-dom';
import { FiBarChart2, FiThermometer, FiSun } from 'react-icons/fi';

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Environmental Analysis
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Choose an analysis type to begin monitoring environmental conditions.
          </p>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
          {/* NDVI Analysis Card */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <FiBarChart2 className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">NDVI Analysis</h3>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Monitor vegetation health and density using Normalized Difference Vegetation Index.
                </p>
                <div className="mt-6">
                  <Link
                    to="/ndvi"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                  >
                    Start Analysis
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Temperature Analysis Card */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <FiThermometer className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Temperature Analysis</h3>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Track surface temperature changes to identify heat islands and climate patterns.
                </p>
                <div className="mt-6">
                  <Link
                    to="/temperature"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                  >
                    Start Analysis
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Albedo Analysis Card */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <FiSun className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Albedo Analysis</h3>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Measure surface reflectivity to understand energy balance and climate impacts.
                </p>
                <div className="mt-6">
                  <Link
                    to="/albedo"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700"
                  >
                    Start Analysis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}