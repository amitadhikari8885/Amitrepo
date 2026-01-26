A public repo for Amit Adhikari

## Projects

### Advanced Phishing URL Detector
A comprehensive web-based tool to detect potential phishing attempts through both URL analysis and webpage content scanning.

#### Features
- **URL Analysis Mode**:
  - Checks for HTTPS protocol
  - Detects IP addresses in URLs
  - Identifies suspicious keywords in domain names
  - Analyzes domain length and subdomain structure
  - Flags URL shortening services

- **Webpage Content Analysis Mode**:
  - Scans HTML for login forms and credential harvesting attempts
  - Detects hidden input fields and obfuscated JavaScript
  - Identifies urgency language and fake branding
  - Analyzes external links for suspicious destinations
  - Checks for insecure HTTP usage

- **Full Webpage Scan Mode**:
  - Automatically fetches complete webpage content from URL
  - Combines URL analysis with deep content inspection
  - Real-time scanning with loading indicators
  - Comprehensive threat detection across entire pages

#### Usage
1. Open `phishing-detector.html` in a web browser
2. Choose analysis mode:
   - **URL Analysis**: Quick URL-based checking
   - **Paste HTML**: Analyze copied webpage source code
   - **Full Webpage Scan**: Enter URL to automatically fetch and scan entire webpage
3. View detailed results with specific reasons for any detected threats

#### What Makes This Different
Unlike basic URL checkers, this tool performs comprehensive analysis including:
- **Automated webpage fetching** with CORS proxy integration
- **Deep content analysis** of HTML, scripts, and links
- **Multi-layered detection** combining URL and content-based heuristics
- **Real-time scanning** of live websites
- **Educational CEH tool** demonstrating advanced phishing detection techniques

#### Files
- `phishing-detector.html`: The main detector application
- `index.html`: Sample login page (for demonstration purposes)

### CEH Learning Plan
See `ceh-plan.yml` for the Certified Ethical Hacker preparation roadmap.
