@echo off
REM Install Cloudflare Tunnel Service
REM Must be run as Administrator!

setlocal enabledelayedexpansion

cls
echo.
echo ======================================
echo    🔐 Cloudflare Tunnel Service
echo    Installation Script
echo ======================================
echo.

REM Check if running as admin
net session >nul 2>&1
if errorlevel 1 (
    echo ❌ This script must be run as Administrator!
    echo.
    echo Steps:
    echo  1. Right-click this file
    echo  2. Select "Run as administrator"
    echo.
    pause
    exit /b 1
)

echo ✅ Running with Administrator privileges
echo.

REM Download cloudflared if not exists
if not exist "cloudflared.exe" (
    echo ❌ cloudflared.exe not found!
    echo.
    echo Download from:
    echo https://github.com/cloudflare/cloudflared/releases
    echo.
    echo Then place cloudflared.exe in:
    echo %cd%
    echo.
    pause
    exit /b 1
)

echo ✅ cloudflared.exe found
echo.
echo [1/3] Installing Cloudflare Tunnel service...
echo.

cloudflared.exe service install eyJhIjoiZGRlMjQxOTI2MTc4MjJmZTA3ZjZkOTczN2E2Y2U3ZmUiLCJ0IjoiNDk5MDIzYWItMWZmZS00Y2VhLWJmY2EtZjQ2NjRkNGFiZjNlIiwicyI6Ik1HRXlaREJsWXpVdFpXSTJNUzAwWlRnd0xXRXlPVGt0TnpneFlXTTRaR1ZsWldVNSJ9

if %ERRORLEVEL% == 0 (
    echo.
    echo ✅ Service installed successfully
    echo.
    echo [2/3] Starting service...
    net start cloudflared

    if %ERRORLEVEL% == 0 (
        echo ✅ Service started
        echo.
        echo [3/3] Checking status...
        sc query cloudflared

        echo.
        echo ======================================
        echo    ✅ Cloudflare Tunnel is Running!
        echo ======================================
        echo.
        echo Your website is now accessible via your
        echo configured Cloudflare domain.
        echo.
        echo Commands:
        echo   net stop cloudflared   - Stop service
        echo   net start cloudflared  - Start service
        echo   sc query cloudflared   - Check status
        echo.
    ) else (
        echo ❌ Failed to start service
    )
) else (
    echo ❌ Failed to install service
)

pause
