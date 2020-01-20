const {requestHKTarget} = require('./HK');
const {requestJPTarget} = require('./JP');
const {requestUSATarget} = require('./USA');
const {requestCATarget} = require('./CA');
const {requestBRTarget}  = require('./BR');
const {requestCOTarget}  = require('./CO');
const {requestARTarget}  = require('./AR');
const {requestCLTarget} = require('./CL');
const { requestPETarget } = require('./PE');
const {requestKRTarget} = require('./KR');

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
//阿根廷
app.get('/ar',async (req,res) => {
  const data = await requestARTarget();
  res.send(data);
});
//智利
app.get('/cl',async (req,res) => {
  const data = await requestCLTarget();
  res.send(data);
});
//秘鲁
app.get('/pe',async (req,res) => {
  const data = await requestPETarget();
  res.send(data);
});
//韩国
app.get('/kr',async (req,res) => {
  const data = await requestKRTarget();
  res.send(data);
});
