module.exports = {
    // 'api': {
    //     target: 'your target domain'
    // }
    '/vip': {
        target: 'http://10.253.5.187:8080',
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: '',
        onProxyReq: function (proxyReq, req, res) {
           proxyReq.setHeader('origin', 'http://10.253.5.187:8080')
        }
    }
}