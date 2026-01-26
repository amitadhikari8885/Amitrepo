# Advanced Phishing Detector Build System
# Cross-platform build commands

.PHONY: help build clean dev test lint format install

# Default target
help:
	@echo "Advanced Phishing Detector Build System"
	@echo ""
	@echo "Available commands:"
	@echo "  build     - Build the application for distribution"
	@echo "  clean     - Clean build artifacts"
	@echo "  dev       - Start development server"
	@echo "  test      - Run tests"
	@echo "  lint      - Run linter"
	@echo "  format    - Format code"
	@echo "  install   - Install dependencies"
	@echo "  help      - Show this help message"

# Build the application
build:
	@echo "Building Advanced Phishing Detector..."
	@if [ -f "scripts/build.ps1" ]; then \
		powershell -ExecutionPolicy Bypass -File scripts/build.ps1; \
	elif [ -f "scripts/build.sh" ]; then \
		bash scripts/build.sh; \
	else \
		mkdir -p dist && cp -r src dist/ && cp phishing-detector.html dist/index.html; \
	fi
	@echo "Build completed!"

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf dist/
	rm -rf node_modules/
	@echo "Clean completed!"

# Start development server
dev:
	@echo "Starting development server..."
	@if command -v python3 >/dev/null 2>&1; then \
		cd dist && python3 -m http.server 8000; \
	elif command -v python >/dev/null 2>&1; then \
		cd dist && python -m http.server 8000; \
	else \
		echo "Python not found. Please install Python or use another server."; \
	fi

# Run tests
test:
	@echo "Running tests..."
	npm test

# Run linter
lint:
	@echo "Running linter..."
	npm run lint

# Format code
format:
	@echo "Formatting code..."
	npm run format

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install