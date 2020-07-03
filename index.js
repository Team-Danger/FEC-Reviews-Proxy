const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = process.env.PORT || 7357;

const options = {
  target: 'localhost',
  changeOrigin: true,
  router:{
    'localhost:7357/api/description': 'mongo:3000',
    'localhost:7357/api/reservation': 'mongo:3001',
    'localhost:7357/api/reviews': 'mongo:3002'
  }
}

const proxy = createProxyMiddleware(options);
const app = express();
const proxyPath = path.join(__dirname, 'public');
const descriptionPath = path.join(__dirname, 'modules', 'FEC-Description-Component','client','dist');
const reservationPath = path.join(__dirname, 'modules', 'FEC-Reservation-Component', 'client', 'dist')
const reviewPath = path.join(__dirname, 'modules', 'FEC-Reviews-Component', 'client', 'public');
console.log(descriptionPath);

app.use('/api', proxy);
app.use('/', express.static(proxyPath));
app.use('/description', express.static(descriptionPath));
app.use('/reviews', express.static(reviewPath));
app.use('/reservation', express.static(reservationPath));

app.listen(PORT, () => {
  console.log(`listening on proxy server: ${PORT}`)
})