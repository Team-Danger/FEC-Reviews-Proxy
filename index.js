const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = process.env.PORT || 80;

const optionRouter = {
  '/api/description': 'http://description:3000',
  '/api/reservation': 'http://reservation:3001',
  '/api/reviews': 'http://reviews:3002'
}

const router = (req) => {
  const urlRegex = /^(\/.*\/.*)\/.*/;
  const apiRoute = urlRegex.exec(req.originalUrl)[1];
  const converted = optionRouter[apiRoute];
  return new Promise((resolve) => resolve(converted))
}

const proxyOptions = {
  target: 'localhost',
  changeOrigin: true,
  router
}

const staticOptions = {
  dotfiles: 'ignore',
  maxAge: '1d',
  // setHeaders: function (res) {
  //   res.set('Content-Encoding', 'gzip');
  // }
}

const proxy = createProxyMiddleware(proxyOptions);
const app = express();
const proxyPath = path.join(__dirname, 'public');
// const descriptionPath = path.join(__dirname, 'modules', 'FEC-Description-Component','client','dist');
// const reservationPath = path.join(__dirname, 'modules', 'FEC-Reservation-Component', 'client', 'dist')
// const reviewPath = path.join(__dirname, 'modules', 'FEC-Reviews-Component', 'client', 'public');

const descriptionPath = path.join(__dirname, 'Description-Component');
const reservationPath = path.join(__dirname, 'Reservation-Component');
const reviewPath = path.join(__dirname, 'Reviews-Component');


app.use('/api', proxy);
app.use('/', express.static(proxyPath));
app.use('/description', express.static(descriptionPath));
app.use('/reviews', express.static(reviewPath));
app.use('/reservation', express.static(reservationPath));

app.listen(PORT, () => {
  console.log(`listening on proxy server: ${PORT}`)
})