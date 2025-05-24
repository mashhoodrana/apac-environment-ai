# Environmental Analysis Platform

A comprehensive platform for analyzing environmental conditions using satellite data, enhanced with AI-powered insights from Google's Gemini.

✅ Frontend and model completed.
⚠️ Backend is in development and will be deployed shortly.

## Overview

This project combines:
- Backend API built with FastAPI that processes satellite data from Google Earth Engine
- Frontend interface built with React that visualizes the environmental data
- AI-powered insights and chatbot using Google's Gemini API
- Cloud deployment on Google Cloud Platform

The platform provides analysis for:
- NDVI (Normalized Difference Vegetation Index) for vegetation health
- Land Surface Temperature for climate monitoring
- Estimated Albedo for surface reflectivity analysis

## Requirements

- Docker and Docker Compose (for local development)
- Google Earth Engine credentials
- Google Gemini API key
- Google Cloud Platform account (for deployment)
- Node.js 18+ (for local frontend development)
- Python 3.10+ (for local backend development)

## Running with Docker

The easiest way to run the entire application locally is using Docker Compose:

```bash
# Create a .env file with your API keys (see env.example)
cp env.example .env
# Edit the .env file with your actual credentials

# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

The application will be available at:
- Frontend: https://envirolens.web.app/

## Running locally for development

### Backend

```bash
# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Linux/MacOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create a .env file with your API keys (see env.example)
cp env.example .env
# Edit the .env file with your actual credentials

# Authenticate with Google Earth Engine (only needed once)
earthengine authenticate

# Run the API server
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

### Frontend

```bash
# Navigate to frontend directory
cd FrontEnd

# Install dependencies
npm install

# Run development server
npm start
```

The frontend will be available at http://localhost:3000

## API Endpoints

- `POST /api/analyze`: Analyze environmental data for a location
  - Request body:
    ```json
    {
      "latitude": 37.7749,
      "longitude": -122.4194,
      "start_date": "2023-01-01",
      "end_date": "2023-01-31",
      "location_name": "San Francisco, CA"
    }
    ```

- `POST /api/chat`: Chat with the environmental AI assistant
  - Request body:
    ```json
    {
      "message": "What does a high NDVI value indicate?",
      "context": {
        "recent_analysis": {...}  // Optional context from recent analysis
      }
    }
    ```

- `GET /health`: Health check endpoint
  - Response: `{"status": "healthy"}`

## Deploying to Google Cloud Platform

This project is configured for deployment to Google Cloud Platform using App Engine and Cloud Storage.

### Prerequisites

1. Google Cloud Platform account with billing enabled
2. gcloud CLI installed and configured
3. A Google Cloud Storage bucket created for data persistence
4. Gemini API key

### Deployment Steps

1. Create a Google Cloud Project

```bash
# Create a new project (or use an existing one)
gcloud projects create [PROJECT_ID] --name="Environmental Analysis Platform"

# Set the project as active
gcloud config set project [PROJECT_ID]
```

2. Create a Google Cloud Storage bucket

```bash
# Create a storage bucket for data persistence
gcloud storage buckets create gs://[BUCKET_NAME]
```

3. Enable required APIs

```bash
# Enable the required APIs
gcloud services enable appengine.googleapis.com
gcloud services enable storage-api.googleapis.com
```

4. Set up environment variables

```bash
# Create a .env.yaml file for App Engine environment variables
cp env.example .env.yaml
# Edit the file with your credentials, using the YAML format
```

5. Deploy the application

```bash
# Deploy to App Engine
gcloud app deploy app.yaml --env-vars-file .env.yaml
```

6. Open the application

```bash
gcloud app browse
```

### Continuous Deployment

For continuous deployment, consider setting up a Cloud Build trigger:

1. Connect your Git repository to Cloud Build
2. Create a cloudbuild.yaml file for the build configuration
3. Set up a trigger to deploy on commits to your main branch

## Project Structure

```
.
├── app/                    # Backend API
│   ├── main.py             # Main FastAPI application
│   ├── routes/             # API routes
│   ├── services/           # Service layer 
│   │   ├── gee_service.py  # Google Earth Engine service
│   │   ├── chatbot_service.py # Gemini AI service
│   │   └── cloud_storage.py # Google Cloud Storage service
│   └── utils/              # Utility functions
├── FrontEnd/               # React Frontend
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Main page components
│   │   ├── services/       # API client services
│   │   └── context/        # React context providers
│   ├── Dockerfile          # Frontend Docker config
│   └── nginx.conf          # Nginx configuration
├── docker-compose.yml      # Docker Compose config
├── Dockerfile              # Backend Docker config
├── app.yaml                # Google App Engine config
├── env.example             # Example environment variables
└── requirements.txt        # Python dependencies
```

## Earth Engine Data Sources

The platform uses the following satellite data sources:
- GOOGLE EARTH ENGINE 

## AI-Powered Insights

The platform leverages Google's Gemini API to provide:
1. Automated analysis of environmental data in simple, human-readable language
2. Interactive chatbot for answering environmental science questions
3. Explanations of complex environmental metrics in accessible terms

## License

MIT 
