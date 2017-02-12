import spiderCompanySites from './spiderCompanySites';
import spiderCompanyInfo from './spiderCompanyInfo';
import { writeJson, compute } from './utils/';

async function main() {
  process.on('SIGINT', () => {
    console.log('process exited...');
    console.log('compute', compute.getHireSiteNum());
    process.exit(0);
  });
  try {
    for (let i = 19; i <= 100; i++) {
      let destination = 'http://www.itjuzi.com/investevents';
      if (i > 2) {
        destination = `${destination}?page=${i}`;
      }
      const companySites = await spiderCompanySites.spiderCompanySites(destination);
      console.log('companySites----->', companySites);
      const companyinfo = await spiderCompanyInfo.spiderCompanyInfo(companySites);
      console.log('companyinfo----->', companyinfo);
      const json = await writeJson.read('./companies.json');
      json[`page${i}`] = companyinfo;
      await writeJson.write('./companies.json', json, {});
    }
    console.log('compute', compute.getHireSiteNum());
  } catch (err) {
    console.log('main.err--->', err);
  }
}

main();
