import React, { useState, useEffect } from 'react';
import { FiInfo } from 'react-icons/fi';
import { analyzeLocation } from '../services/api';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function NDVI() {
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    startDate: '',
    endDate: '',
    locationName: '',
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [predictionData, setPredictionData] = useState(null);

  useEffect(() => {
    if (result && result.ndvi_data) {
      // Process historical data for the chart
      const labels = result.ndvi_data.dates || [];
      const data = result.ndvi_data.values || [];
      
      // Format chart data
      setChartData({
        labels,
        datasets: [
          {
            label: 'Historical NDVI',
            data: data,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
        ],
      });
      
      // Process prediction data if available
      if (result.ndvi_prediction) {
        const predictionLabels = result.ndvi_prediction.dates || [];
        const predictionValues = result.ndvi_prediction.values || [];
        
        setPredictionData({
          labels: predictionLabels,
          datasets: [
            {
              label: 'NDVI Prediction',
              data: predictionValues,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
          ],
        });
      }
    }
  }, [result]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const data = await analyzeLocation(
        parseFloat(formData.latitude),
        parseFloat(formData.longitude),
        formData.startDate,
        formData.endDate,
        formData.locationName || null
      );
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred while analyzing the location');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get NDVI color class based on value
  const getNdviColorClass = (ndviValue) => {
    if (!ndviValue && ndviValue !== 0) return 'bg-gray-300';
    if (ndviValue < 0) return 'bg-red-500';
    if (ndviValue < 0.2) return 'bg-yellow-500';
    if (ndviValue < 0.4) return 'bg-green-300';
    if (ndviValue < 0.6) return 'bg-green-500';
    return 'bg-green-700';
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'NDVI Time Series',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            NDVI Analysis
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Monitor vegetation health and density using Normalized Difference Vegetation Index.
          </p>
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-light rounded-md p-3">
                <FiInfo className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    What is NDVI?
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      Normalized Difference Vegetation Index
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-gray-600 dark:text-gray-300">
                NDVI is a simple graphical indicator that can be used to analyze remote sensing measurements, typically from satellite imagery, and assess whether the target being observed contains live green vegetation or not. NDVI values range from -1 to +1, where higher values indicate healthier vegetation.
              </p>
            </div>
          </div>
        </div>

        {/* Analysis Form */}
        <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Analyze Location</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Latitude
                  </label>
                  <input
                    type="number"
                    name="latitude"
                    id="latitude"
                    step="any"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-light focus:ring-primary-light sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                    value={formData.latitude}
                    onChange={handleChange}
                    placeholder="e.g., 37.7749"
                  />
                </div>
                <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Longitude
                  </label>
                  <input
                    type="number"
                    name="longitude"
                    id="longitude"
                    step="any"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-light focus:ring-primary-light sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                    value={formData.longitude}
                    onChange={handleChange}
                    placeholder="e.g., -122.4194"
                  />
                </div>
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-light focus:ring-primary-light sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-light focus:ring-primary-light sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="locationName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="locationName"
                    id="locationName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-light focus:ring-primary-light sm:text-sm dark:bg-gray-700 dark:border-gray-600"
                    value={formData.locationName}
                    onChange={handleChange}
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-light hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:opacity-50"
                >
                  {loading ? 'Analyzing...' : 'Analyze Location'}
                </button>
              </div>
            </form>
            
            {error && (
              <div className="mt-4 bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Analysis Results</h2>
              
              {/* Location Info */}
              {result.location && (
                <div className="mb-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{result.location}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Lat: {formData.latitude}, Lon: {formData.longitude}
                  </p>
                </div>
              )}
              
              {/* NDVI Value */}
              {result.ndvi !== undefined && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Average NDVI:</p>
                  <div className="flex items-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold ${getNdviColorClass(result.ndvi)}`}>
                      {result.ndvi.toFixed(2)}
                    </div>
                    <div className="ml-4">
                      <p className="text-gray-700 dark:text-gray-300">
                        {result.ndvi < 0 ? 'No vegetation, likely water or artificial surfaces' :
                         result.ndvi < 0.2 ? 'Very sparse vegetation' :
                         result.ndvi < 0.4 ? 'Sparse vegetation' :
                         result.ndvi < 0.6 ? 'Moderate vegetation' :
                         'Dense, healthy vegetation'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* AI Insights */}
              {result.ai_insights && result.ai_insights.insights && (
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">AI Insights:</h3>
                  <p className="text-gray-700 dark:text-gray-300">{result.ai_insights.insights}</p>
                </div>
              )}
              
              {/* Historical Data Chart */}
              {chartData && (
                <div className="mt-6">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Historical NDVI Data</h3>
                  <div className="h-80">
                    <Line options={chartOptions} data={chartData} />
                  </div>
                </div>
              )}
              
              {/* Prediction Chart */}
              {predictionData && (
                <div className="mt-8">
                  <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">NDVI Prediction (Next Week)</h3>
                  <div className="h-80">
                    <Line 
                      options={{
                        ...chartOptions,
                        plugins: {
                          ...chartOptions.plugins,
                          title: {
                            ...chartOptions.plugins.title,
                            text: 'NDVI Prediction'
                          }
                        }
                      }} 
                      data={predictionData} 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}