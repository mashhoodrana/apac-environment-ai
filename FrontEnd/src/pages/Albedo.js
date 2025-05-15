import React, { useState } from 'react';
import { FiSun } from 'react-icons/fi';
import { analyzeLocation } from '../services/api';

export default function Albedo() {
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

  // Calculate an approximate albedo indicator from NDVI (this is a simplification)
  const calculateApproxAlbedo = (ndvi) => {
    if (ndvi === null || ndvi === undefined) return null;
    // This is a very simplistic model: higher NDVI (more vegetation) generally means lower albedo
    // Real albedo would require specific satellite bands that measure surface reflectance
    return (0.3 - (0.1 * ndvi)).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Albedo Analysis
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Monitor surface reflectivity and energy balance.
          </p>
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-light rounded-md p-3">
                <FiSun className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    What is Albedo?
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      Surface Reflectivity
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-gray-600 dark:text-gray-300">
                Albedo is a measure of how much light (solar radiation) is reflected by a surface. It is a dimensionless quantity that indicates the reflecting power of a surface, ranging from 0 (no reflection, perfect absorption) to 1 (perfect reflection). For example, fresh snow has a high albedo of about 0.9, while dark soil might have an albedo of around 0.1.
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

        {/* Results Display - note that we're using NDVI data to approximate albedo */}
        {result && (
          <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Analysis Results</h2>
              <p className="mt-2 text-sm text-gray-500">
                <span className="font-medium text-yellow-500">Note:</span> Albedo values are approximated from NDVI data as a demonstration.
                For precise albedo measurements, specific satellite data would be required.
              </p>
              
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Location Information */}
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {result.location || `${result.coordinates.latitude}, ${result.coordinates.longitude}`}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Analysis period: {result.date_range}
                  </p>
                </div>
                
                {/* Estimated Albedo Value */}
                {result.environmental_parameters.ndvi !== null && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Estimated Albedo</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {calculateApproxAlbedo(result.environmental_parameters.ndvi)}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Based on NDVI value: {result.environmental_parameters.ndvi.toFixed(4)}
                    </p>
                  </div>
                )}
                
                {/* Other Environmental Parameters */}
                {result.environmental_parameters.land_surface_temp_celsius !== null && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Land Surface Temperature</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {result.environmental_parameters.land_surface_temp_celsius.toFixed(2)}°C
                    </p>
                  </div>
                )}
                
                {result.environmental_parameters.aqi_proxy !== null && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Air Quality (Proxy)</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                      {result.environmental_parameters.aqi_proxy.toFixed(4)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Albedo Information */}
        <div className="mt-8 grid gap-5 grid-cols-1 md:grid-cols-2">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Typical Albedo Values</h3>
              <div className="mt-4">
                <ul className="space-y-3">
                  <li className="flex">
                    <div className="w-4 h-4 mt-1 bg-blue-200 rounded-full"></div>
                    <p className="ml-2 text-gray-600 dark:text-gray-300">
                      <strong>Fresh snow:</strong> 0.80-0.90
                    </p>
                  </li>
                  <li className="flex">
                    <div className="w-4 h-4 mt-1 bg-blue-100 rounded-full"></div>
                    <p className="ml-2 text-gray-600 dark:text-gray-300">
                      <strong>Cloud cover:</strong> 0.40-0.80
                    </p>
                  </li>
                  <li className="flex">
                    <div className="w-4 h-4 mt-1 bg-yellow-200 rounded-full"></div>
                    <p className="ml-2 text-gray-600 dark:text-gray-300">
                      <strong>Sand/desert:</strong> 0.35-0.45
                    </p>
                  </li>
                  <li className="flex">
                    <div className="w-4 h-4 mt-1 bg-green-300 rounded-full"></div>
                    <p className="ml-2 text-gray-600 dark:text-gray-300">
                      <strong>Grassland:</strong> 0.15-0.25
                    </p>
                  </li>
                  <li className="flex">
                    <div className="w-4 h-4 mt-1 bg-green-800 rounded-full"></div>
                    <p className="ml-2 text-gray-600 dark:text-gray-300">
                      <strong>Forest:</strong> 0.10-0.20
                    </p>
                  </li>
                  <li className="flex">
                    <div className="w-4 h-4 mt-1 bg-gray-800 rounded-full"></div>
                    <p className="ml-2 text-gray-600 dark:text-gray-300">
                      <strong>Water:</strong> 0.05-0.10
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Importance of Albedo</h3>
              <div className="mt-4">
                <ul className="space-y-3">
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="ml-2 text-gray-600 dark:text-gray-300">
                      Climate regulation and energy balance
                    </p>
                  </li>
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="ml-2 text-gray-600 dark:text-gray-300">
                      Ice-albedo feedback in polar regions
                    </p>
                  </li>
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="ml-2 text-gray-600 dark:text-gray-300">
                      Urban heat island mitigation
                    </p>
                  </li>
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="ml-2 text-gray-600 dark:text-gray-300">
                      Assessment of land use change impacts
                    </p>
                  </li>
                  <li className="flex">
                    <svg className="flex-shrink-0 h-5 w-5 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="ml-2 text-gray-600 dark:text-gray-300">
                      Monitoring of snow and ice melt
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}