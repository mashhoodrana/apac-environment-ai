/**
 * API Service for interacting with the backend
 */

// Base URL for the API - will switch based on environment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' // Use relative URL in production to avoid CORS issues
  : 'http://localhost:8000/api';

/**
 * Analyze environmental data for a location including model predictions
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @param {string} locationName - Optional name for the location
 * @returns {Promise<Object>} - Environmental analysis data with predictions
 */
export const analyzeLocation = async (latitude, longitude, startDate, endDate, locationName = null) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude,
        longitude,
        start_date: startDate,
        end_date: endDate,
        location_name: locationName,
        include_predictions: true, // Request predictions from the model
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to analyze location');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Get model predictions for a specific location
 * @param {string} locationId - The ID of the location to predict for
 * @returns {Promise<Object>} - Prediction results
 */
export const getPredictions = async (locationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict/${locationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to get predictions');
    }

    return await response.json();
  } catch (error) {
    console.error('Prediction API Error:', error);
    throw error;
  }
};

/**
 * Get model explanation in simple language
 * @param {object} predictionData - The prediction data to explain
 * @returns {Promise<Object>} - Explanation in simple language
 */
export const getExplanation = async (predictionData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/explain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prediction_data: predictionData
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to get explanation');
    }

    return await response.json();
  } catch (error) {
    console.error('Explanation API Error:', error);
    throw error;
  }
};

/**
 * Health check endpoint
 * @returns {Promise<Object>} - Health status
 */
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
    if (!response.ok) {
      throw new Error('API health check failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Health Check Error:', error);
    throw error;
  }
}; 