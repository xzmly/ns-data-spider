/*
  秘鲁
*/

const { requestHKTarget } = require('./HK');

const PEHTMLURL = 'https://store.nintendo.com.pe/games/all-released-games';

async function requestPETarget(){
  return requestHKTarget(PEHTMLURL,'A la venta ','Lanzamiento ')
}

module.exports = {
  requestPETarget
};