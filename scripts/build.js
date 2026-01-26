#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Building Advanced Phishing Detector...');

// Clean dist directory
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true, force: true });
}

// Create dist directory
fs.mkdirSync('dist', { recursive: true });

// Copy source files
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy assets
copyDir('src', 'dist/src');

// Copy main HTML file
fs.copyFileSync('phishing-detector.html', 'dist/index.html');

// Copy demo files
fs.copyFileSync('index.html', 'dist/demo.html');

// Create a simple package.json for distribution
const distPackage = {
  name: 'advanced-phishing-detector',
  version: '1.0.0',
  description: 'Advanced Phishing Detection Suite',
  main: 'index.html',
  author: 'Amit Adhikari',
  license: 'MIT'
};

fs.writeFileSync('dist/package.json', JSON.stringify(distPackage, null, 2));

// Create a simple README for dist
const distReadme = `# Advanced Phishing Detector - Distribution Build

This is the built version of Advanced Phishing Detector.

## Usage

Open \`index.html\` in your web browser to use the phishing detector.

## Development

For development, see the main repository.
`;

fs.writeFileSync('dist/README.md', distReadme);

console.log('✅ Build completed successfully!');
console.log('📁 Output directory: dist/');
console.log('🌐 To test: Open dist/index.html in your browser');