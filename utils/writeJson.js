import jsonfile from 'jsonfile';

jsonfile.spaces = 2;

export default new class {
  write = async (file, json, options) => {
    return new Promise((resolve, reject) => {
      jsonfile.writeFile(file, json, options || { flag: 'a' }, (err) => {
        if (err) {
          console.log('write.json.error', err);
          return reject(err);
        }
        return resolve();
      });
    });
  }

  read = async (file) => {
    return new Promise((resolve, reject) => {
      jsonfile.readFile(file, (err, result) => {
        if (err) {
          console.log('write.json.error', err);
          return reject(err);
        }
        return resolve(result);
      });
    });
  }
};
