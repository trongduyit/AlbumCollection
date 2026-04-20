#!/bin/bash
# Quick start script for Hanoi Landing local development

echo "🌸 Hà Nội Dịu Dàng - Starting local server..."
echo ""

# Check if Python is available
if command -v python &> /dev/null; then
    echo "Starting Python HTTP server on port 8000..."
    echo "📱 Open your browser: http://localhost:8000"
    echo "Press Ctrl+C to stop"
    python -m http.server 8000

# Check if Node.js is available
elif command -v node &> /dev/null; then
    echo "Starting Node.js HTTP server..."
    echo "First time? Run: npm install"
    npm start

# Try Ruby
elif command -v ruby &> /dev/null; then
    echo "Starting Ruby HTTP server on port 8000..."
    echo "Open your browser: http://localhost:8000"
    ruby -run -ehttpd . -p8000

# Try PHP
elif command -v php &> /dev/null; then
    echo "Starting PHP built-in server on port 8000..."
    echo "Open your browser: http://localhost:8000"
    php -S localhost:8000

else
    echo "❌ No suitable server found."
    echo ""
    echo "Please install one of:"
    echo "  - Python 3: https://www.python.org/"
    echo "  - Node.js: https://nodejs.org/"
    echo "  - Ruby: https://www.ruby-lang.org/"
    echo "  - PHP: https://www.php.net/"
    echo ""
    echo "Or simply open index.html in your browser"
fi
