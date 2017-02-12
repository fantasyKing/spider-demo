import Crawler from 'crawler';
import { urlUtil } from './utils/';

const c = new Crawler({
  method: 'GET',
  headers: {
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    Cookie: 'grwng_uid=75cf1d6e-5292-48fc-92a9-24821ad7b0a9',
    Origin: 'http://www.itjuzi.com',
    Referer: 'http://www.itjuzi.com/company/58667',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
  },
  maxRedirects: 100,
  jar: true,
  maxConnections: 1,
  // This will be called for each crawled page
  callback: async (err, res, done) => {
    if (err) {
      console.log('Crawler.error', err);
      return done();
    }
    console.log('Crawler.success');
    const $ = res.$;
    const companySite = $('a');
    const site = companySite.filter(function filter() {
      return $(this).text().replace(/\n+|\t+/ig, '') === '加入我们';
    }).attr('href');
    console.log('companySite', urlUtil.complete(site, 'http://www.umiaowu.com/'));
    return done();
  }
});

// c.queue('http://www.itjuzi.com/company/58667');

c.queue([{
  uri: 'http://www.umiaowu.com'
  // proxy: 'http://127.0.0.1:1080'
}]);
