import { WebFetcher } from '../../dist/services/fetcher.js';

  async function testFetcher() {
    const fetcher = new WebFetcher();

    console.log('Testing fetcher with google.com...');

    try {
      const result = await fetcher.fetchSite('https://www.zeehondencentrum.nl/bezoek/?gad_source=1&gad_campaignid=765202524&gbraid=0AAAAADwJtOV3gCGTGjFYyitJvRufZxFai&gclid=CjwKCAiAmKnKBhBrEiwAaqAnZxKzgg-RUF4N5lIQWTwqvsNFoEtUa5ZcCyrOBG-1XLQiK6ITvYAp0xoC5KkQAvD_BwE');

      console.log('Success!');
      console.log(`Response time: ${result.responseTime}ms`);
      console.log(`HTML size: ${Math.round(result.html.length / 1024)}KB`);
      console.log(`Status code: ${result.statusCode}`);
      console.log(`Final URL: ${result.finalUrl}`);
      console.log(`Has gzip: ${result.headers['content-encoding']?.includes('gzip') || 
  false}`);
      console.log(`Content type: ${result.headers['content-type']}`);
      console.log(`HTML preview: ${result.html.substring(0, 200)}...`);

    } catch (error) {

      console.log('❌ Error:', error.message);
    }
  }

  testFetcher();