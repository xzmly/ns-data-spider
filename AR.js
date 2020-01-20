/*
  阿根廷
*/

const { requestHKTarget } = require('./HK');

const ARHTMLURL = 'https://store.nintendo.com.ar/';

async function requestARTarget(){
  return requestHKTarget(ARHTMLURL,'A la venta ','Lanzamiento ')
}

module.exports = {
  requestARTarget
};


