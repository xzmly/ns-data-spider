/*
  加拿大
*/

const { requestUSATarget } = require('./USA');

const CAGAMEHTMLURL = 'https://www.nintendo.com/en_CA/games/game-guide'; //页面url
const CAGAMEURL = 'https://u3b6gr4ua3-dsn.algolia.net/1/indexes/*/queries';

const Referer = 'https://www.nintendo.com/en_CA/games/game-guide/';

async function requestCATarget(){
  return requestUSATarget(250,0,[], CAGAMEURL,Referer)
}

module.exports = {
  requestCATarget
};