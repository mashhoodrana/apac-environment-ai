# Google Earth Engine Authentication PowerShell Script

Write-Host "===== Google Earth Engine Authentication Setup =====" -ForegroundColor Green

# Set the environment variable for Google Application Credentials
Write-Host "Setting environment variable GOOGLE_APPLICATION_CREDENTIALS..." -ForegroundColor Cyan
$env:GOOGLE_APPLICATION_CREDENTIALS = "C:\Users\pc\Downloads\envirolens-92dd28f73786.json"

# Also set it permanently for the user
[System.Environment]::SetEnvironmentVariable('GOOGLE_APPLICATION_CREDENTIALS', "C:\Users\pc\Downloads\envirolens-92dd28f73786.json", 'User')

Write-Host ""
Write-Host "Environment variable set to: $env:GOOGLE_APPLICATION_CREDENTIALS" -ForegroundColor Yellow
Write-Host ""

# Check if Earth Engine CLI is installed
try {
    $null = Get-Command earthengine -ErrorAction Stop
    Write-Host "Earth Engine CLI is installed." -ForegroundColor Green
} catch {
    Write-Host "ERROR: Earth Engine CLI not found." -ForegroundColor Red
    Write-Host "Please install the Earth Engine Python API with:" -ForegroundColor Yellow
    Write-Host "pip install earthengine-api" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

# Run the Earth Engine authentication command
Write-Host "Running Earth Engine authentication..." -ForegroundColor Cyan
Write-Host ""

try {
    earthengine authenticate --quiet
    Write-Host ""
    Write-Host "Authentication command completed." -ForegroundColor Green
} catch {
    Write-Host "Error during authentication: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "If authentication was successful, you should now have an access token." -ForegroundColor Green
Write-Host "The token is typically stored in your user profile directory at:" -ForegroundColor Yellow
Write-Host "$HOME\.config\earthengine\" -ForegroundColor Yellow
Write-Host ""
Write-Host "If you encounter any issues, please ensure that:" -ForegroundColor Cyan
Write-Host "1. The Earth Engine Python API is installed (pip install earthengine-api)" -ForegroundColor White
Write-Host "2. The service account has been properly set up with Earth Engine access" -ForegroundColor White
Write-Host "3. The JSON file path is correct" -ForegroundColor White
Write-Host ""

Write-Host "To use this authentication in your code, make sure to set the environment variable:" -ForegroundColor Magenta
Write-Host "$env:GOOGLE_APPLICATION_CREDENTIALS = \"C:\Users\pc\Downloads\envirolens-92dd28f73786.json\"" -ForegroundColor White
Write-Host ""

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")