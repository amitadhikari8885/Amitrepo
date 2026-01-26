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

#### Usage
1. Open `phishing-detector.html` in a web browser
2. Choose analysis mode:
   - **URL Analysis**: Enter a URL and click "Check URL"
   - **Webpage Content Analysis**: Paste the HTML source of a suspicious page and click "Analyze Webpage"
3. View detailed results with specific reasons for any detected threats

#### What Makes This Different
Unlike basic URL checkers, this tool performs deep content analysis of webpage HTML to detect sophisticated phishing techniques including:
- Obfuscated malicious scripts
- Fake login forms
- Psychological manipulation through urgency
- Hidden data collection elements
- Suspicious external link patterns

#### Files
- `phishing-detector.html`: The main detector application
- `index.html`: Sample login page (for demonstration purposes)

### CEH Learning Plan
See `ceh-plan.yml` for the Certified Ethical Hacker preparation roadmap.
