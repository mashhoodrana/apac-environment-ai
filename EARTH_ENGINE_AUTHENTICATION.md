# Google Earth Engine Authentication Guide

This guide explains how to authenticate with Google Earth Engine using your service account credentials.

## Prerequisites

- Earth Engine Python API installed (`pip install earthengine-api`)
- Service account JSON credentials file (already available at `C:\Users\pc\Downloads\envirolens-92dd28f73786.json`)

## Authentication Methods

### Method 1: Using the Batch Script (Recommended)

1. Run the provided batch script by double-clicking on `authenticate_earth_engine.bat`
2. The script will:
   - Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable
   - Run the Earth Engine authentication command
   - Check if the Earth Engine CLI is installed

### Method 2: Manual Authentication

If you prefer to authenticate manually, follow these steps:

1. Open Command Prompt (cmd)
2. Set the environment variable:
   ```
   set GOOGLE_APPLICATION_CREDENTIALS=C:\Users\pc\Downloads\envirolens-92dd28f73786.json
   ```
3. Run the authentication command:
   ```
   earthengine authenticate
   ```

### Method 3: Using PowerShell

1. Open PowerShell
2. Set the environment variable:
   ```powershell
   $env:GOOGLE_APPLICATION_CREDENTIALS = "C:\Users\pc\Downloads\envirolens-92dd28f73786.json"
   ```
3. Run the authentication command:
   ```powershell
   earthengine authenticate
   ```

## Verifying Authentication

To verify your authentication is working correctly:

1. Run the verification script:
   ```
   python verify_earth_engine.py
   ```
2. The script will check if:
   - Earth Engine API is installed
   - Credentials are properly set
   - Authentication is working
   - Display the location of your access token

## Troubleshooting

If you encounter issues:

1. Ensure the Earth Engine Python API is installed: `pip install earthengine-api`
2. Verify the service account has been properly set up with Earth Engine access
3. Check that the JSON file path is correct
4. Try running `earthengine authenticate --force` to force a new authentication

## Access Token Location

After successful authentication, your access token is typically stored in:
`C:\Users\[YourUsername]\.config\earthengine\`
