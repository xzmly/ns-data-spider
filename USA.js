const superagent = require('superagent');

const USAGAMEHTMLURL = 'https://www.nintendo.com/games/game-guide/?pv=true'; //页面url
const USAGAMEURL = 'https://u3b6gr4ua3-dsn.algolia.net/1/indexes/*/queries';

const Referer = "https://www.nintendo.com/games/game-guide/?pv=true";

async function requestUSATarget(limit = 250,page = 0,data = [], url = USAGAMEURL, referer = Referer) {
  const formData = {
    requests: [{
      indexName: "noa_aem_game_en_us",
      params: `query=&hitsPerPage=${limit}&maxValuesPerFacet=30&page=${page}&facets=%5B%22generalFilters%22%2C%22platform%22%2C%22availability%22%2C%22categories%22%2C%22filterShops%22%2C%22virtualConsole%22%2C%22characters%22%2C%22priceRange%22%2C%22esrb%22%2C%22filterPlayers%22%5D&tagFilters=`
    }]
  };
  let total = 0;
  await superagent.post(url)
      .set({
        accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "content-type": "application/x-www-form-urlencoded",
        Host: "u3b6gr4ua3-dsn.algolia.net",
        Origin: "https://www.nintendo.com",
        Referer: referer,
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site"
      })
      .query({
        "x-algolia-agent": "Algolia for vanilla JavaScript (lite) 3.22.1;JS Helper 2.20.1",
        "x-algolia-application-id": "U3B6GR4UA3",
        "x-algolia-api-key": "9a20c93440cf63cf1a7008d75f7438bf"
      })
      .send(JSON.stringify(formData))
      .then(res => {
        const { results } = res.body;
        const { hits,nbPages } = results[0];
        page += 1;
        total = nbPages;
        data.push(...hits);
      })
      .catch(err => console.log(err.response.body));
  if(total >= page) {
    await requestUSATarget(250,page,data)
  }
  return data
}

module.exports = {
  requestUSATarget
};

