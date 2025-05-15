"""
Google Cloud Storage service for persisting data
"""
import os
import json
import logging
from google.cloud import storage
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up logging
logger = logging.getLogger(__name__)

# Configure Cloud Storage
try:
    BUCKET_NAME = os.getenv("GCP_BUCKET_NAME")
    if not BUCKET_NAME:
        logger.warning("GCP_BUCKET_NAME not found in environment variables")
except Exception as e:
    logger.error(f"Error configuring Cloud Storage: {str(e)}")

def get_storage_client():
    """Get a Google Cloud Storage client"""
    try:
        return storage.Client()
    except Exception as e:
        logger.error(f"Error creating storage client: {str(e)}")
        return None

async def save_analysis_results(location_id, results):
    """
    Save analysis results to Google Cloud Storage
    """
    try:
        if not BUCKET_NAME:
            logger.warning("Skipping storage: GCP_BUCKET_NAME not configured")
            return False
            
        client = get_storage_client()
        if not client:
            return False
            
        bucket = client.get_bucket(BUCKET_NAME)
        blob = bucket.blob(f"analysis_results/{location_id}.json")
        
        # Convert to JSON
        json_data = json.dumps(results)
        
        # Upload to GCS
        blob.upload_from_string(json_data, content_type="application/json")
        logger.info(f"Saved analysis results for {location_id} to Cloud Storage")
        
        return True
        
    except Exception as e:
        logger.error(f"Error saving results to Cloud Storage: {str(e)}")
        return False

async def get_analysis_results(location_id):
    """
    Retrieve analysis results from Google Cloud Storage
    """
    try:
        if not BUCKET_NAME:
            logger.warning("Skipping retrieval: GCP_BUCKET_NAME not configured")
            return None
            
        client = get_storage_client()
        if not client:
            return None
            
        bucket = client.get_bucket(BUCKET_NAME)
        blob = bucket.blob(f"analysis_results/{location_id}.json")
        
        if not blob.exists():
            logger.info(f"No saved results found for {location_id}")
            return None
            
        # Download from GCS
        json_data = blob.download_as_text()
        results = json.loads(json_data)
        
        logger.info(f"Retrieved analysis results for {location_id} from Cloud Storage")
        return results
        
    except Exception as e:
        logger.error(f"Error retrieving results from Cloud Storage: {str(e)}")
        return None 