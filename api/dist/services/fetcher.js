import fetch from 'node-fetch';
import { URL } from 'url';
export class WebFetcher {
    timeout = 10000; // 10 seconds
    maxSize = 5 * 1024 * 1024; // 5MB
    userAgent = 'SiteChecker/1.0 (+https://example.com/about)';
    async fetchSite(url) {
        const startTime = Date.now();
        // Validate URL
        let validUrl;
        try {
            validUrl = new URL(url);
            if (!['http:', 'https:'].includes(validUrl.protocol)) {
                throw new Error('Only HTTP and HTTPS URLs are supported');
            }
        }
        catch (error) {
            if (error instanceof Error)
                throw new Error(`Invalid URL: ${error.message}`);
            throw new Error('Invalid URL');
        }
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        try {
            const response = await fetch(validUrl.toString(), {
                method: 'GET',
                headers: {
                    'User-Agent': this.userAgent,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate',
                    'Cache-Control': 'no-cache',
                },
                signal: controller.signal,
                redirect: 'follow',
                size: this.maxSize,
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            // Check content type
            const contentType = response.headers.get('content-type') || '';
            if (!contentType.includes('text/html')) {
                throw new Error(`Expected HTML content, got: ${contentType}`);
            }
            const html = await response.text();
            const responseTime = Date.now() - startTime;
            // Convert headers to simple object
            const headers = {};
            response.headers.forEach((value, key) => {
                headers[key.toLowerCase()] = value;
            });
            return {
                html,
                headers,
                finalUrl: response.url,
                responseTime,
                statusCode: response.status,
            };
        }
        catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error(`Request timeout after ${this.timeout}ms`);
            }
            throw error;
        }
    }
}
