import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiArrowRight, FiBarChart2, FiThermometer, FiSun } from "react-icons/fi";

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-white dark:bg-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white dark:bg-gray-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Welcome to</span>{" "}
                  <span className="block text-primary-light xl:inline">
                    EnviroLens
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Leveraging Google's AI and Earth observation technologies to
                  monitor environmental changes through NDVI, Temperature, and
                  Albedo analysis.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/analyze"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-light hover:bg-primary-dark md:py-4 md:text-lg md:px-10"
                    >
                      Start Analysis
                      <FiArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-100 dark:bg-gray-700">
          <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <div className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Google Solution Challenge
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                EnviroLens uses satellite imagery and AI to analyze
                environmental indicators:
              </p>
              <ul className="mt-4 space-y-2 text-left">
                <li className="flex items-start">
                  <span className="h-6 flex items-center sm:h-7">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-primary-light"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <p className="ml-2 text-gray-600 dark:text-gray-300">
                    <strong>NDVI:</strong> Vegetation health monitoring
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="h-6 flex items-center sm:h-7">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-primary-light"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <p className="ml-2 text-gray-600 dark:text-gray-300">
                    <strong>Temperature:</strong> Surface temperature analysis
                  </p>
                </li>
                <li className="flex items-start">
                  <span className="h-6 flex items-center sm:h-7">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-primary-light"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <p className="ml-2 text-gray-600 dark:text-gray-300">
                    <strong>Albedo:</strong> Surface reflectivity measurement
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Cards Section */}
      <div className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-light font-semibold tracking-wide uppercase">
              Environmental Analysis
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Explore Our Analysis Tools
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              Select one of our specialized tools to analyze environmental data for your area of interest.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* NDVI Card */}
              <div className="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <FiBarChart2 className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">NDVI Analysis</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Monitor vegetation health and density using Normalized Difference Vegetation Index.
                    </p>
                  </div>
                  <div className="mt-5">
                    <Link
                      to="/ndvi"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                    >
                      Analyze NDVI
                      <FiArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Temperature Card */}
              <div className="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                      <FiThermometer className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Temperature Analysis</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Track surface temperature changes to identify heat islands and climate patterns.
                    </p>
                  </div>
                  <div className="mt-5">
                    <Link
                      to="/temperature"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
                    >
                      Analyze Temperature
                      <FiArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Albedo Card */}
              <div className="bg-gray-50 dark:bg-gray-700 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                      <FiSun className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Albedo Analysis</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Measure surface reflectivity to understand energy balance and climate impacts.
                    </p>
                  </div>
                  <div className="mt-5">
                    <Link
                      to="/albedo"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700"
                    >
                      Analyze Albedo
                      <FiArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-light font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              EnviroLens: Environmental Monitoring Made Easy
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              Our solution provides comprehensive tools for environmental
              analysis and monitoring.
            </p>
          </div>

          {/* Rest of the features section remains the same */}
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-light text-white">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <div className="ml-16">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  NDVI Analysis
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Monitor vegetation health and density using Normalized
                  Difference Vegetation Index.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-light text-white">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="ml-16">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Temperature Mapping
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Track surface temperature changes to identify heat islands
                  and climate patterns.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-light text-white">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div className="ml-16">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  Albedo Measurement
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                  Analyze surface reflectivity to understand energy absorption
                  and climate impacts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
