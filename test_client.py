import requests
import json
import argparse
from datetime import datetime, timedelta

def test_health():
    """Test the health endpoint"""
    response = requests.get("http://localhost:8000/health")
    print(f"Health Check Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
    print("-" * 50)

def test_analyze(latitude, longitude, location_name):
    """Test the analyze endpoint with provided coordinates"""
    # Default to the last 30 days for date range
    end_date = datetime.now().strftime("%Y-%m-%d")
    start_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
    
    # Prepare request data
    data = {
        "latitude": latitude,
        "longitude": longitude,
        "start_date": start_date,
        "end_date": end_date,
        "location_name": location_name
    }
    
    print(f"Analyzing coordinates: {latitude}, {longitude}")
    print(f"Location: {location_name}")
    print(f"Date range: {start_date} to {end_date}")
    print("Sending request...\n")
    
    # Send request
    response = requests.post("http://localhost:8000/api/analyze", json=data)
    
    # Print results
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(json.dumps(result, indent=2))
    else:
        print(f"Error: {response.text}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Test the Environmental Analysis API")
    parser.add_argument("--lat", type=float, default=33.7294, help="Latitude")
    parser.add_argument("--lon", type=float, default=73.0931, help="Longitude")
    parser.add_argument("--name", type=str, default="Margalla Hills", help="Location name")
    
    args = parser.parse_args()
    
    # Test health endpoint
    test_health()
    
    # Test analyze endpoint
    test_analyze(args.lat, args.lon, args.name) 