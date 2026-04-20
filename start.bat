@echo off
REM Quick start script for Hanoi Landing local development (Windows)

echo.
echo ======================================
echo    🌸 Hà Nội Dịu Dàng
echo    Starting local development server
echo ======================================
echo.

REM Check Python first (most common)
where python >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo [✓] Python found - Starting HTTP server
    echo.
    echo 📱 Open your browser: http://localhost:8000
    echo 🔗 Press Ctrl+C to stop
    echo.
    python -m http.server 8000
    exit /b
)

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo [✓] Node.js found - Starting server
    echo.
    echo 📱 Open your browser: http://localhost:8080
    echo 🔗 Press Ctrl+C to stop
    echo.
    npm start
    exit /b
)

REM Check PHP
where php >nul 2>nul
if %ERRORLEVEL% == 0 (
    echo [✓] PHP found - Starting server
    echo.
    echo 📱 Open your browser: http://localhost:8000
    echo 🔗 Press Ctrl+C to stop
    echo.
    php -S localhost:8000
    exit /b
)

REM No server found
echo [✗] No suitable server found
echo.
echo Please install one of:
echo   • Python 3: https://www.python.org/
echo   • Node.js: https://nodejs.org/
echo   • PHP: https://www.php.net/
echo.
echo OR simply open index.html in your browser
echo.
pause
