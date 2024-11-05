const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config()
console.log("AUTH_SERVICE_URL ", process.env.AUTH_SERVICE_URL);

const port = process.env.PORT || 8080;

// Middleware to log requests for all routes
app.use((req, res, next) => {
    console.log(req.method + ' ' + req.url);
    next();
});

// Proxy middleware for /auth endpoint
app.use('/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL, // Ensure this is set correctly
    changeOrigin: true,
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error occurred.');
      }, 
}));

// Root route
app.get('/', (req, res) => {
    console.log("Hei");
    res.send("Hello World");
});

// Start the server
app.listen(port, () => {
    console.log('http://localhost:' + port + '/');
});
