// Health check script for Docker and Koyeb
import http from 'http';

const PORT = process.env.PORT || 8000;

const healthCheck = () => {
  const options = {
    hostname: 'localhost',
    port: PORT,
    path: '/health',
    method: 'GET',
    timeout: 5000
  };

  const req = http.request(options, (res) => {
    if (res.statusCode === 200) {
      console.log('✅ Health check passed');
      process.exit(0);
    } else {
      console.error(`❌ Health check failed - Status: ${res.statusCode}`);
      process.exit(1);
    }
  });

  req.on('error', (error) => {
    console.error('❌ Health check error:', error.message);
    process.exit(1);
  });

  req.on('timeout', () => {
    console.error('❌ Health check timeout');
    req.destroy();
    process.exit(1);
  });

  req.end();
};

healthCheck();
