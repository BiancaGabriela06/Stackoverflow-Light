const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const questionsRoutes = require('./routes/questionsRoutes');
const metricsRoutes = require('./routes/metricsRoutes');

require('dotenv').config()
console.log("AUTH_SERVICE_URL ", process.env.AUTH_SERVICE_URL);
console.log("DATA_SERVICE_URL ", process.env.DATA_SERVICE_URL);

const port = process.env.PORT || 8080;

app.use((req, res, next) => {
    console.log(req.method + ' ' + req.url);
    next();
});

app.use('/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL, 
    changeOrigin: true,
    timeout: 5000,
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error occurred.');
      }, 
}));

app.use(express.json());

app.use('/questions', questionsRoutes);
app.use('/metrics', metricsRoutes);


app.get('/', (req, res) => {
    console.log("Hei");
    res.send("Hello World");
});

app.listen(port, () => {
    console.log('http://localhost:' + port + '/');
});
