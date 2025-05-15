import numpy as np
import pandas as pd
import logging

logger = logging.getLogger(__name__)

def clean_satellite_data(data_dict):
    """
    Clean satellite data by handling None/NaN values and invalid ranges
    """
    # Create a copy of the input data
    cleaned_data = data_dict.copy()
    
    if "environmental_parameters" in cleaned_data:
        params = cleaned_data["environmental_parameters"]
        
        # Handle NDVI (valid range: -1 to 1)
        if "ndvi" in params and params["ndvi"] is not None:
            if params["ndvi"] < -1 or params["ndvi"] > 1:
                logger.warning(f"NDVI value out of valid range: {params['ndvi']}")
                params["ndvi"] = None
        
        # Handle AQI proxy (AOD - valid range typically 0 to ~5)
        if "aqi_proxy" in params and params["aqi_proxy"] is not None:
            if params["aqi_proxy"] < 0 or params["aqi_proxy"] > 5:
                logger.warning(f"AQI proxy value out of valid range: {params['aqi_proxy']}")
                params["aqi_proxy"] = None
        
        # Handle Land Surface Temperature (reasonable range check)
        if "land_surface_temp_celsius" in params and params["land_surface_temp_celsius"] is not None:
            if params["land_surface_temp_celsius"] < -80 or params["land_surface_temp_celsius"] > 80:
                logger.warning(f"LST value out of reasonable range: {params['land_surface_temp_celsius']}")
                params["land_surface_temp_celsius"] = None
    
    return cleaned_data

def normalize_ndvi(ndvi_value):
    """
    Normalize NDVI values to a 0-100 scale for easier interpretation
    """
    if ndvi_value is None:
        return None
    
    # NDVI ranges from -1 to 1, normalize to 0-100
    normalized = ((ndvi_value + 1) / 2) * 100
    return round(normalized, 2)

def interpret_ndvi(ndvi_value):
    """
    Provide a qualitative interpretation of NDVI values
    """
    if ndvi_value is None:
        return "Unknown"
    
    if ndvi_value < 0:
        return "Water or artificial surface"
    elif ndvi_value < 0.2:
        return "Barren soil or very sparse vegetation"
    elif ndvi_value < 0.4:
        return "Sparse vegetation"
    elif ndvi_value < 0.6:
        return "Moderate vegetation"
    else:
        return "Dense vegetation"

def interpret_aqi(aod_value):
    """
    Convert Aerosol Optical Depth to an approximate AQI interpretation
    Note: This is a simplified approximation, not an official conversion
    """
    if aod_value is None:
        return "Unknown"
    
    # Simple AOD to AQI approximation
    if aod_value < 0.1:
        return "Good"
    elif aod_value < 0.2:
        return "Moderate"
    elif aod_value < 0.3:
        return "Unhealthy for Sensitive Groups"
    elif aod_value < 0.5:
        return "Unhealthy"
    else:
        return "Very Unhealthy"

def prepare_data_for_model(data_dict):
    """
    Prepare data for machine learning model input by extracting and formatting features
    """
    try:
        # Extract environmental parameters
        params = data_dict.get("environmental_parameters", {})
        
        # Create feature dictionary
        features = {
            "ndvi": params.get("ndvi"),
            "aqi_proxy": params.get("aqi_proxy"),
            "land_surface_temp_celsius": params.get("land_surface_temp_celsius")
        }
        
        # Replace None values with NaN (for pandas/numpy compatibility)
        features = {k: np.nan if v is None else v for k, v in features.items()}
        
        # Convert to pandas DataFrame
        df = pd.DataFrame([features])
        
        # Fill NaN values with appropriate method (median imputation)
        # Note: In a real scenario, you would fit this on training data
        for col in df.columns:
            if df[col].isna().any():
                logger.warning(f"Missing values detected in {col}, using default imputation")
                if col == "ndvi":
                    df[col] = df[col].fillna(0.3)  # Moderate vegetation as default
                elif col == "aqi_proxy":
                    df[col] = df[col].fillna(0.15)  # Moderate air quality as default
                elif col == "land_surface_temp_celsius":
                    df[col] = df[col].fillna(25)  # Moderate temperature as default
        
        return df
    
    except Exception as e:
        logger.error(f"Error preparing data for model: {str(e)}")
        return None 