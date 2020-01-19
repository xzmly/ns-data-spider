const express = require('express');
const superagent = require('superagent');
const cheerio = require('cheerio');

const app = express();

const server = app.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('这里是host 和 port',host,port)
});

app.get('/', async (req, res) => {
  const data = await requestTarget();
  res.send(data);
});

async function requestTarget(){
  const data = [];
  await superagent.get('https://store.nintendo.com.hk/games/all-released-games')
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