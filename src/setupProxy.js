const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api',{
            target: 'http://10.99.3.2:8082',
            changeOrigin: true,
        })
    );
};
