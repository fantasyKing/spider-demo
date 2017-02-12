import Crawler from 'crawler';

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
  callback: (err, res, done) => {
    if (err) {
      console.log('Crawler.error', err);
      return done();
    }
    console.log('Crawler.success');
    const $ = res.$;
    // console.log($('div.picinfo b').text().trim().replace(/\n+|\t+/ig, ''));
    // const address = $('div.picinfo .loca').text().trim().replace(/\n+|\t+/ig, '');
    // console.log(address);
    // const companySiteArr = liEleArr.map(function each() {
    //   return $(this).attr('href');
    // }).get();
    // console.log(companySiteArr);
    // this.c.queue(companySiteArr);
    // console.log('liEleArr', productName);
    // console.log('address', address);
    // console.log($('div.des-more div:first-child').text().trim()
    // .replace(/\n+|\t+/ig, '')
    // .split('公司全称：')
    // .join(''));
    const companySite = $('div.link-line a.weblink').text().trim()
          .replace(/\n+|\t+/ig, '');
    console.log('companySite', companySite);
    return done();
  }
});

// c.queue('http://www.itjuzi.com/company/58667');

c.queue([{
  uri: 'http://www.itjuzi.com/company/15751'
  // proxy: 'http://127.0.0.1:1080'
}]);
