# Install Cloudflare Tunnel Service
# Run as Administrator

# ⚠️ SECURITY: This token is sensitive - do NOT commit to git!

param(
    [string]$Token = "eyJhIjoiZGRlMjQxOTI2MTc4MjJmZTA3ZjZkOTczN2E2Y2U3ZmUiLCJ0IjoiNDk5MDIzYWItMWZmZS00Y2VhLWJmY2EtZjQ2NjRkNGFiZjNlIiwicyI6Ik1HRXlaREJsWXpVdFpXSTJNUzAwWlRnd0xXRXlPVGt0TnpneFlXTTRaR1ZsWldVNSJ9"
)

Write-Host "🔐 Cloudflare Tunnel Service Installer" -ForegroundColor Cyan
Write-Host ""

# Check if running as admin
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] 'Administrator')) {
    Write-Host "❌ This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "Please right-click PowerShell and select 'Run as Administrator'"
    pause
    exit 1
}

# Check if cloudflared exists
if (-NOT (Test-Path ".\cloudflared.exe")) {
    Write-Host "❌ cloudflared.exe not found in current directory" -ForegroundColor Red
    Write-Host ""
    Write-Host "Download from: https://github.com/cloudflare/cloudflared/releases"
    Write-Host ""
    pause
    exit 1
}

Write-Host "✅ cloudflared.exe found"
Write-Host ""

# Install service
Write-Host "[1/3] Installing Cloudflare Tunnel service..."
.\cloudflared.exe service install $Token

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Service installed successfully" -ForegroundColor Green
    Write-Host ""

    # Start service
    Write-Host "[2/3] Starting service..."
    net start cloudflared

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Service started" -ForegroundColor Green
        Write-Host ""

        # Show status
        Write-Host "[3/3] Checking status..."
        Get-Service cloudflared | Select-Object Name, Status, StartType

        Write-Host ""
        Write-Host "✅ Cloudflare Tunnel is now running!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your website will be accessible at your configured domain"
        Write-Host ""
        Write-Host "Commands:"
        Write-Host "  net stop cloudflared      - Stop service"
        Write-Host "  net start cloudflared     - Start service"
        Write-Host "  Get-Service cloudflared   - Check status"
        Write-Host ""
    } else {
        Write-Host "❌ Failed to start service" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Failed to install service" -ForegroundColor Red
}

pause
