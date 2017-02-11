import test from 'ava';
import cy from './../index';

test('first', t => {
  try {
    
    t.truthy(true);
  } catch (err) {
    console.log('ava.error', err);
    t.falsy(false);
  }
});
