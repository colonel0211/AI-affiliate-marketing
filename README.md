# 🚀 AI Affiliate Marketing Automation Server

**Target: $1,000,000/month through AI affiliate programs**

Fully automated AI-powered affiliate marketing system that scrapes trending YouTube content, generates high-converting videos using multiple AI providers, and uploads them with optimized affiliate links.

## 🎯 Features

- **🤖 Multi-AI Provider Support**: OpenAI, Replicate, Stability AI, Anthropic
- **📈 YouTube Automation**: Auto-scraping, content generation, and uploading
- **💰 Revenue Optimization**: Smart affiliate program selection and commission tracking
- **⚡ Real-time Dashboard**: Live stats, campaign monitoring, and system status
- **🔄 Automated Campaigns**: Scheduled campaigns every 3 hours
- **📊 Performance Analytics**: Detailed revenue projections and success metrics

## 🏗️ Architecture

```
AI Affiliate Marketing System
├── Content Scraping (YouTube Trending)
├── AI Content Generation (Video + Thumbnails)
├── Affiliate Revenue Optimization
├── Automated YouTube Upload
├── Real-time Dashboard & Analytics
└── Scheduled Campaign Execution
```

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-affiliate-marketing-automation.git
cd ai-affiliate-marketing-automation
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your API keys
nano .env
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Locally
```bash
npm start
```

### 5. Access Dashboard
Open http://localhost:8000/dashboard

## 🌐 Deploy to Koyeb

### Method 1: Direct GitHub Deployment

1. **Fork this repository** to your GitHub account

2. **Connect to Koyeb**:
   - Go to [Koyeb Dashboard](https://app.koyeb.com)
   - Click "Create App"
   - Select "GitHub" as source
   - Choose your forked repository

3. **Configure Environment Variables** in Koyeb:
   ```
   PORT=8000
   NODE_ENV=production
   OPENAI_API_KEY=your-key-here
   REPLICATE_API_TOKEN=your-token-here
   STABILITY_AI_API_KEY=your-key-here
   YOUTUBE_CLIENT_ID=your-client-id
   YOUTUBE_CLIENT_SECRET=your-secret
   YOUTUBE_REDIRECT_URI=https://your-app.koyeb.app/auth/youtube/callback
   ```

4. **Deploy**: Click "Deploy" and wait for deployment

### Method 2: Docker Deployment

```bash
# Build Docker image
docker build -t ai-affiliate-automation .

# Run with environment file
docker run --env-file .env -p 8000:8000 ai-affiliate-automation
```

## 📋 Required API Keys

### Essential (Required for basic functionality):
- **OpenAI API Key**: For content generation
- **YouTube API Credentials**: For video uploading
- **Replicate Token**: For video generation

### Optional (Enhanced features):
- **Stability AI Key**: For thumbnail generation
- **Anthropic Key**: Alternative AI provider
- **Cohere Key**: Additional AI capabilities

## 🎬 YouTube API Setup

1. **Google Cloud Console**:
   - Create new project or select existing
   - Enable YouTube Data API v3
   - Create OAuth 2.0 credentials

2. **OAuth Configuration**:
   - Application type: Web application
   - Authorized redirect URIs: `https://your-app.koyeb.app/auth/youtube/callback`
   - Download credentials JSON

3. **Environment Variables**:
   ```bash
   YOUTUBE_CLIENT_ID=your-client-id.googleusercontent.com
   YOUTUBE_CLIENT_SECRET=your-client-secret
   YOUTUBE_REDIRECT_URI=https://your-app.koyeb.app/auth/youtube/callback
   ```

## 💰 Affiliate Programs Setup

The system comes pre-loaded with high-converting AI affiliate programs:

- **OpenAI API**: $18/1000 requests commission
- **Replicate**: $0.023/second processing fee
- **Midjourney**: $96/year subscription
- **Jasper AI**: $372/year subscription
- **Copy.ai**: $420/year subscription

Add your affiliate IDs in the `.env` file:
```bash
DEFAULT_AFFILIATE_TAG=your-tag
CLICKBANK_AFFILIATE_ID=your-id
AMAZON_ASSOCIATE_TAG=your-amazon-tag
```

## 📊 Dashboard Features

Access the dashboard at `/dashboard` to monitor:

- **💰 Revenue Stats**: Real-time earnings tracking
- **📈 Performance Metrics**: Success rates and analytics
- **⚡ System Status**: AI provider health monitoring
- **🎬 Campaign Management**: Start/stop automated campaigns
- **🔐 YouTube Authentication**: OAuth setup and management

## 🛠️ API Endpoints

```
GET  /              - API information
GET  /dashboard     - Web dashboard
GET  /status        - System status
POST /campaign/start - Start new campaign
GET  /auth/youtube  - YouTube OAuth
GET  /stats         - Detailed statistics
GET  /health        - Health check
```

## 🔧 Configuration

### Campaign Settings
```javascript
// Modify in server.js
AUTO_CAMPAIGN_INTERVAL: '0 */3 * * *',  // Every 3 hours
MAX_CONCURRENT_CAMPAIGNS: 3,
VIDEO_QUALITY: '720p',
THUMBNAIL_SIZE: '1280x720'
```

### AI Provider Priority
```javascript
// System automatically fails over between:
1. OpenAI (Primary)
2. Replicate (Video generation)
3. Stability AI (Images)
4. Anthropic (Backup)
```

## 📈 Revenue Projections

Based on current market analysis:
- **Daily Target**: $33,333
- **Monthly Target**: $1,000,000
- **Yearly Target**: $12,000,000

The system automatically calculates and tracks progress toward these goals.

## 🚨 Important Security Notes

- **Never commit API keys** to version control
- **Use strong passwords** for admin access
- **Enable HTTPS** in production
- **Regularly rotate API keys**
- **Monitor usage quotas** to prevent overages

## 🐛 Troubleshooting

### Common Issues:

1. **API Key Errors**: Verify all keys in `.env` file
2. **YouTube Upload Fails**: Check OAuth setup and redirect URI
3. **AI Provider Timeout**: System auto-fails over to backup providers
4. **Memory Issues**: Increase container memory in Koyeb settings

### Logs:
```bash
# View logs locally
npm run dev

# Docker logs
docker logs container-id

# Koyeb logs available in dashboard
```

## 📞 Support

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/ai-affiliate-marketing-automation/issues)
- **Documentation**: Check this README and code comments
- **Community**: Join our affiliate marketing automation community

## 📄 License

MIT License - Feel free to modify and distribute.

## 🎯 Roadmap

- [ ] Advanced A/B testing for thumbnails
- [ ] Multi-language content generation
- [ ] Social media cross-posting
- [ ] Advanced analytics dashboard
- [ ] Mobile app for campaign management
- [ ] Webhook integrations
- [ ] Custom AI model training

---

**⚡ Ready to generate massive affiliate income with AI automation!**

Start your journey to $1,000,000/month: `npm start` 🚀
