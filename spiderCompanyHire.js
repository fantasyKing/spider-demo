import Crawler from 'crawler';

import { urlUtil, compute } from './utils';

export default new class {
  constructor() {
    this.c = new Crawler({
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
      },
      maxRedirects: 100,
      jar: true,
      maxConnections: 20,
      // This will be called for each crawled page
      callback: (err, res, done) => {
        if (err) {
          console.log('Crawler.error', err);
          return done();
        }
        console.log('Crawler.success');
        const $ = res.$;
        const liEleArr = $('i.cell.pic a');
        const companySiteArr = liEleArr.map(function each() {
          return $(this).attr('href');
        }).get();
        console.log(companySiteArr);
        this.c.queue(companySiteArr);
        return done();
      }
    });
  }

  async spiderHireSites(website) {
    return new Promise((resolve, reject) => {
      this.c.queue([{
        uri: website,
        callback: (err, res, done) => {
          if (err) {
            console.log('Crawler.error', err);
            done();
            return resolve('');
          }
          console.log('Crawler.success');
          try {
            const $ = res.$;
            const companySite = $('a');
            const site = companySite.filter(function filter() {
              return $(this).text().replace(/\n+|\t+/ig, '') === '加入我们';
            }).attr('href');
            const hireSite = urlUtil.complete(site, website);
            console.log('conpanySIte', website);
            console.log('companyHireSite', hireSite);
            if (hireSite) {
              compute.addHireSiteNum();
            }
            done();
            return resolve(hireSite);
          } catch (error) {
            console.log('err', error);
            done();
            return resolve('');
          }
        }
      }]);
    });
  }
};
