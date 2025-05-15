# Deployment Guide for Environmental Analysis Platform

This guide provides step-by-step instructions for deploying the Environmental Analysis Platform to Google Cloud Platform.

## Prerequisites

Before you begin, ensure you have:

1. A Google Cloud Platform account with billing enabled
2. The Google Cloud SDK (`gcloud`) installed and configured on your local machine
3. A Google Earth Engine account with API access
4. A Google Gemini API key
5. Git installed on your local machine

## Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd environmental-analysis-platform
```

## Step 2: Set Up Google Cloud Project

### Create a new project (or use an existing one)

```bash
# Create a new project
gcloud projects create [PROJECT_ID] --name="Environmental Analysis Platform"

# Set the project as active
gcloud config set project [PROJECT_ID]

# Enable billing for the project (if not already enabled)
gcloud billing projects link [PROJECT_ID] --billing-account=[BILLING_ACCOUNT_ID]
```

### Enable required APIs

```bash
# Enable the APIs needed for the project
gcloud services enable appengine.googleapis.com
gcloud services enable storage-api.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable cloudresourcemanager.googleapis.com
```

## Step 3: Create a Cloud Storage Bucket

You need a Cloud Storage bucket for storing analysis results.

```bash
# Create a new storage bucket
gcloud storage buckets create gs://[BUCKET_NAME] --location=us-central1

# Optional: Set bucket permissions
gcloud storage buckets add-iam-policy-binding gs://[BUCKET_NAME] \
    --member=serviceAccount:[SERVICE_ACCOUNT_EMAIL] \
    --role=roles/storage.objectAdmin
```

## Step 4: Configure Environment Variables

Create a `.env.yaml` file for App Engine environment variables:

```yaml
GEMINI_API_KEY: "your_gemini_api_key"
GCP_BUCKET_NAME: "your_bucket_name"
EARTHENGINE_TOKEN: "your_earthengine_token"
```

## Step 5: Set Up Authentication for Earth Engine

The application needs to authenticate with Google Earth Engine. For App Engine deployment, you have two options:

### Option 1: Using a service account

1. Create a service account with appropriate permissions
2. Download the service account key JSON file
3. Upload it to a secure location in your Cloud Storage bucket
4. Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to this file

### Option 2: Using Earth Engine API key

1. Generate an Earth Engine API key from the Earth Engine dashboard
2. Add it to your `.env.yaml` file as `EARTHENGINE_TOKEN`

## Step 6: Deploy to App Engine

```bash
# Deploy the application to App Engine
gcloud app deploy app.yaml --env-vars-file .env.yaml
```

This will:
1. Build a container using the Dockerfile
2. Upload the container to Container Registry
3. Deploy the container to App Engine
4. Configure the specified environment variables

## Step 7: Verify the Deployment

```bash
# Open the deployed application in a browser
gcloud app browse
```

Verify that:
- The application loads correctly
- You can access the API endpoints
- Earth Engine integration is working
- The Gemini chatbot responds as expected

## Step 8: Set Up Continuous Deployment (Optional)

For continuous deployment using Cloud Build:

1. Connect your Git repository to Cloud Build:
   ```bash
   gcloud builds triggers create github \
     --repo=[REPOSITORY] \
     --branch-pattern=[BRANCH] \
     --build-config=cloudbuild.yaml
   ```

2. The provided `cloudbuild.yaml` will build and deploy automatically when changes are pushed to the specified branch.

## Troubleshooting

### Common Issues

1. **Earth Engine Authentication Errors**  
   Check the service account permissions and ensure it has access to Earth Engine.

2. **Gemini API Key Issues**  
   Verify the key is correctly specified in the environment variables.

3. **Storage Permission Errors**  
   Ensure the service account has appropriate permissions on the Cloud Storage bucket.

4. **App Engine Deployment Failures**  
   Check the build and deployment logs:
   ```bash
   gcloud app logs tail -s default
   ```

## Monitoring and Maintenance

### View Application Logs

```bash
# View logs from App Engine
gcloud app logs tail
```

### Monitor Performance

1. Go to the Google Cloud Console
2. Navigate to App Engine > Dashboard
3. Check the performance metrics and request logs

### Update the Application

To update the deployed application:

```bash
# Make your changes locally
git commit -am "Update description"

# Push changes (if using Cloud Build for automatic deployment)
git push

# Or manually deploy again
gcloud app deploy app.yaml --env-vars-file .env.yaml
```

## Cost Management

Monitor costs in the Google Cloud Console and consider:

1. Setting up budget alerts
2. Using App Engine's automatic scaling to control instance costs
3. Setting appropriate instance class in app.yaml based on your needs
4. Implementing cache mechanisms to reduce API calls to Earth Engine

## Security Considerations

1. Keep API keys and credentials secure
2. Use environment variables for sensitive information
3. Set appropriate IAM permissions
4. Configure CORS settings in production for API access

## Backup and Recovery

Regularly backup:
1. Configuration files
2. Environment variables
3. Important analysis data from Cloud Storage

## Scaling Up

As your application grows:
1. Adjust App Engine scaling parameters in app.yaml
2. Consider sharding data across multiple storage buckets
3. Implement caching for frequently requested data
4. Use Cloud CDN for static assets 