#!/bin/bash

# Portfolio & Study Site Management Script
# Usage: ./manage.sh [command]

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Hun-Bot2 Site Manager${NC}"
    echo -e "${BLUE}================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

show_help() {
    print_header
    echo "Available commands:"
    echo ""
    echo "  ${GREEN}dev${NC}              - Start portfolio development server"
    echo "  ${GREEN}study${NC}            - Start study site development server"
    echo "  ${GREEN}both${NC}             - Start both sites simultaneously"
    echo ""
    echo "  ${GREEN}build${NC}            - Build portfolio"
    echo "  ${GREEN}build:study${NC}      - Build study site"
    echo "  ${GREEN}build:both${NC}       - Build both sites"
    echo ""
    echo "  ${GREEN}deploy${NC}           - Deploy portfolio"
    echo "  ${GREEN}deploy:study${NC}     - Deploy study site"
    echo "  ${GREEN}deploy:both${NC}      - Deploy both sites"
    echo ""
    echo "  ${GREEN}install${NC}          - Install portfolio dependencies"
    echo "  ${GREEN}install:study${NC}    - Install study dependencies"
    echo "  ${GREEN}install:both${NC}     - Install all dependencies"
    echo ""
    echo "  ${GREEN}clean${NC}            - Clean portfolio build files"
    echo "  ${GREEN}clean:study${NC}      - Clean study build files"
    echo "  ${GREEN}clean:both${NC}       - Clean all build files"
    echo ""
    echo "  ${GREEN}status${NC}           - Show status of both sites"
    echo "  ${GREEN}help${NC}             - Show this help message"
    echo ""
}

check_directory() {
    if [ ! -d "study" ]; then
        print_error "Study directory not found!"
        exit 1
    fi
}

show_status() {
    print_header
    
    echo -e "${BLUE}Portfolio:${NC}"
    if [ -d "node_modules" ]; then
        print_success "Dependencies installed"
    else
        print_error "Dependencies not installed"
    fi
    
    if [ -d "dist" ]; then
        print_success "Build exists"
    else
        print_info "No build found"
    fi
    
    echo ""
    echo -e "${BLUE}Study Site:${NC}"
    if [ -d "study/node_modules" ]; then
        print_success "Dependencies installed"
    else
        print_error "Dependencies not installed"
    fi
    
    if [ -d "study/build" ]; then
        print_success "Build exists"
    else
        print_info "No build found"
    fi
    
    echo ""
    echo -e "${BLUE}URLs:${NC}"
    echo "  Portfolio:  https://hun-bot2.github.io/"
    echo "  Study Site: https://hun-bot2.github.io/study/"
    echo ""
}

case "$1" in
    dev)
        print_info "Starting portfolio development server..."
        npm run dev
        ;;
    
    study)
        check_directory
        print_info "Starting study site development server..."
        cd study && npm start
        ;;
    
    both)
        print_info "Starting both sites..."
        print_info "Portfolio: http://localhost:5173"
        print_info "Study: http://localhost:3000/study/"
        
        # Open two terminal tabs if possible
        if command -v osascript &> /dev/null; then
            # macOS
            osascript -e 'tell application "Terminal" to do script "cd '"$PWD"' && npm run dev"'
            osascript -e 'tell application "Terminal" to do script "cd '"$PWD/study"' && npm start"'
        else
            print_error "Auto-opening terminals not supported on this OS"
            print_info "Open two terminals and run:"
            echo "  Terminal 1: npm run dev"
            echo "  Terminal 2: cd study && npm start"
        fi
        ;;
    
    build)
        print_info "Building portfolio..."
        npm run build
        print_success "Portfolio built!"
        ;;
    
    build:study)
        check_directory
        print_info "Building study site..."
        cd study && npm run build
        print_success "Study site built!"
        ;;
    
    build:both)
        print_info "Building both sites..."
        npm run build
        cd study && npm run build
        print_success "Both sites built!"
        ;;
    
    deploy)
        print_info "Deploying portfolio..."
        npm run deploy
        print_success "Portfolio deployed!"
        ;;
    
    deploy:study)
        check_directory
        print_info "Deploying study site..."
        cd study && npm run deploy
        print_success "Study site deployed!"
        ;;
    
    deploy:both)
        print_info "Deploying both sites..."
        npm run deploy
        cd study && npm run deploy
        print_success "Both sites deployed!"
        ;;
    
    install)
        print_info "Installing portfolio dependencies..."
        npm install
        print_success "Portfolio dependencies installed!"
        ;;
    
    install:study)
        check_directory
        print_info "Installing study dependencies..."
        cd study && npm install
        print_success "Study dependencies installed!"
        ;;
    
    install:both)
        print_info "Installing all dependencies..."
        npm install
        cd study && npm install
        print_success "All dependencies installed!"
        ;;
    
    clean)
        print_info "Cleaning portfolio build files..."
        rm -rf node_modules dist .vite
        print_success "Portfolio cleaned!"
        ;;
    
    clean:study)
        check_directory
        print_info "Cleaning study build files..."
        cd study && rm -rf node_modules build .docusaurus .cache-loader
        print_success "Study site cleaned!"
        ;;
    
    clean:both)
        print_info "Cleaning all build files..."
        rm -rf node_modules dist .vite
        cd study && rm -rf node_modules build .docusaurus .cache-loader
        print_success "All build files cleaned!"
        ;;
    
    status)
        show_status
        ;;
    
    help|--help|-h)
        show_help
        ;;
    
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
