import Crawler from 'crawler';

import spiderCompanyHire from './spiderCompanyHire';

export default new class {
  async spiderCompanyInfo(website) {
    // website = urlFormat(website);
    console.log('website', website);
    const result = [];
    return new Promise((resolve, reject) => {
      this.c = new Crawler({
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
        },
        maxRedirects: 100,
        jar: true,
        maxConnections: 3,
        // This will be called for each crawled page
        callback: async (err, res, done) => {
          if (err) {
            console.log('Crawler.error', err);
            done();
            return reject(err);
          }
          console.log('Crawler.success');
          const $ = res.$;
          const productName = $('div.picinfo b').text().trim()
          .replace(/\n+|\t+/ig, '');
          const address = $('div.picinfo .loca').text().trim()
          .replace(/\n+|\t+/ig, '');
          const companySite = $('div.link-line a.weblink').text().trim()
          .replace(/\n+|\t+/ig, '');
          const companyName = $('div.des-more div:first-child').text().trim()
          .replace(/\n+|\t+/ig, '')
          .split('公司全称：')
          .join('');
          const hireSite = await spiderCompanyHire.spiderHireSites(companySite);
          console.log('hireSite---->', hireSite);
          const obj = {
            productName,
            companyName,
            address,
            companySite,
            hireSite
          };
          done();
          result.push(obj);
          if (result.length === website.length) {
            return resolve(result);
          }
        }
      });
      this.c.queue(website);
    });
  }
};
