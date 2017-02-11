import Crawler from 'crawler';

const c = new Crawler({
  method: 'GET',
  uri: 'http://www.itjuzi.com/investevents',
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
    return done();
  }
});

c.queue('http://www.itjuzi.com/investevents');
