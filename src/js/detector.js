// ────────────────────────────────────────────────
// Advanced Phishing Detector
// Version: 1.0.0
// Author: Amit Adhikari
// Description: Client-side phishing detection tool
// ────────────────────────────────────────────────

// ────────────────────────────────────────────────
// Constants & Configuration
// ────────────────────────────────────────────────

const PHISHING_KEYWORDS = [
  'login', 'signin', 'account', 'verify', 'update', 'secure', 'banking',
  'paypal', 'amazon', 'office365', 'microsoft', 'chase', 'wellsfargo'
];

const URGENCY_PHRASES = [
  'urgent', 'immediate', 'action required', 'account will be suspended',
  'verify now', 'limited time', 'your account is on hold'
];

const COMMON_SHORTENERS = ['bit.ly','tinyurl.com','goo.gl','t.co','is.gd','ow.ly'];

// ────────────────────────────────────────────────
// DOM Elements
// ────────────────────────────────────────────────

const forms = {
  url:   document.getElementById('urlForm'),
  html:  document.getElementById('htmlForm'),
  fetch: document.getElementById('fetchForm')
};

const resultEl = document.getElementById('result');

// ────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────

function showForm(mode) {
  Object.values(forms).forEach(f => f.hidden = true);
  forms[mode].hidden = false;
  resultEl.hidden = true;

  document.querySelectorAll('.mode-tabs button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
}

function showResult(type, title, details = '') {
  resultEl.hidden = false;
  resultEl.className = `result ${type}`;
  resultEl.innerHTML = `
    <div style="font-size:1.15rem; font-weight:600; margin-bottom:8px;">
      <span class="result-icon">${getIcon(type)}</span>${title}
    </div>
    ${details ? `<div style="margin-top:12px;">${details}</div>` : ''}
  `;
}

function getIcon(type) {
  return type === 'safe'    ? '✓'   :
         type === 'warning' ? '⚠️'  :
         type === 'danger'  ? '❗'   : 'ℹ️';
}

function extractDomain(urlStr) {
  try {
    return new URL(urlStr).hostname.toLowerCase();
  } catch {
    return '';
  }
}

// ────────────────────────────────────────────────
// Core Detection Logic
// ────────────────────────────────────────────────

function checkUrlSafety(urlStr) {
  try {
    const url = new URL(urlStr);
    const hostname = url.hostname.toLowerCase();
    const domain = hostname.replace(/^www\./, '');

    const issues = [];

    if (url.protocol !== 'https:') {
      issues.push('Insecure protocol (not HTTPS)');
    }

    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
      issues.push('Uses raw IP address');
    }

    if (COMMON_SHORTENERS.some(s => hostname === s || hostname.endsWith('.' + s))) {
      issues.push('Uses URL shortener');
    }

    const subdomainCount = hostname.split('.').length - 1;
    if (subdomainCount > 3) {
      issues.push('Excessive subdomains');
    }

    if (domain.length < 5 || domain.length > 45) {
      issues.push('Unusual domain length');
    }

    for (const kw of PHISHING_KEYWORDS) {
      if (domain.includes(kw)) {
        issues.push(`Suspicious keyword in domain: ${kw}`);
        break;
      }
    }

    return {
      safe: issues.length === 0,
      suspicious: issues.length > 0 && issues.length <= 2,
      issues
    };
  } catch {
    return { safe: false, suspicious: false, issues: ['Invalid URL format'] };
  }
}

function analyzeHtmlContent(html) {
  const lower = html.toLowerCase();
  const issues = [];

  // Login form detection (improved)
  const formRegex = /<form[^>]*>[\s\S]*?<\/form>/gi;
  const forms = html.match(formRegex) || [];

  for (const form of forms) {
    const formLower = form.toLowerCase();
    if (formLower.includes('password') || formLower.includes('pass') ||
        formLower.includes('pwd') || formLower.includes('login') ||
        formLower.includes('signin') || formLower.includes('auth')) {
      issues.push('Contains login/authentication form');
      break;
    }
  }

  // Hidden fields abuse (improved threshold and detection)
  const hiddenInputs = html.match(/<input[^>]*type\s*=\s*["']hidden["'][^>]*>/gi) || [];
  if (hiddenInputs.length > 2) {
    issues.push(`Multiple hidden form fields detected (${hiddenInputs.length})`);
  }

  // Suspicious form actions
  const actionMatches = html.match(/action\s*=\s*["']([^"']*)["']/gi) || [];
  for (const match of actionMatches) {
    const action = match.toLowerCase();
    if (action.includes('http') && !action.includes(window.location.hostname.toLowerCase())) {
      issues.push('Form submits to external domain');
      break;
    }
  }

  // Dangerous JavaScript patterns (expanded)
  const dangerousJs = [
    /eval\s*\(/,
    /document\.write\s*\(/,
    /innerHTML\s*=.*\+/,
    /outerHTML\s*=/,
    /setTimeout\s*\(\s*["'][^"']*javascript:/,
    /setInterval\s*\(\s*["'][^"']*javascript:/,
    /Function\s*\(\s*["'],
    /atob\s*\(/,
    /btoa\s*\(/,
    /unescape\s*\(/,
    /decodeURIComponent\s*\(\s*atob/
  ];

  for (const pattern of dangerousJs) {
    if (pattern.test(html)) {
      issues.push('Potentially dangerous JavaScript patterns detected');
      break;
    }
  }

  // Obfuscated scripts (improved detection)
  const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const script of scripts) {
    const content = script.replace(/<script[^>]*>|<\/script>/gi, '').trim();
    // Check for very long lines (potential obfuscation)
    const lines = content.split('\n');
    if (lines.some(line => line.length > 500)) {
      issues.push('Potentially obfuscated JavaScript code detected');
      break;
    }
    // Check for excessive character repetition
    if (/(.)\1{10,}/.test(content)) {
      issues.push('Suspicious character repetition in JavaScript');
      break;
    }
  }

  // Urgency language (expanded list)
  const urgencyPatterns = [
    ...URGENCY_PHRASES,
    'act now', 'immediate action', 'time sensitive', 'expires soon',
    'limited offer', 'do not ignore', 'important notice', 'security alert',
    'account verification', 'payment required', 'suspension warning'
  ];

  for (const phrase of urgencyPatterns) {
    if (lower.includes(phrase)) {
      issues.push(`Urgency/pressure language: "${phrase}"`);
      break;
    }
  }

  // Brand impersonation (expanded)
  const brands = [
    'paypal', 'amazon', 'office', 'microsoft', 'chase', 'wells fargo',
    'bank of america', 'citibank', 'facebook', 'google', 'apple',
    'netflix', 'instagram', 'linkedin', 'twitter', 'yahoo'
  ];

  for (const brand of brands) {
    if (lower.includes(brand)) {
      // Check if it's actually the legitimate domain
      const domainPattern = new RegExp(`${brand.replace(/\s+/g, '')}\\.(com|net|org|edu)`, 'i');
      if (!domainPattern.test(html)) {
        issues.push(`Possible impersonation of: ${brand}`);
        break;
      }
    }
  }

  // Suspicious redirects
  const redirectPatterns = [
    /window\.location\s*=/,
    /location\.href\s*=.*http/,
    /document\.location\s*=/,
    /meta[^>]*http-equiv\s*=\s*["']refresh["']/i
  ];

  for (const pattern of redirectPatterns) {
    if (pattern.test(html)) {
      issues.push('Automatic redirects or location changes detected');
      break;
    }
  }

  // Fake security indicators
  if (lower.includes('secure') && lower.includes('🔒') && !lower.includes('https://')) {
    issues.push('Fake security indicators without HTTPS');
  }

  // Excessive external links (potential link farming)
  const externalLinks = html.match(/<a[^>]*href\s*=\s*["']https?:\/\/[^"']*["'][^>]*>/gi) || [];
  if (externalLinks.length > 10) {
    issues.push(`Excessive external links (${externalLinks.length}) - possible link farming`);
  }

  return {
    safe: issues.length === 0,
    issues,
    stats: {
      forms: forms.length,
      scripts: scripts.length,
      externalLinks: externalLinks.length,
      hiddenFields: hiddenInputs.length
    }
  };
}

async function fetchHtml(url) {
  // Try multiple CORS proxies for better reliability
  const proxies = [
    'https://api.allorigins.win/raw?url=',
    'https://cors-anywhere.herokuapp.com/',
    'https://thingproxy.freeboard.io/fetch/'
  ];

  let lastError;

  for (const proxy of proxies) {
    try {
      console.log(`Trying proxy: ${proxy}`);

      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(proxy + encodeURIComponent(url), {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();

      // Basic validation - check if we got actual HTML
      if (html.length < 50 || !html.includes('<')) {
        throw new Error('Invalid HTML response received');
      }

      console.log(`Successfully fetched ${html.length} characters from ${url}`);
      return html;

    } catch (error) {
      console.warn(`Proxy ${proxy} failed:`, error.message);
      lastError = error;
      continue;
    }
  }

  // If all proxies failed, provide helpful error message
  throw new Error(
    `Could not fetch webpage. This may be due to:\n` +
    `• CORS restrictions on the target site\n` +
    `• Network connectivity issues\n` +
    `• Site blocking automated requests\n\n` +
    `Try using "Paste HTML" mode instead by copying the page source manually.\n\n` +
    `Technical details: ${lastError?.message || 'All proxy services failed'}`
  );
}

// ────────────────────────────────────────────────
// Event Listeners
// ────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {
  // Tab switching
  document.querySelectorAll('.mode-tabs button').forEach(btn => {
    btn.addEventListener('click', () => showForm(btn.dataset.mode));
  });

  // URL form
  forms.url.addEventListener('submit', e => {
    e.preventDefault();
    const url = forms.url.querySelector('input').value.trim();
    const verdict = checkUrlSafety(url);

    if (!verdict.safe) {
      showResult(
        verdict.issues.some(i => i.includes('Invalid')) ? 'error' : 'danger',
        'Potentially dangerous URL',
        verdict.issues.map(i => `• ${i}`).join('\n')
      );
    } else {
      showResult('safe', 'This URL looks safe');
    }
  });

  // HTML paste form
  forms.html.addEventListener('submit', e => {
    e.preventDefault();
    const html = forms.html.querySelector('textarea').value.trim();
    if (!html) return;

    const analysis = analyzeHtmlContent(html);

    showResult(
      analysis.safe ? 'safe' : 'danger',
      analysis.safe ? 'No clear phishing indicators found' : 'Potential phishing content detected',
      analysis.safe ? '' : analysis.issues.map(i => `• ${i}`).join('\n')
    );
  });

  // Full fetch form
  forms.fetch.addEventListener('submit', async e => {
    e.preventDefault();
    const url = forms.fetch.querySelector('input').value.trim();
    const btn = forms.fetch.querySelector('button');
    const originalText = btn.textContent;

    // Validate URL
    if (!url) {
      showResult('error', 'URL Required', 'Please enter a valid URL to scan.');
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      showResult('error', 'Invalid URL', 'Please enter a valid URL starting with http:// or https://');
      return;
    }

    btn.disabled = true;
    btn.textContent = '🔍 Scanning…';
    showResult('warning', '🔍 Scanning webpage...', 'Fetching content and analyzing for phishing indicators. This may take a few seconds.');

    try {
      // Show progress updates
      const progressSteps = [
        '🔗 Checking URL safety...',
        '🌐 Fetching webpage content...',
        '🔬 Analyzing HTML structure...',
        '⚠️ Checking for suspicious patterns...',
        '📊 Generating security report...'
      ];

      let stepIndex = 0;
      const progressInterval = setInterval(() => {
        if (stepIndex < progressSteps.length) {
          showResult('warning', '🔍 Scanning webpage...', progressSteps[stepIndex]);
          stepIndex++;
        }
      }, 800);

      // Perform analysis
      const [urlVerdict, html] = await Promise.all([
        Promise.resolve(checkUrlSafety(url)),
        fetchHtml(url)
      ]);

      clearInterval(progressInterval);

      // Analyze content
      showResult('warning', '🔍 Scanning webpage...', '🔬 Analyzing HTML structure...');
      const contentVerdict = analyzeHtmlContent(html);

      // Prepare results
      let type = 'safe';
      let title = '✅ No phishing indicators detected';
      let details = `Successfully analyzed ${html.length.toLocaleString()} characters of HTML content.\n\n`;
      details += `📊 Content Statistics:\n`;
      details += `  • Forms: ${contentVerdict.stats.forms}\n`;
      details += `  • Scripts: ${contentVerdict.stats.scripts}\n`;
      details += `  • External Links: ${contentVerdict.stats.externalLinks}\n`;
      details += `  • Hidden Fields: ${contentVerdict.stats.hiddenFields}\n\n`;

      const allIssues = [];

      if (!urlVerdict.safe) {
        allIssues.push('🚨 URL Security Issues:');
        urlVerdict.issues.forEach(issue => allIssues.push(`  • ${issue}`));
        allIssues.push('');
      }

      if (!contentVerdict.safe) {
        allIssues.push('🚨 Content Security Issues:');
        contentVerdict.issues.forEach(issue => allIssues.push(`  • ${issue}`));
        allIssues.push('');
      }

      if (allIssues.length > 0) {
        type = 'danger';
        title = '🚨 Potential phishing detected!';
        details += allIssues.join('\n');
        details += '\n⚠️ Exercise caution when visiting this site.';
      } else {
        details += '✅ URL structure appears safe\n';
        details += '✅ Content analysis found no suspicious patterns\n';
        details += '✅ No urgent language or credential harvesting detected\n\n';
        details += 'ℹ️ Note: This analysis covers basic phishing indicators. Advanced threats may not be detected.';
      }

      showResult(type, title, details);

    } catch (err) {
      console.error('Full page scan error:', err);
      showResult('error', '❌ Scan Failed',
        `Could not complete the webpage scan.\n\n${err.message}\n\n` +
        '💡 Suggestions:\n' +
        '• Try "Paste HTML" mode by copying the page source manually\n' +
        '• Check if the website allows automated access\n' +
        '• Ensure the URL is accessible and not behind a login\n' +
        '• Some sites block CORS requests for security reasons'
      );
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });

  // Start with URL mode
  showForm('url');
});