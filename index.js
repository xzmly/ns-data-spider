const {requestHKTarget} = require('./HK');
const {requestJPTarget} = require('./JP');
const {requestUSATarget} = require('./USA');

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

