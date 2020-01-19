const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');

const app = express();
const HKHTMLURL = 'https://store.nintendo.com.hk/games/all-released-games';
const JPHTMLURL = 'https://www.nintendo.co.jp/software/switch/index.html?sftab=all&spage=1';

const JPGAMEURL = 'https://search.nintendo.jp/nintendo_soft/search.json';
const JPIMAGEPREFIX = 'https://img-eshop.cdn.nintendo.net/i/';


const server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('这里是host 和 port',host,port)
});

app.get('/hk', async (req, res) => {
  const data = await requestHKTarget();
  res.send(data);
});

app.get('/jp', async (req, res) => {
  const data = await requestJPTarget();
  console.log(data.length);
  res.send(data);
});

async function requestHKTarget(){
  const data = [];
  await superagent.get(HKHTMLURL)
      .then((res) => {
        const $ = cheerio.load(res.text);
        $('.category-product-item')
            .each((idx, ele) => {


              const price = $(ele).find('.price').text();
              const image = $(ele).find('img').attr('src');
              const title = $(ele).find('.category-product-item-title-link').text();
              const saleDate = $(ele).find('.category-product-item-released').text();

              data.push({
                title: title.trim(),
                image,
                price,
                saleDate: saleDate.replace(/(^\s*)|(\s*$)/g, "").replace("發售日期 ","")
              })

            });
      })
      .catch(err => console.log(err,'网页加载错误'));
  return data
}

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