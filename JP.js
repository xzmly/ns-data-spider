/*
  日本
*/

const superagent = require('superagent');

const JPHTMLURL = 'https://www.nintendo.co.jp/software/switch/index.html?sftab=all&spage=1'; //页面url

const JPGAMEURL = 'https://search.nintendo.jp/nintendo_soft/search.json'; //接口url
const JPIMAGEPREFIX = 'https://img-eshop.cdn.nintendo.net/i/';

let total = 0;

async function requestJPTarget(limit = 300,page = 1,data = []) {
  await superagent.get(JPGAMEURL)
      .set({
        "method": "GET",
        "origin": "https://www.nintendo.co.jp",
        "pragma":"no-cache",
        "sec-fetch-mode":"cors",
        "sec-fetch-site":"cross-site",
      })
      .query({
        opt_sshow: 1,
        limit,
        page,
        c: 10315883755509435,
        opt_osale: 1,
        opt_hard: '1_HAC',
        sort: 'sodate desc,score',
        fq: "ssitu_s:onsale OR ssitu_s:preorder OR ( id:3347 OR id:70010000013978 OR id:70010000004356 OR id:70010000005986 OR id:ef5bf7785c3eca1ab4f3d46a121c1709 OR id:3252 OR id:3082 )",
      })
      .then(res => {
        page += 1;
        const { result } = res.body;
        total = result.total;
        data.push(...result.items.map(v => ({...v, imageSrc: `${JPIMAGEPREFIX}${v.iurl}.jpg`}) ))
      })
      .catch(err => console.log(err,'请求发生错误'));
  if(Math.ceil(total/limit) >= page){
    return await requestJPTarget(300,page,data);
  }
  return data
}

module.exports = {
  requestJPTarget
};