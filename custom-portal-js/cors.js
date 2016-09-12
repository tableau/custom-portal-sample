var host = '127.0.0.1';
var port = 9999;

var proxy = require('cors-anywhere');
proxy.createServer({
  originWhitelist: [], // Allow everything
  removeHeaders: ['Host'],
  httpProxyOptions: {
    secure: false
  }
}).listen(port, host, () => {
  console.log(`Running CORS proxy on ${host}:${port}`);
});
