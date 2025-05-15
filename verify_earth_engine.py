# Earth Engine Authentication Verification Script
import os
import sys

try:
    import ee
    print("Earth Engine Python API is installed.")
except ImportError:
    print("Earth Engine Python API is NOT installed. Please install with: pip install earthengine-api")
    sys.exit(1)

# Check if credentials are set
credentials_path = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
if not credentials_path:
    print("ERROR: GOOGLE_APPLICATION_CREDENTIALS environment variable is not set.")
    sys.exit(1)

print(f"\nGOOGLE_APPLICATION_CREDENTIALS is set to: {credentials_path}")

# Check if the credentials file exists
if not os.path.exists(credentials_path):
    print(f"ERROR: Credentials file not found at: {credentials_path}")
    sys.exit(1)

print(f"Credentials file exists at: {credentials_path}")

# Try to initialize Earth Engine
try:
    ee.Initialize()
    print("\nEarth Engine initialized successfully!")
    print("Your authentication is working correctly.")
    
    # Get the path to the credentials directory
    home_dir = os.path.expanduser("~")
    ee_credentials_dir = os.path.join(home_dir, '.config', 'earthengine')
    
    if os.path.exists(ee_credentials_dir):
        print(f"\nEarth Engine credentials directory: {ee_credentials_dir}")
        credentials_files = os.listdir(ee_credentials_dir)
        if credentials_files:
            print("Found the following credential files:")
            for file in credentials_files:
                print(f"  - {file}")
        else:
            print("No credential files found in the Earth Engine directory.")
    else:
        print(f"\nEarth Engine credentials directory not found at: {ee_credentials_dir}")
        
except Exception as e:
    print(f"\nERROR initializing Earth Engine: {str(e)}")
    print("\nPossible solutions:")
    print("1. Make sure your service account has Earth Engine access")
    print("2. Run 'earthengine authenticate' to get a new token")
    print("3. Check if your credentials file is valid")