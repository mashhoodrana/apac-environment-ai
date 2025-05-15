@echo off
ECHO Starting Environmental Analysis Platform...

REM Check for Docker
docker --version > nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    ECHO Docker is not installed. Please install Docker first.
    EXIT /B 1
)

REM Check for Docker Compose
docker-compose --version > nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    ECHO Docker Compose is not installed. Please install Docker Compose first.
    EXIT /B 1
)

REM Build and start the services
ECHO Building and starting services...
docker-compose up -d --build

REM Wait for a moment to ensure services are running
TIMEOUT /T 5 /NOBREAK > nul

REM Check if services are running
docker-compose ps | findstr "Up" > nul
IF %ERRORLEVEL% EQU 0 (
    ECHO Services are running!
    ECHO Access the application at: http://localhost
    ECHO Access the API at: http://localhost:8000
    ECHO API documentation available at: http://localhost:8000/docs
    ECHO.
    ECHO To view logs: docker-compose logs -f
    ECHO To stop the application: docker-compose down
) ELSE (
    ECHO There was an issue starting the services. Check the logs with: docker-compose logs
    EXIT /B 1
) 