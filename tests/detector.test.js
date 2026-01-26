/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Load the detector script
const detectorScript = fs.readFileSync(path.join(__dirname, '../src/js/detector.js'), 'utf8');
eval(detectorScript);

describe('Advanced Phishing Detector URL Safety Checker', () => {
  test('should detect safe HTTPS URLs', () => {
    const result = checkUrlSafety('https://www.google.com');
    expect(result.safe).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  test('should detect insecure HTTP URLs', () => {
    const result = checkUrlSafety('http://example.com');
    expect(result.safe).toBe(false);
    expect(result.issues).toContain('Insecure protocol (not HTTPS)');
  });

  test('should detect IP-based domains', () => {
    const result = checkUrlSafety('https://192.168.1.1');
    expect(result.safe).toBe(false);
    expect(result.issues).toContain('Uses raw IP address');
  });

  test('should detect URL shorteners', () => {
    const result = checkUrlSafety('https://bit.ly/abc123');
    expect(result.safe).toBe(false);
    expect(result.issues).toContain('Uses URL shortener');
  });

  test('should detect suspicious keywords in domain', () => {
    const result = checkUrlSafety('https://login-secure-bank.com');
    expect(result.safe).toBe(false);
    expect(result.issues.some(issue => issue.includes('Suspicious keyword'))).toBe(true);
  });

  test('should handle invalid URLs', () => {
    const result = checkUrlSafety('not-a-url');
    expect(result.safe).toBe(false);
    expect(result.issues).toContain('Invalid URL format');
  });
});

describe('Advanced Phishing Detector HTML Content Analyzer', () => {
  test('should detect safe HTML content', () => {
    const safeHtml = '<html><body><h1>Hello World</h1></body></html>';
    const result = analyzeHtmlContent(safeHtml);
    expect(result.safe).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  test('should detect login forms', () => {
    const loginHtml = '<form><input type="password" name="pass"></form>';
    const result = analyzeHtmlContent(loginHtml);
    expect(result.safe).toBe(false);
    expect(result.issues).toContain('Contains login / password form');
  });

  test('should detect urgency phrases', () => {
    const urgentHtml = '<p>Your account will be suspended immediately!</p>';
    const result = analyzeHtmlContent(urgentHtml);
    expect(result.safe).toBe(false);
    expect(result.issues.some(issue => issue.includes('Urgency phrase'))).toBe(true);
  });

  test('should detect dangerous JavaScript patterns', () => {
    const dangerousHtml = '<script>eval("alert(1)")</script>';
    const result = analyzeHtmlContent(dangerousHtml);
    expect(result.safe).toBe(false);
    expect(result.issues).toContain('Potentially dangerous JavaScript patterns');
  });

  test('should detect excessive hidden fields', () => {
    const hiddenFieldsHtml = '<input type="hidden"><input type="hidden"><input type="hidden"><input type="hidden">';
    const result = analyzeHtmlContent(hiddenFieldsHtml);
    expect(result.safe).toBe(false);
    expect(result.issues.some(issue => issue.includes('Many hidden fields'))).toBe(true);
  });
});

describe('Advanced Phishing Detector Helper Functions', () => {
  test('should extract domain from URL', () => {
    expect(extractDomain('https://www.example.com/path')).toBe('www.example.com');
    expect(extractDomain('https://sub.example.com')).toBe('sub.example.com');
  });

  test('should handle invalid URLs in domain extraction', () => {
    expect(extractDomain('not-a-url')).toBe('');
  });

  test('should return correct icons for result types', () => {
    expect(getIcon('safe')).toBe('✓');
    expect(getIcon('warning')).toBe('⚠️');
    expect(getIcon('danger')).toBe('❗');
    expect(getIcon('error')).toBe('ℹ️');
  });
});