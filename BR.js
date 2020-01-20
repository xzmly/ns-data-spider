const { requestHKTarget } = require('./HK');

const BRHTMLURL = 'https://store.nintendo.com.br/';

async function requestBRTarget(){
  return requestHKTarget(BRHTMLURL,'Lançamento no dia')
}

module.exports = {
  requestBRTarget
};


