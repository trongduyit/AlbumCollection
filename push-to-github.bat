@echo off
REM Push to GitHub script

echo.
echo ======================================
echo    🚀 Push to GitHub
echo ======================================
echo.

cd /d d:\hanoi-landing

REM Check git status
echo [1/4] Checking git status...
git status --short

echo.
echo [2/4] Ready to push to: https://github.com/trongduyit/hanoi-landing.git
echo.
echo Instructions:
echo  - If asked for credentials, use:
echo    Username: trongduyit
echo    Password: [Your Personal Access Token]
echo.
echo To create a Personal Access Token:
echo  1. GitHub Settings ^> Developer Settings ^> Personal Access Tokens
echo  2. Generate new token (classic)
echo  3. Scopes: repo, workflow, admin:repo_hook
echo  4. Copy and paste when prompted
echo.
pause

echo [3/4] Pushing to GitHub...
git push -u origin main

if %ERRORLEVEL% == 0 (
    echo.
    echo ======================================
    echo    ✅ Push successful!
    echo ======================================
    echo.
    echo View at: https://github.com/trongduyit/hanoi-landing
    echo.
) else (
    echo.
    echo ❌ Push failed!
    echo Check credentials and try again.
    echo.
)

pause
