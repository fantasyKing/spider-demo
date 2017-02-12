import test from 'ava';
import rq from 'request-promise';
import { writeJson } from './../utils';

test.skip('spider', async t => {
  const options = {
    method: 'GET',
    uri: 'https://www.itjuzi.com/',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
    },
    maxRedirects: 100,
    jar: true
  };
  try {
    const result = await rq(options);
    console.log('result', result);
    t.truthy(result);
  } catch (err) {
    console.log('err------>', err);
    t.falsy(false);
  }
});

test.skip('writeJson', async t => {
  try {
    const json = await writeJson.read('./companies.json');
    console.log('json', json);
    json.b = 'c';
    await writeJson.write('./companies.json', json, {});
    t.truthy(json);
  } catch (err) {
    console.log('err', err);
    t.falsy(false);
  }
});
