# Advanced Phishing Detector Build Script
# This script builds the Advanced Phishing Detector application for distribution

Write-Host "🚀 Building Advanced Phishing Detector..." -ForegroundColor Green

# Clean dist directory
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
}

# Create dist directory
New-Item -ItemType Directory -Force -Path "dist" | Out-Null

# Copy source files
Copy-Item -Recurse "src" "dist/src"

# Copy main HTML file
Copy-Item "phishing-detector-standalone.html" "dist/index.html"

# Copy demo files (if they exist)
if (Test-Path "index.html") {
    Copy-Item "index.html" "dist/demo.html"
}

# Create a simple package.json for distribution
$distPackage = @{
    name = "advanced-phishing-detector"
    version = "1.0.0"
    description = "Advanced Phishing Detector"
    main = "index.html"
    author = "Amit Adhikari"
    license = "MIT"
} | ConvertTo-Json

$distPackage | Out-File -FilePath "dist/package.json" -Encoding UTF8

# Create a simple README for dist
$distReadme = "# Advanced Phishing Detector - Distribution Build

This is the built version of Advanced Phishing Detector.

## Usage

Open index.html in your web browser to use the phishing detector.

## Development

For development, see the main repository.
"

$distReadme | Out-File -FilePath "dist/README.md" -Encoding UTF8

Write-Host "Build completed successfully!" -ForegroundColor Green
Write-Host "Output directory: dist/" -ForegroundColor Cyan
Write-Host "To test: Open dist/index.html in your browser" -ForegroundColor Cyan