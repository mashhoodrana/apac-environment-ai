"""
Environmental prediction model service
"""
import os
import json
import numpy as np
import pandas as pd
import logging
import tempfile
import tensorflow as tf
from dotenv import load_dotenv
import google.colab as colab
from google.colab import drive

# Load environment variables
load_dotenv()

# Set up logging
logger = logging.getLogger(__name__)

# Model configuration
MODEL_PATH = os.getenv("MODEL_PATH")
COLAB_NOTEBOOK_URL = os.getenv("COLAB_NOTEBOOK_URL", "https://colab.research.google.com/drive/1G84mIHuly35rkdTutx2ldvLWnfkc1Aas")

class EnvironmentalPredictionModel:
    """Class to handle environmental predictions using the trained model"""
    
    def __init__(self):
        self.model = None
        self.is_initialized = False
        try:
            self._initialize_model()
        except Exception as e:
            logger.error(f"Error initializing model: {str(e)}")
    
    def _initialize_model(self):
        """Load the TensorFlow model"""
        if not MODEL_PATH:
            logger.warning("MODEL_PATH environment variable not set")
            return
        
        try:
            if os.path.exists(MODEL_PATH):
                self.model = tf.keras.models.load_model(MODEL_PATH)
                self.is_initialized = True
                logger.info(f"Successfully loaded model from {MODEL_PATH}")
            else:
                logger.warning(f"Model path {MODEL_PATH} does not exist")
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
    
    def _preprocess_data(self, historical_data):
        """Preprocess input data for model prediction"""
        try:
            # Convert to appropriate format for model
            # This will depend on your specific model requirements
            
            # Example preprocessing for a time series model
            df = pd.DataFrame(historical_data)
            
            # Normalize data
            df_normalized = (df - df.mean()) / df.std()
            
            # Convert to the expected input shape for your model
            model_input = df_normalized.values.reshape(1, -1, df.shape[1])
            
            return model_input
        
        except Exception as e:
            logger.error(f"Error preprocessing data: {str(e)}")
            raise
    
    def predict(self, historical_data, prediction_days=7):
        """
        Make environmental predictions based on historical data
        
        Args:
            historical_data: Dictionary or DataFrame of historical environmental data
            prediction_days: Number of days to predict
            
        Returns:
            Dictionary of predictions
        """
        try:
            if not self.is_initialized:
                # If model not loaded locally, try to use Colab
                return self._predict_with_colab(historical_data, prediction_days)
            
            # Preprocess the data
            model_input = self._preprocess_data(historical_data)
            
            # Make predictions
            predictions = self.model.predict(model_input)
            
            # Format the results
            dates = pd.date_range(
                start=pd.Timestamp.now(), 
                periods=prediction_days
            ).strftime("%Y-%m-%d").tolist()
            
            # Format based on your model output structure
            # Example for a model that predicts NDVI, temperature, and albedo
            result = {
                "ndvi_prediction": {
                    "dates": dates,
                    "values": predictions[0, :, 0].tolist()
                },
                "temperature_prediction": {
                    "dates": dates,
                    "values": predictions[0, :, 1].tolist()
                },
                "albedo_prediction": {
                    "dates": dates,
                    "values": predictions[0, :, 2].tolist()
                }
            }
            
            return result
        
        except Exception as e:
            logger.error(f"Error making prediction: {str(e)}")
            return {"error": str(e)}
    
    def _predict_with_colab(self, historical_data, prediction_days=7):
        """Make predictions using the Colab notebook when local model is unavailable"""
        try:
            logger.info("Attempting to use Colab for prediction")
            
            # Save the input data to a temporary file
            with tempfile.NamedTemporaryFile(suffix='.json', delete=False) as f:
                json.dump(historical_data, f)
                input_path = f.name
            
            # TODO: In a production setting, you would implement a secure API call
            # to your Colab notebook or model hosting service
            
            # For demonstration, return mock prediction data
            # In real implementation, you would call the Colab notebook API
            
            # Mock prediction data
            dates = pd.date_range(
                start=pd.Timestamp.now(), 
                periods=prediction_days
            ).strftime("%Y-%m-%d").tolist()
            
            # Generate some random predictions that look plausible
            ndvi_base = np.mean([item for item in historical_data.get('ndvi_values', [0.4])])
            temp_base = np.mean([item for item in historical_data.get('temperature_values', [25])])
            albedo_base = np.mean([item for item in historical_data.get('albedo_values', [0.3])])
            
            ndvi_values = [max(0, min(1, ndvi_base + np.random.normal(0, 0.05))) for _ in range(prediction_days)]
            temp_values = [max(0, temp_base + np.random.normal(0, 2)) for _ in range(prediction_days)]
            albedo_values = [max(0, min(1, albedo_base + np.random.normal(0, 0.02))) for _ in range(prediction_days)]
            
            mock_result = {
                "ndvi_prediction": {
                    "dates": dates,
                    "values": ndvi_values
                },
                "temperature_prediction": {
                    "dates": dates,
                    "values": temp_values
                },
                "albedo_prediction": {
                    "dates": dates,
                    "values": albedo_values
                },
                "source": "mock_prediction"  # Flag that this is mock data
            }
            
            # Clean up
            os.remove(input_path)
            
            return mock_result
            
        except Exception as e:
            logger.error(f"Error using Colab for prediction: {str(e)}")
            return {"error": str(e)}

# Create a singleton instance
model = EnvironmentalPredictionModel()

async def predict_environmental_conditions(historical_data, days=7):
    """
    Make environmental predictions based on historical data
    """
    try:
        results = model.predict(historical_data, prediction_days=days)
        return results
    except Exception as e:
        logger.error(f"Error predicting environmental conditions: {str(e)}")
        return {"error": f"Failed to generate predictions: {str(e)}"}

async def explain_prediction(prediction_data):
    """
    Generate human-readable explanation of predictions
    """
    try:
        # Use the Gemini AI service for natural language explanation
        from . import chatbot_service
        
        explanation = await chatbot_service.get_environmental_insights(
            {"prediction_type": "environmental_forecast"},
            prediction_data
        )
        
        return explanation
    except Exception as e:
        logger.error(f"Error explaining prediction: {str(e)}")
        return {"error": f"Failed to explain prediction: {str(e)}"} 