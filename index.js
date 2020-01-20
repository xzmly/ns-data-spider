const {requestHKTarget} = require('./HK');
const {requestJPTarget} = require('./JP');

const express = require('express');

const app = express();

app.listen(3000);

app.get('/hk', async (req, res) => {
  const data = await requestHKTarget();
  res.send(data);
});

app.get('/jp', async (req, res) => {
  const data = await requestJPTarget();
  console.log(data.length);
  res.send(data);
});

