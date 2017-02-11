import Crawler from 'crawler';

const c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: (err, res, done) => {
    // if (err) {
    //   console.log(error);
    // } else {
    //   // const $ = res.$;
    //   // $ is Cheerio by default
    //   // a lean implementation of core jQuery designed specifically for the server
    //   // console.log($("title").text());
    // }
    if (err) {
      console.log('Crawler.error', err);
      return done();
    }
    console.log('Crawler.success');
    console.log(res);
    return done();
  }
});

c.queue('http://www.itjuzi.com/');
