const http = require('http');
const options = {
  host: 'localhost',
  port: process.env.PORT || 8000,
  path: '/health',
  timeout: 2000
};

const req = http.get(options, res => {
  process.exit(res.statusCode === 200 ? 0 : 1);
});
req.on('error', () => process.exit(1));
req.end();
