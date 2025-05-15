"""
Chatbot service using Google's Gemini API
"""
import os
import google.generativeai as genai
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up logging
logger = logging.getLogger(__name__)

# Configure the Gemini API
try:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    if not GEMINI_API_KEY:
        logger.warning("GEMINI_API_KEY not found in environment variables")
    else:
        genai.configure(api_key=GEMINI_API_KEY)
except Exception as e:
    logger.error(f"Error configuring Gemini API: {str(e)}")

async def get_environmental_insights(input_data, analysis_results):
    """
    Generate environmental insights using Gemini API based on the analysis results
    """
    try:
        if not GEMINI_API_KEY:
            return {"error": "Gemini API key not configured"}

        # Create a prompt with the environmental data
        prompt = f"""
        Analyze the following environmental data and provide insights in simple language:
        
        Location: {input_data.get('location_name', 'Unknown location')}
        Time period: {input_data.get('start_date')} to {input_data.get('end_date')}
        
        Data measurements:
        - NDVI (vegetation health): {analysis_results.get('ndvi', 'Not available')}
        - Land Surface Temperature: {analysis_results.get('temperature', 'Not available')} °C
        - Air Quality (AOD): {analysis_results.get('air_quality', 'Not available')}
        - Albedo (surface reflectivity): {analysis_results.get('albedo', 'Not available')}
        
        Please explain what these measurements indicate about the environmental conditions 
        in simple, easy-to-understand language. Include any potential concerns and positive aspects.
        Keep the explanation concise, under 250 words.
        """
        
        # Generate response from Gemini
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(prompt)
        
        return {
            "insights": response.text,
            "source": "Google Gemini AI"
        }
        
    except Exception as e:
        logger.error(f"Error generating environmental insights: {str(e)}")
        return {"error": f"Failed to generate insights: {str(e)}"}

async def chat_with_user(user_message, context=None):
    """
    Chat with the user about environmental topics using Gemini API
    """
    try:
        if not GEMINI_API_KEY:
            return {"error": "Gemini API key not configured"}
        
        # Create context for the model
        system_context = """
        You are an environmental expert assistant. Your role is to:
        1. Answer questions about environmental science, climate, and sustainability
        2. Explain environmental data and measurements
        3. Provide actionable advice for environmental conservation
        4. Be helpful, accurate, and educational in your responses
        
        Keep your answers concise, informative, and easy to understand.
        """
        
        context_prompt = ""
        if context:
            context_prompt = f"\nRecent analysis results: {context}"
            
        # Generate response from Gemini
        model = genai.GenerativeModel('gemini-pro')
        
        full_prompt = f"{system_context}{context_prompt}\n\nUser: {user_message}\nResponse:"
        response = model.generate_content(full_prompt)
        
        return {
            "response": response.text,
            "source": "Google Gemini AI"
        }
        
    except Exception as e:
        logger.error(f"Error in chat: {str(e)}")
        return {"error": f"Failed to generate response: {str(e)}"} 