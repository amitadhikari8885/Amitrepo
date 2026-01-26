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

  // Login form smell
  if (/<form[^>]*>[\s\S]*?(password|pass|pwd|login|signin)/i.test(html)) {
    issues.push('Contains login / password form');
  }

  // Hidden fields abuse
  const hiddenCount = (html.match(/type\s*=\s*["']hidden["']/gi) || []).length;
  if (hiddenCount > 3) {
    issues.push(`Many hidden fields (${hiddenCount})`);
  }

  // Dangerous JS patterns
  if (/(eval\s*\(|document\.write\s*\(|innerHTML\s*=)/i.test(html)) {
    issues.push('Potentially dangerous JavaScript patterns');
  }

  // Obfuscation heuristic
  const scripts = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const script of scripts) {
    const content = script.replace(/<script[^>]*>|<\/script>/gi, '').trim();
    if (content.length > 1200 && !content.includes('function')) {
      issues.push('Large potentially obfuscated script');
      break;
    }
  }

  // Urgency language
  for (const phrase of URGENCY_PHRASES) {
    if (lower.includes(phrase)) {
      issues.push(`Urgency phrase: "${phrase}"`);
      break;
    }
  }

  // Brand impersonation (basic)
  const brands = ['paypal', 'amazon', 'office', 'microsoft365', 'chase', 'wells fargo'];
  for (const brand of brands) {
    if (lower.includes(brand) && !lower.includes(brand.replace(/\s/g, '') + '.com')) {
      issues.push(`Possible impersonation of: ${brand}`);
      break;
    }
  }

  return {
    safe: issues.length === 0,
    issues
  };
}

async function fetchHtml(url) {
  // In real production → use your own backend proxy
  // This is just a demo fallback using a public (unreliable) proxy
  const proxy = 'https://api.allorigins.win/raw?url=';
  const response = await fetch(proxy + encodeURIComponent(url));

  if (!response.ok) {
    throw new Error(`Fetch failed (${response.status})`);
  }

  return await response.text();
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

    btn.disabled = true;
    btn.textContent = 'Scanning…';
    showResult('warning', 'Scanning… Please wait');

    try {
      const [urlVerdict, html] = await Promise.all([
        Promise.resolve(checkUrlSafety(url)),
        fetchHtml(url)
      ]);

      const contentVerdict = analyzeHtmlContent(html);

      let type = 'safe';
      let title = 'No phishing indicators detected';
      let details = '';

      if (!urlVerdict.safe || !contentVerdict.safe) {
        type = 'danger';
        title = 'Potential phishing detected';
        details = [];

        if (!urlVerdict.safe) {
          details.push('URL issues:');
          details.push(...urlVerdict.issues.map(i => `  • ${i}`));
        }
        if (!contentVerdict.safe) {
          details.push('Content issues:');
          details.push(...contentVerdict.issues.map(i => `  • ${i}`));
        }
        details = details.join('\n');
      }

      showResult(type, title, details);
    } catch (err) {
      showResult('error', 'Could not complete scan', err.message + '\n\nTry "Paste HTML" mode instead.');
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });

  // Start with URL mode
  showForm('url');
});