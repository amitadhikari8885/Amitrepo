# 🔒 Advanced Phishing Detector

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Standalone](https://img.shields.io/badge/Type-Standalone%20HTML-blue.svg)](https://en.wikipedia.org/wiki/HTML)
[![Browser](https://img.shields.io/badge/Browser-Compatible-green.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-None-orange.svg)]
[![Offline](https://img.shields.io/badge/Works-Offline-purple.svg)]

> **Revolutionizing phishing detection through intelligent, multi-layered analysis**

Welcome to **Advanced Phishing Detector** - a cutting-edge cybersecurity tool designed to combat sophisticated phishing attacks. Built for ethical hackers, security researchers, and cybersecurity enthusiasts.

---

## 🎯 How It Works

### Project Overview

```
╔════════════════════════════════════════════════════════════════╗
║                  PHISHING DETECTION SYSTEM                    ║
║                                                                ║
║  Your suspicious content comes in from three entry points    ║
║           and gets analyzed by our smart engine               ║
╚════════════════════════════════════════════════════════════════╝

                         ┌─────────────────┐
                         │   USER INPUT    │
                         └────────┬────────┘
                                  │
                 ┌────────────────┼────────────────┐
                 │                │                │
          ┌──────▼──────┐  ┌──────▼──────┐  ┌─────▼──────┐
          │    URL      │  │    HTML     │  │  WEBPAGE   │
          │   CHECK     │  │   PASTE     │  │   FETCH    │
          └──────┬──────┘  └──────┬──────┘  └─────┬──────┘
                 │                │                │
                 └────────────────┼────────────────┘
                                  │
                         ┌────────▼─────────┐
                         │ DETECTION ENGINE │
                         │                  │
                         │ • Scan patterns  │
                         │ • Check security │
                         │ • Calculate risk │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
              ┌─────▼────┐             ┌───────▼──────┐
              │   SAFE   │             │    DANGER    │
              │    ✓ OK  │             │     ❗ WARNING│
              └──────────┘             └──────────────┘
```

---

## 📋 Three Analysis Modes Explained

### Mode 1: 🔗 URL Check
```
╔══════════════════════════════════════════╗
║           URL CHECK MODE                 ║
║                                          ║
║  Input:  https://secure-bank-login.com   ║
║                                          ║
║  Checks:                                 ║
║  ✓ Is it using HTTPS?                   ║
║  ✓ Domain looks legitimate?              ║
║  ✓ Any suspicious IP addresses?          ║
║  ✓ Too many subdomains?                  ║
║  ✓ URL shortener detected?               ║
║                                          ║
║  Output: Safe / Warning / Danger         ║
╚══════════════════════════════════════════╝
```

**Best for:** Quick security checks, browser safety warnings

---

### Mode 2: 📄 HTML Paste
```
╔══════════════════════════════════════════╗
║         HTML PASTE MODE                  ║
║                                          ║
║  Step 1: Copy HTML source               ║
║  Step 2: Paste into text area            ║
║  Step 3: Analyze                         ║
║                                          ║
║  Scans for:                              ║
║  ✓ Suspicious login forms                ║
║  ✓ Dangerous JavaScript code             ║
║  ✓ Credential harvesting                 ║
║  ✓ Urgency/pressure tactics              ║
║  ✓ Brand impersonation                   ║
║  ✓ Obfuscated code                       ║
║  ✓ Fake security indicators              ║
║                                          ║
║  Output: Detailed threat report          ║
╚══════════════════════════════════════════╝
```

**Best for:** Analyzing suspicious emails, webpage inspection

---

### Mode 3: 🌐 Full Page Scan
```
╔══════════════════════════════════════════╗
║       FULL PAGE SCAN MODE                ║
║                                          ║
║  Input: https://suspicious-site.com      ║
║                                          ║
║  Process:                                ║
║  1. Fetch entire webpage                 ║
║  2. Run URL analysis                     ║
║  3. Run HTML analysis                    ║
║  4. Calculate combined risk              ║
║  5. Generate detailed report             ║
║                                          ║
║  Output: Comprehensive assessment        ║
║          with combined findings          ║
╚══════════════════════════════════════════╝
```

**Best for:** Complete security assessment, automated scanning

---

## ✨ Key Features

### 🎯 Smart Detection System

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  CREDENTIAL HARVESTING              URGENCY TACTICS     │
│  ┌──────────────────┐              ┌──────────────┐    │
│  │ Login + Password │    DETECTS    │  "Act now!"  │    │
│  │ + Form Action    │ ─────────────▶│  "Limited    │    │
│  │ + Hidden Fields  │              │   time"      │    │
│  └──────────────────┘              └──────────────┘    │
│                                                         │
│  DANGEROUS JAVASCRIPT               BRAND FAKE          │
│  ┌──────────────────┐              ┌──────────────┐    │
│  │ eval() function  │    DETECTS    │ PayPal look │    │
│  │ Code execution   │ ─────────────▶│ alike on    │    │
│  │ Obfuscated code  │              │ random IP   │    │
│  └──────────────────┘              └──────────────┘    │
│                                                         │
│  Security Score: Risk Level 0-10                       │
│  ▯▯▯▯▯▯▯▯▯▯  Safe    Confidence: 95%+                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Detection Flow

```
INPUT
  │
  ├─► URL VALIDATION
  │   └─► Protocol (HTTP vs HTTPS)
  │   └─► Domain structure
  │   └─► IP address check
  │   └─► Shortener detection
  │   └─► Subdomain analysis
  │
  ├─► HTML SCANNING
  │   └─► Form detection
  │   └─► Password fields
  │   └─► External links
  │   └─► Scripts & code
  │   └─► Hidden fields
  │
  ├─► PATTERN MATCHING
  │   └─► Phishing keywords
  │   └─► Urgency phrases
  │   └─► Brand names
  │   └─► Suspicious patterns
  │
  ├─► RISK SCORING (0-10)
  │   └─► Single issue = 1 point
  │   └─► Multiple issues = 2-3 points
  │   └─► Combined threats = higher scores
  │
  └─► FINAL VERDICT
      ├─► SAFE (0-1): ✓ All clear
      ├─► WARNING (2-4): ⚠️ Be cautious
      └─► DANGER (5+): ❗ High risk
```

---

## 🏆 Why Choose Advanced Phishing Detector?

### Comparison Matrix

```
┌────────────────────┬──────┬───────┬───────────────────┐
│ Feature            │ Ours │ Other │ Web Services      │
├────────────────────┼──────┼───────┼───────────────────┤
│ Works Offline      │  ✓   │  ✗    │  ✗               │
│ No Installation    │  ✓   │  ✗    │  ✓               │
│ Privacy (Local)    │  ✓   │  ✗    │  ✗               │
│ Free              │  ✓   │  ~    │  ~               │
│ Multi-mode        │  ✓   │  ~    │  ~               │
│ Fast              │  ✓   │  ✗    │  ✓               │
│ Reliable          │  ✓   │  ✓    │  ✓               │
└────────────────────┴──────┴───────┴───────────────────┘

Legend: ✓ = Yes  ✗ = No  ~ = Limited
```

---

## 🚀 Quick Start

### Option 1: Direct Browser Open (Easiest)
```bash
1. Download: phishing-detector-standalone.html
2. Double-click the file
3. It opens in your browser
4. Start detecting!
```

### Option 2: From GitHub
```bash
1. Visit the repository
2. Open phishing-detector-standalone.html
3. Click "Open in browser" or download and open locally
```

### Option 3: Development Setup
```bash
# Clone repository
git clone https://github.com/amitadhikari8885/Amitrepo.git

# Install dependencies
npm install

# Run tests
npm test

# Build distribution
npm run build
```

---

## 📊 Technical Architecture

```
ADVANCED PHISHING DETECTOR ARCHITECTURE

┌─────────────────────────────────────────────────────────┐
│                   BROWSER (Client-Side)                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌────────────────────────────────────────────────┐   │
│  │           UI/UX LAYER (HTML + CSS)             │   │
│  │  • Tab interface (URL/HTML/Fetch)              │   │
│  │  • Real-time status indicators                 │   │
│  │  • Color-coded results (Safe/Warning/Danger)   │   │
│  │  • Responsive design                           │   │
│  └────────────────────────────────────────────────┘   │
│                         ▲                               │
│                         │                               │
│  ┌────────────────────────────────────────────────┐   │
│  │         DETECTION ENGINE (JavaScript)          │   │
│  │  • URL validation & pattern matching            │   │
│  │  • HTML parsing & form detection                │   │
│  │  • Phishing keyword scanning                    │   │
│  │  • Risk scoring algorithm                       │   │
│  │  • CORS proxy handling                          │   │
│  └────────────────────────────────────────────────┘   │
│                         ▲                               │
│                         │                               │
│  ┌────────────────────────────────────────────────┐   │
│  │      PROXY & FETCH LAYER (Multiple sources)    │   │
│  │  • Direct fetch (if allowed)                   │   │
│  │  • Multiple CORS proxies (fallback)            │   │
│  │  • Timeout handling & retry logic               │   │
│  └────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘

KEY: Everything runs locally - No server needed!
```

---

## 🛠️ Project Structure

```
Amitrepo/
├── 📄 phishing-detector-standalone.html  ← Main file (all-in-one)
├── 📁 src/
│   ├── 📁 assets/                       (Empty - for future assets)
│   ├── 📁 css/
│   │   └── styles.css                   (Legacy styles)
│   └── 📁 js/
│       └── detector.js                  (Legacy detector logic)
├── 📁 scripts/
│   ├── build.js                         (Build automation)
│   └── build.ps1                        (PowerShell build)
├── 📁 tests/
│   └── detector.test.js                 (Test suite)
├── 📁 dist/                             (Built distribution)
│   └── index.html                       (Standalone version)
├── package.json                         (Dependencies & scripts)
├── jest.config.js                       (Test config)
├── eslint.config.js                     (Linting rules)
├── README.md                            (Documentation)
└── LICENSE                              (MIT)
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

---

## 📚 Learning Resources

### Understanding Phishing
- **URL Analysis**: Learn what makes URLs suspicious
- **HTML Forms**: Understand credential harvesting tactics
- **JavaScript Threats**: Recognize dangerous code patterns
- **Social Engineering**: Learn pressure tactics and urgency phrases

### Security Best Practices
✓ Always verify URLs before clicking  
✓ Check sender email addresses carefully  
✓ Look for HTTPS and valid certificates  
✓ Hover over links to see real destinations  
✓ Never enter credentials on suspicious sites  
✓ Use strong, unique passwords  
✓ Enable two-factor authentication  

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your improvements
4. **Test** thoroughly
5. **Submit** a pull request

### Areas for Contribution
- Additional detection patterns
- Performance optimizations
- UI/UX improvements
- Documentation enhancements
- Test coverage expansion
- Proxy service updates

---

## 📜 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) for details.

**You are free to:**
- Use for any purpose
- Modify and distribute
- Use commercially
- Use privately

**You must:**
- Include license and copyright notice

---

## ⚠️ Disclaimer

**Important Legal Notice:**

This tool is designed for **educational and authorized security testing only**. Users are responsible for:

- Obtaining proper authorization before testing
- Complying with applicable laws and regulations
- Using the tool ethically and legally
- Not accessing systems without permission

⚖️ **Unauthorized access to computer systems is illegal.**

The developers assume no liability for misuse or damage caused by this tool.

---

## 🎓 Educational Purpose

This project serves as an excellent learning resource for:

- **Cybersecurity students** learning phishing detection
- **Security researchers** studying attack patterns
- **Developers** building security tools
- **Ethical hackers** practicing analysis techniques
- **Business analysts** understanding security threats

---

## 🔮 Future Enhancements

Planned features for upcoming versions:

```
v2.0 Roadmap:
┌─────────────────────────────────────┐
│ ✓ Multi-language support           │
│ ✓ Custom detection rules            │
│ ✓ Real-time threat database         │
│ ✓ Email attachment scanning         │
│ ✓ QR code analysis                  │
│ ✓ Screenshot comparison             │
│ ✓ Machine learning patterns         │
│ ✓ Dark mode UI                      │
│ ✓ API wrapper                       │
│ ✓ Chrome/Firefox extensions         │
└─────────────────────────────────────┘
```

---

## 📞 Contact & Support

**Author:** Amit Adhikari  
**Email:** adhikariamit208@gmail.com  
**GitHub:** [@amitadhikari8885](https://github.com/amitadhikari8885)  
**Repository:** [Amitrepo](https://github.com/amitadhikari8885/Amitrepo)

---

## 🙏 Acknowledgments

- Security research community
- Open source contributors
- OWASP for security guidelines
- Mozilla for web security resources
- All users and testers

---

**Stay Safe Online! 🔒**

*Last Updated: January 2026*
