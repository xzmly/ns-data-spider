const superagent = require('superagent');
const cheerio = require('cheerio');

const HKHTMLURL = 'https://store.nintendo.com.hk/games/all-released-games';

async function requestHKTarget(url = HKHTMLURL,replaceStr = "發售日期 "){
  const data = [];
  await superagent.get(url)
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
                saleDate: saleDate.replace(/(^\s*)|(\s*$)/g, "").replace(replaceStr,"")
              })

            });
      })
      .catch(err => console.log(err,'网页加载错误'));
  return data
}

module.exports = {
  requestHKTarget
};