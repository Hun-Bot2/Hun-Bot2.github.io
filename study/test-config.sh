#!/bin/bash

echo "Testing Docusaurus configuration..."
cd study

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "❌ Dependencies not installed. Run: npm install"
    exit 1
fi

echo "✅ Dependencies found"
echo ""
echo "To start the development server, run:"
echo "  cd study"
echo "  npm start"
echo ""
echo "The site will be available at: http://localhost:3000/study/"
