@echo off
echo ===== Google Earth Engine Authentication Setup =====

:: Set the environment variable for Google Application Credentials
echo Setting environment variable GOOGLE_APPLICATION_CREDENTIALS...
setx GOOGLE_APPLICATION_CREDENTIALS "PATH"
set GOOGLE_APPLICATION_CREDENTIALS=PATH

echo.
echo Environment variable set to: %GOOGLE_APPLICATION_CREDENTIALS%
echo.

:: Check if Earth Engine CLI is installed
where earthengine >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Earth Engine CLI not found.
    echo Please install the Earth Engine Python API with:
    echo pip install earthengine-api
    echo.
    goto :end
)

:: Run the Earth Engine authentication command
echo Running Earth Engine authentication...
echo.
earthengine authenticate --quiet

echo.
echo If authentication was successful, you should now have an access token.
echo The token is typically stored in your user profile directory.
echo.
echo If you encounter any issues, please ensure that:
echo 1. The Earth Engine Python API is installed (pip install earthengine-api)
echo 2. The service account has been properly set up with Earth Engine access
echo 3. The JSON file path is correct

:end
echo.
pause
