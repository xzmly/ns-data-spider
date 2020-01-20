/*
  智利
*/

const { requestHKTarget } = require('./HK');

const CLHTMLURL = 'https://store.nintendo.cl/games/all-released-games';

async function requestCLTarget(){
  return requestHKTarget(CLHTMLURL,'A la venta ','Lanzamiento ')
}

module.exports = {
  requestCLTarget
};