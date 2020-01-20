/*
  韩国
*/

const { requestHKTarget } = require('./HK');

const KRHTMLURL = 'https://store.nintendo.co.kr/games/all-released-games';

async function requestKRTarget(){
  return requestHKTarget(KRHTMLURL,'발매 ')
}

module.exports = {
  requestKRTarget
};