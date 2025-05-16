import os
import ee
import asyncio
import logging
import datetime
from functools import wraps
from ..utils import preprocessing

logger = logging.getLogger(__name__)

# Initialize Earth Engine
# Initialize Earth Engine using service account credentials
def initialize_earth_engine():
    try:
        service_account_email = 'gee-ap@envirolens.iam.gserviceaccount.com'
        credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

        from google.oauth2 import service_account
        credentials = service_account.Credentials.from_service_account_file(
            credentials_path,
            scopes=["https://www.googleapis.com/auth/cloud-platform"]
        )
        ee.Initialize(credentials)
        logger.info("Google Earth Engine initialized with service account")
        return True
    except Exception as e:
        logger.warning("Earth Engine initialization failed")
        logger.debug(f"Earth Engine init error: {str(e)}")
        return False


EARTH_ENGINE_ENABLED = initialize_earth_engine()

def run_in_executor(func):
    """Decorator to run synchronous GEE functions in executor"""
    @wraps(func)
    async def wrapper(*args, **kwargs):
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, lambda: func(*args, **kwargs))
    return wrapper

def fetch_ndvi(lat, lon, start_date, end_date):
    """
    Fetch Normalized Difference Vegetation Index (NDVI) from Sentinel-2
    """
    if not EARTH_ENGINE_ENABLED:
        logger.warning("Earth Engine not initialized - NDVI data unavailable")
        return None
        
    try:
        point = ee.Geometry.Point([lon, lat])
        
        # Filter Sentinel-2 collection by date and bounds
        collection = ee.ImageCollection('COPERNICUS/S2_SR') \
                    .filterBounds(point) \
                    .filterDate(start_date, end_date) \
                    .sort('CLOUDY_PIXEL_PERCENTAGE') \
                    .first()
                    
        # Calculate NDVI
        ndvi = collection.normalizedDifference(['B8', 'B4']).rename('NDVI')
        ndvi_value = ndvi.reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=point,
            scale=30
        ).get('NDVI')
        
        return ndvi_value.getInfo()
    except Exception as e:
        logger.error(f"Error fetching NDVI: {str(e)}")
        return None
        return None

def fetch_aqi_proxy(lat, lon, start_date, end_date):
    """
    Fetch Aerosol Optical Depth (AOD) from MODIS as a proxy for Air Quality Index
    """
    try:
        point = ee.Geometry.Point([lon, lat])
        
        # Filter MODIS aerosol collection
        collection = ee.ImageCollection('MODIS/006/MCD19A2_GRANULES') \
                    .filterBounds(point) \
                    .filterDate(start_date, end_date) \
                    .select('Optical_Depth_055') \
                    .median()
        
        aod_value = collection.reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=point,
            scale=1000
        ).get('Optical_Depth_055')
        
        return aod_value.getInfo()
    except Exception as e:
        logger.error(f"Error fetching AOD: {str(e)}")
        return None

def fetch_land_surface_temperature(lat, lon, start_date, end_date):
    """
    Fetch Land Surface Temperature from MODIS
    """
    try:
        point = ee.Geometry.Point([lon, lat])
        
        # Filter MODIS land surface temperature collection
        collection = ee.ImageCollection('MODIS/006/MOD11A1') \
                    .filterBounds(point) \
                    .filterDate(start_date, end_date) \
                    .select('LST_Day_1km') \
                    .median()
        
        # LST comes in Kelvin * 0.02, so we need to convert to Celsius
        lst_value = collection.reduceRegion(
            reducer=ee.Reducer.mean(), 
            geometry=point,
            scale=1000
        ).get('LST_Day_1km')
        
        # Convert to Celsius if value exists
        if lst_value is not None:
            lst_celsius = (lst_value.getInfo() * 0.02) - 273.15
            return lst_celsius
        return None
    except Exception as e:
        logger.error(f"Error fetching Land Surface Temperature: {str(e)}")
        return None

@run_in_executor
def process_environmental_data(lat, lon, start_date, end_date):
    """Process all environmental data synchronously"""
    # Fetch raw data from GEE
    ndvi = fetch_ndvi(lat, lon, start_date, end_date)
    aqi_proxy = fetch_aqi_proxy(lat, lon, start_date, end_date)
    lst = fetch_land_surface_temperature(lat, lon, start_date, end_date)
    
    # Prepare results dictionary with proper formatting
    results = {
        "coordinates": {
            "latitude": lat,
            "longitude": lon
        },
        "date_range": f"{start_date} to {end_date}",
        "environmental_parameters": {
            "ndvi": round(ndvi, 4) if ndvi is not None else None,
            "aqi_proxy": round(aqi_proxy, 4) if aqi_proxy is not None else None,
            "land_surface_temp_celsius": round(lst, 2) if lst is not None else None
        },
        "timestamp": datetime.datetime.now().isoformat()
    }
    
    # Clean data (handle invalid values)
    results = preprocessing.clean_satellite_data(results)
    
    # Add interpreted values for user-friendly output
    env_params = results["environmental_parameters"]
    results["interpretations"] = {
        "ndvi_category": preprocessing.interpret_ndvi(env_params.get("ndvi")),
        "aqi_category": preprocessing.interpret_aqi(env_params.get("aqi_proxy")),
        "ndvi_normalized": preprocessing.normalize_ndvi(env_params.get("ndvi"))
    }
    
    return results

async def fetch_environmental_data(lat, lon, start_date, end_date):
    """
    Fetch all environmental data for the given coordinates and date range
    """
    logger.info(f"Fetching environmental data for: Lat {lat}, Lon {lon}, Dates {start_date} to {end_date}")
    results = await process_environmental_data(lat, lon, start_date, end_date)
    
    # Prepare data for future ML model input (if needed)
    model_ready_data = preprocessing.prepare_data_for_model(results)
    logger.info("Data prepared for model input")
    
    return results