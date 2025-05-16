import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiDownload, FiShare2 } from 'react-icons/fi';

export default function ResultsPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching results
    setLoading(true);
    // In a real app, you would fetch the results from your API
    // For now, we'll just simulate a delay and return mock data
    setTimeout(() => {
      setResult({
        id: id,
        type: 'ndvi',
        location: 'Sample Location',
        date: new Date().toISOString(),
        data: {
          average: 0.65,
          min: 0.2,
          max: 0.9
        }
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-light mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Error</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analysis Results</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                ID: {result.id} • {new Date(result.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-light hover:bg-primary-dark">
                <FiDownload className="mr-1" /> Export
              </button>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-light hover:bg-primary-dark">
                <FiShare2 className="mr-1" /> Share
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Location</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">{result.location}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Analysis Type</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">{result.type.toUpperCase()}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Date Range</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">Last 30 days</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Results Summary</h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{result.data.average.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Minimum</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{result.data.min.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Maximum</p>
                    <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{result.data.max.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">AI Insights</h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">
                  Based on the analysis, the vegetation in this area appears to be healthy with an average NDVI value of {result.data.average.toFixed(2)}. 
                  This indicates good photosynthetic activity and plant vigor. The area shows consistent vegetation coverage with minimal signs of stress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}