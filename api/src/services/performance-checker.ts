  import { load } from 'cheerio';
  import { Check, Issue } from '../types/audit.js';
  import { FetchResult } from './fetcher.js';

  export interface PerformanceMetrics {
    responseTime: number;
    htmlSize: number;
    hasGzip: boolean;
    hasCaching: boolean;
    requestCount: number; // Estimated from HTML analysis
  }

  export class PerformanceChecker {
    check(fetchResult: FetchResult): { checks: Check[], issues: Issue[], metrics:
  PerformanceMetrics } {
      const $ = load(fetchResult.html);
      const checks: Check[] = [];
      const issues: Issue[] = [];

      // Calculate metrics
      const metrics: PerformanceMetrics = {
        responseTime: fetchResult.responseTime,
        htmlSize: Math.round(Buffer.byteLength(fetchResult.html, 'utf8') / 1024), // KB
        hasGzip: this.hasCompression(fetchResult.headers),
        hasCaching: this.hasCacheHeaders(fetchResult.headers),
        requestCount: this.estimateRequestCount($),
      };

      // Check 1: Response Time
      const responseTimeCheck = this.checkResponseTime(metrics.responseTime);
      checks.push(responseTimeCheck);
      if (!responseTimeCheck.pass) {
        issues.push({
          id: 'perf-response-time',
          category: 'performance',
          severity: metrics.responseTime > 3000 ? 'high' : 'medium',
          title: 'Slow Response Time',
          description: `Server response time is ${metrics.responseTime}ms`,
          recommendation: 'Optimize server performance, use CDN, or upgrade hosting',
          selector: null,
        });
      }

      // Check 2: HTML Size
      const htmlSizeCheck = this.checkHtmlSize(metrics.htmlSize);
      checks.push(htmlSizeCheck);
      if (!htmlSizeCheck.pass) {
        issues.push({
          id: 'perf-html-size',
          category: 'performance',
          severity: metrics.htmlSize > 500 ? 'high' : 'medium',
          title: 'Large HTML Size',
          description: `HTML document is ${metrics.htmlSize}KB`,
          recommendation: 'Minimize HTML, remove unused code, compress content',
          selector: null,
        });
      }

      // Check 3: Compression
      const compressionCheck = this.checkCompression(metrics.hasGzip);
      checks.push(compressionCheck);
      if (!compressionCheck.pass) {
        issues.push({
          id: 'perf-no-compression',
          category: 'performance',
          severity: 'medium',
          title: 'No Content Compression',
          description: 'Server is not using gzip or brotli compression',
          recommendation: 'Enable gzip or brotli compression on your web server',
          selector: null,
        });
      }

      // Check 4: Caching Headers
      const cachingCheck = this.checkCaching(metrics.hasCaching);
      checks.push(cachingCheck);
      if (!cachingCheck.pass) {
        issues.push({
          id: 'perf-no-cache',
          category: 'performance',
          severity: 'low',
          title: 'No Cache Headers',
          description: 'Missing cache-control or expires headers',
          recommendation: 'Add appropriate cache headers for static resources',
          selector: null,
        });
      }

      return { checks, issues, metrics };
    }

    private checkResponseTime(responseTime: number): Check {
      return {
        id: 'response-time',
        pass: responseTime < 1000, // Under 1 second is good
        weight: 30,
      };
    }

    private checkHtmlSize(sizeKb: number): Check {
      return {
        id: 'html-size',
        pass: sizeKb < 100, // Under 100KB is good
        weight: 20,
      };
    }

    private checkCompression(hasCompression: boolean): Check {
      return {
        id: 'compression',
        pass: hasCompression,
        weight: 25,
      };
    }

    private checkCaching(hasCaching: boolean): Check {
      return {
        id: 'caching',
        pass: hasCaching,
        weight: 25,
      };
    }

    private hasCompression(headers: Record<string, string>): boolean {
      const encoding = headers['content-encoding']?.toLowerCase() || '';
      return encoding.includes('gzip') || encoding.includes('br') ||
  encoding.includes('deflate');
    }

    private hasCacheHeaders(headers: Record<string, string>): boolean {
      return !!(headers['cache-control'] || headers['expires'] || headers['etag']);
    }

    private estimateRequestCount($: any): number {
      // Count external resources in HTML
      const images = $('img[src]').length;
      const stylesheets = $('link[rel="stylesheet"]').length;
      const scripts = $('script[src]').length;
      const others = $('link[href]:not([rel="stylesheet"])').length;

      return 1 + images + stylesheets + scripts + others; // +1 for the HTML itself
    }
  }