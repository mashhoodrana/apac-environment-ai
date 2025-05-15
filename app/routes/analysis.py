from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import logging
import hashlib
from ..services import gee_service, chatbot_service, cloud_storage, model_service

# Set up router
router = APIRouter(
    prefix="/api",
    tags=["analysis"],
    responses={404: {"description": "Not found"}},
)

logger = logging.getLogger(__name__)

# Define data models locally to avoid circular imports
class Coordinates(BaseModel):
    latitude: float
    longitude: float
    start_date: str
    end_date: str
    location_name: str = None
    include_predictions: bool = False

class ChatMessage(BaseModel):
    message: str
    context: dict = None

class PredictionRequest(BaseModel):
    location_id: str = None
    historical_data: dict = None

class ExplanationRequest(BaseModel):
    prediction_data: dict

def generate_location_id(data):
    """Generate a unique ID for a location query"""
    unique_string = f"{data.latitude}_{data.longitude}_{data.start_date}_{data.end_date}"
    return hashlib.md5(unique_string.encode()).hexdigest()

@router.post("/analyze")
async def analyze(data: Coordinates):
    """
    Analyze environmental parameters for the given coordinates
    """
    try:
        logger.info(f"Analyzing data for coordinates: Lat {data.latitude}, Lon {data.longitude}")
        
        # Generate a unique location ID
        location_id = generate_location_id(data)
        
        # Check if we have cached results
        cached_results = await cloud_storage.get_analysis_results(location_id)
        if cached_results:
            logger.info(f"Using cached results for {location_id}")
            if data.location_name:
                cached_results["location"] = data.location_name
                
            # Add predictions if requested and not already present
            if data.include_predictions and "ndvi_prediction" not in cached_results:
                prediction_results = await get_predictions_for_data(cached_results)
                cached_results.update(prediction_results)
                
                # Update cache with predictions
                await cloud_storage.save_analysis_results(location_id, cached_results)
                
            return cached_results
        
        # Get environmental data from Earth Engine
        results = await gee_service.fetch_environmental_data(
            data.latitude, 
            data.longitude, 
            data.start_date, 
            data.end_date
        )
        
        # Add location name if provided
        if data.location_name:
            results["location"] = data.location_name
        
        # Add AI-generated insights if possible
        input_data = {
            "location_name": data.location_name,
            "start_date": data.start_date,
            "end_date": data.end_date
        }
        insights = await chatbot_service.get_environmental_insights(input_data, results)
        results["ai_insights"] = insights
        
        # Add predictions if requested
        if data.include_predictions:
            prediction_results = await get_predictions_for_data(results)
            results.update(prediction_results)
        
        # Save results to cloud storage
        await cloud_storage.save_analysis_results(location_id, results)
        
        return results
    
    except Exception as e:
        logger.error(f"Error analyzing coordinates: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing analysis: {str(e)}")

async def get_predictions_for_data(analysis_results):
    """Helper function to get predictions based on analysis data"""
    try:
        # Extract historical data for model input
        historical_data = {
            "ndvi_values": analysis_results.get("ndvi_data", {}).get("values", []),
            "ndvi_dates": analysis_results.get("ndvi_data", {}).get("dates", []),
            "temperature_values": analysis_results.get("temperature_data", {}).get("values", []),
            "temperature_dates": analysis_results.get("temperature_data", {}).get("dates", []),
            "albedo_values": analysis_results.get("albedo_data", {}).get("values", []),
            "albedo_dates": analysis_results.get("albedo_data", {}).get("dates", []),
        }
        
        # Get predictions
        predictions = await model_service.predict_environmental_conditions(historical_data)
        
        # Get explanation
        explanation = await model_service.explain_prediction(predictions)
        predictions["explanation"] = explanation
        
        return predictions
    except Exception as e:
        logger.error(f"Error getting predictions: {str(e)}")
        return {"prediction_error": str(e)}

@router.post("/predict")
async def predict(data: PredictionRequest):
    """
    Generate predictions based on historical data
    """
    try:
        logger.info("Generating environmental predictions")
        
        if data.location_id:
            # Get data from storage
            cached_results = await cloud_storage.get_analysis_results(data.location_id)
            if not cached_results:
                raise HTTPException(status_code=404, detail="Location data not found")
            
            return await get_predictions_for_data(cached_results)
        elif data.historical_data:
            # Use provided historical data
            predictions = await model_service.predict_environmental_conditions(
                data.historical_data
            )
            
            # Get explanation
            explanation = await model_service.explain_prediction(predictions)
            predictions["explanation"] = explanation
            
            return predictions
        else:
            raise HTTPException(
                status_code=400, 
                detail="Either location_id or historical_data must be provided"
            )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error generating predictions: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating predictions: {str(e)}")

@router.post("/explain")
async def explain(data: ExplanationRequest):
    """
    Get human-readable explanation of predictions
    """
    try:
        logger.info("Generating explanation for predictions")
        explanation = await model_service.explain_prediction(data.prediction_data)
        return explanation
    
    except Exception as e:
        logger.error(f"Error generating explanation: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating explanation: {str(e)}")

@router.post("/chat")
async def chat(data: ChatMessage):
    """
    Chat with the AI about environmental topics
    """
    try:
        logger.info("Processing chat message")
        response = await chatbot_service.chat_with_user(data.message, data.context)
        return response
    
    except Exception as e:
        logger.error(f"Error in chat: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error in chat: {str(e)}") 