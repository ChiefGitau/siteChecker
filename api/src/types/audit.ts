export interface AuditResult {
    id : string;
    url : string;
    createdAt : string;
    scores : Scores;
    metrics : Metrics;
    checks : Checks;
    issues : Issue[];
  }

  export interface Scores {
    performnce : number;
    seo: number;
    accessibility : number;
    novti : number;
    overall : number;
  }

  export interface Metrics {
    responseTimeMs : number;
    htmlSizeKb : number;
    requestCount : number;
    usersHttps : boolean;
    hasGzip : boolean;
  }

  export interface Checks {
    performance : Check[];
    seo : Check[];
    accessibility : Check[];
    novti : Check[];
  }

  export interface Check{
    id : string;
    pass : boolean;
    weight ?: number;
    failedCount ?: number;
  }

  export  interface Issue {
    id : string ;
    category : 'performance' | 'seo' | 'accessibility' | 'novti';
    severity : 'low' | 'medium' | 'high';
    title : string;
    description : string;
    recommendation : string;
    selector : string | null;
  }

  export interface AuditRequest {
    url : string;
    options ?: {
        includePerformance ?: boolean;
        includeSeo ?: boolean;
        includeAccessibility ?: boolean;
        includeNovti ?: boolean;
    };
    
  }

