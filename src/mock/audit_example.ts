  import type { AuditResult } from '@/types/audit'

  export const mockAudit: AuditResult = {
    id: 'audit_123',
    url: 'https://example.com',
    createdAt: '2025-11-18T09:30:00Z',
    scores: {
      performance: 72,
      seo: 85,
      accessibility: 60,
      security: 40,
      overall: 64
    },
    metrics: {
      responseTimeMs: 950,
      htmlSizeKb: 120,
      requestCount: 34,
      usesHttps: true,
      hasGzip: true
    },
    checks: {
      performance: [
        { id: 'cache_headers', pass: true, weight: 0.2 },
        { id: 'gzip_enabled', pass: true, weight: 0.2 },
        { id: 'html_too_large', pass: false, weight: 0.2 },
        { id: 'response_time', pass: true, weight: 0.4 }
      ],
      seo: [
        { id: 'title_present', pass: true },
        { id: 'meta_description', pass: false },
        { id: 'h1_present', pass: true },
        { id: 'viewport_meta', pass: true }
      ],
      accessibility: [
        { id: 'images_with_alt', pass: false, failedCount: 14 },
        { id: 'form_labels', pass: true },
        { id: 'html_lang', pass: false }
      ],
      security: [
        { id: 'https_enabled', pass: true },
        { id: 'csp_header', pass: false },
        { id: 'hsts_header', pass: false },
        { id: 'xframe_options', pass: true }
      ]
    },
    issues: [
      {
        id: 'issue_1',
        category: 'seo',
        severity: 'high',
        title: 'Missing meta description',
        description: 'The page does not have a meta description tag.',
        recommendation: 'Add a <meta name="description"> tag with 50-160 characters describing the page content.',
        selector: null
      },
      {
        id: 'issue_2',
        category: 'accessibility',
        severity: 'medium',
        title: 'Images without alt attributes',
        description: '14 images on the page do not have alt attributes.',
        recommendation: 'Add descriptive alt text to all meaningful images.Use alt="" for decorative images.',
        selector: 'img:not([alt])'
      },
      {
        id: 'issue_3',
        category: 'security',
        severity: 'high',
        title: 'Missing Content Security Policy',
        description: 'The site does not have a Content-Security-Policy header.',
        recommendation: 'Implement a CSP header to prevent XSS attacks and data injection.',
        selector: null
      },
      {
        id: 'issue_4',
        category: 'performance',
        severity: 'medium',
        title: 'Large HTML size',
        description: 'The HTML document is 120KB, which may slow down initial page load.',
        recommendation: 'Minimize HTML, remove unused code, and consider server-side compression.',
        selector: null
      }
    ]
  }