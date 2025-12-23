
  import { load } from 'cheerio';
  import { Check, Issue } from '../types/audit.js';
  import { FetchResult } from './fetcher.js';

  export class SEOChecker {
    check(fetchResult: FetchResult): { checks: Check[], issues: Issue[] } {
      const $ = load(fetchResult.html);
      const checks: Check[] = [];
      const issues: Issue[] = [];

      // Check 1: Title Tag
      const titleCheck = this.checkTitle($);
      checks.push(titleCheck);
      if (!titleCheck.pass) {
        const title = $('title').text().trim();
        issues.push({
          id: 'seo-title',
          category: 'seo',
          severity: 'high',
          title: title ? 'Title Too Long/Short' : 'Missing Title Tag',
          description: title ?
            `Title tag is ${title.length} characters (should be 30-60)` :
            'No title tag found in document head',
          recommendation: title ?
            'Keep title between 30-60 characters for optimal search display' :
            'Add a descriptive title tag to the document head',
          selector: 'title',
        });
      }

      // Check 2: Meta Description
      const metaDescCheck = this.checkMetaDescription($);
      checks.push(metaDescCheck);
      if (!metaDescCheck.pass) {
        const metaDesc = $('meta[name="description"]').attr('content') || '';
        issues.push({
          id: 'seo-meta-description',
          category: 'seo',
          severity: 'high',
          title: metaDesc ? 'Meta Description Too Long/Short' : 'Missing Meta Description',
          description: metaDesc ?
            `Meta description is ${metaDesc.length} characters (should be 120-160)` :
            'No meta description found',
          recommendation: metaDesc ?
            'Keep meta description between 120-160 characters' :
            'Add a compelling meta description to improve click-through rates',
          selector: 'meta[name="description"]',
        });
      }

      // Check 3: H1 Tags
      const h1Check = this.checkH1Tags($);
      checks.push(h1Check);
      if (!h1Check.pass) {
        const h1Count = $('h1').length;
        issues.push({
          id: 'seo-h1',
          category: 'seo',
          severity: 'medium',
          title: h1Count === 0 ? 'Missing H1 Tag' : 'Multiple H1 Tags',
          description: h1Count === 0 ?
            'No H1 tag found on the page' :
            `Found ${h1Count} H1 tags (should be exactly 1)`,
          recommendation: h1Count === 0 ?
            'Add exactly one H1 tag that describes the main topic of the page' :
            'Use only one H1 tag per page, use H2-H6 for subheadings',
          selector: 'h1',
        });
      }

      // Check 4: Viewport Meta Tag
      const viewportCheck = this.checkViewport($);
      checks.push(viewportCheck);
      if (!viewportCheck.pass) {
        issues.push({
          id: 'seo-viewport',
          category: 'seo',
          severity: 'medium',
          title: 'Missing Viewport Meta Tag',
          description: 'No viewport meta tag found for mobile optimization',
          recommendation: 'Add <meta name="viewport" content="width=device-width, 
  initial-scale=1"> to the head',
          selector: 'meta[name="viewport"]',
        });
      }

      return { checks, issues };
    }

    private checkTitle($: any): Check {
      const title = $('title').text().trim();
      const isValid = title.length >= 30 && title.length <= 60 && title.length > 0;

      return {
        id: 'title-tag',
        pass: isValid,
        weight: 30,
      };
    }

    private checkMetaDescription($: any): Check {
      const metaDesc = $('meta[name="description"]').attr('content') || '';
      const isValid = metaDesc.length >= 120 && metaDesc.length <= 160;

      return {
        id: 'meta-description',
        pass: isValid,
        weight: 30,
      };
    }

    private checkH1Tags($: any): Check {
      const h1Count = $('h1').length;

      return {
        id: 'h1-tags',
        pass: h1Count === 1,
        weight: 20,
      };
    }

    private checkViewport($: any): Check {
      const hasViewport = $('meta[name="viewport"]').length > 0;

      return {
        id: 'viewport-meta',
        pass: hasViewport,
        weight: 20,
      };
    }
  }