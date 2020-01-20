/*
  哥伦比亚
*/

const { requestHKTarget } = require('./HK');

const COHTMLURL = 'https://store.nintendo.co/';

async function requestCOTarget(){
  return requestHKTarget(COHTMLURL,'A la venta ','Lanzamiento ')
}

module.exports = {
  requestCOTarget
};


