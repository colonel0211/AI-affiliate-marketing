require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

// --- Sample healthcheck endpoint ---
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/', (req, res) => {
  res.json({
    name: 'AI Affiliate Marketing Automation',
    docs: '/dashboard',
    status: '/status',
    health: '/health'
  });
});

// --- Sample dashboard endpoint ---
app.get('/dashboard', (req, res) => {
  res.send('<h1>Affiliate Marketing Automation Dashboard</h1><p>More features coming soon!</p>');
});

// --- Sample status endpoint ---
app.get('/status', (req, res) => {
  res.json({
    uptime: process.uptime(),
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
