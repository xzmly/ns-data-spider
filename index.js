const {requestHKTarget} = require('./HK');
const {requestJPTarget} = require('./JP');
const {requestUSATarget} = require('./USA');
const {requestCATarget} = require('./CA');
const {requestBRTarget}  = require('./BR');
const {requestCOTarget}  = require('./CO');

const express = require('express');

const app = express();

app.listen(3000);

//香港数据请求
app.get('/hk', async (req, res) => {
  const data = await requestHKTarget();
  res.send(data);
});
//日本数据
app.get('/jp', async (req, res) => {
  const data = await requestJPTarget();
  console.log(data.length);
  res.send(data);
});
//美国数据
app.get('/usa', async (req, res) => {
  const data = await requestUSATarget();
  res.send(data);
});
//加拿大
app.get('/ca',async (req,res) => {
  const data = await requestCATarget();
  res.send(data);
});
//巴西
app.get('/br',async (req,res) => {
  const data = await requestBRTarget();
  res.send(data);
});
//哥伦比亚
app.get('/co',async (req,res) => {
  const data = await requestCOTarget();
  res.send(data);
});
