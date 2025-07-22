# AI Affiliate Marketing Backend

A comprehensive backend system for the AI Affiliate Marketing Automation platform that provides:

- **Content Generation**: Automated AI-powered content creation
- **Social Media Integration**: YouTube, Instagram, and TikTok APIs
- **Campaign Management**: Full campaign lifecycle management
- **AI Provider Management**: 42+ free AI providers with failover
- **Real-time Analytics**: Revenue tracking and performance metrics
- **Automated Scheduling**: 24/7 autonomous operation

## Features

### 🤖 AI Integration
- Multiple AI provider support (OpenAI, Anthropic, Google, etc.)
- Automatic failover when quotas are reached
- Smart provider selection based on quality and availability
- Real-time usage tracking and optimization

### 📱 Social Media APIs
- **YouTube Data API v3**: Upload videos, get analytics, trending content
- **Instagram Basic Display API**: Post content, fetch insights
- **TikTok Content Posting API**: Upload videos, get performance data

### 🎯 Campaign Management
- Create and manage affiliate marketing campaigns
- Platform-specific content optimization
- Automated scheduling and publishing
- Performance tracking and optimization

### 📊 Analytics & Monitoring
- Real-time revenue tracking
- Content performance metrics
- AI provider usage statistics
- System health monitoring

## Installation

1. **Clone and install dependencies**:
```bash
cd server
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
# Edit .env with your API keys and configuration
```

3. **Start MongoDB** (if running locally):
```bash
mongod
```

4. **Run the development server**:
```bash
npm run dev
```

## API Endpoints

### Campaigns
- `GET /api/campaigns` - Get all campaigns
- `POST /api/campaigns` - Create new campaign
- `PUT /api/campaigns/:id` - Update campaign
- `DELETE /api/campaigns/:id` - Delete campaign
- `POST /api/campaigns/:id/start` - Start campaign
- `POST /api/campaigns/:id/pause` - Pause campaign

### Content
- `GET /api/content` - Get all content
- `POST /api/content` - Create content
- `POST /api/content/generate` - Generate AI content
- `POST /api/content/:id/publish` - Publish content

### Social Media
- `GET /api/social/youtube/trending` - Get YouTube trending
- `POST /api/social/youtube/upload` - Upload to YouTube
- `GET /api/social/instagram/trending` - Get Instagram trending
- `POST /api/social/instagram/upload` - Upload to Instagram
- `GET /api/social/tiktok/trending` - Get TikTok trending
- `POST /api/social/tiktok/upload` - Upload to TikTok

### AI Providers
- `GET /api/ai-providers` - Get all AI providers
- `POST /api/ai-providers` - Add new provider
- `POST /api/ai-providers/:id/test` - Test provider
- `POST /api/ai-providers/reset-quotas` - Reset daily quotas

### Analytics
- `GET /api/analytics/overview` - System overview
- `GET /api/analytics/revenue` - Revenue analytics
- `GET /api/analytics/content-performance` - Content metrics
- `GET /api/analytics/platform-stats` - Platform statistics

### System
- `GET /api/system/status` - System health status
- `GET /api/system/metrics` - Performance metrics
- `POST /api/system/start` - Start system
- `POST /api/system/stop` - Stop system

## Configuration

### Social Media API Setup

#### YouTube API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable YouTube Data API v3
4. Create OAuth 2.0 credentials
5. Add credentials to `.env` file

#### Instagram API
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Instagram Basic Display product
4. Generate access token
5. Add credentials to `.env` file

#### TikTok API
1. Go to [TikTok Developers](https://developers.tiktok.com/)
2. Create a new app
3. Apply for Content Posting API access
4. Generate access token
5. Add credentials to `.env` file

### AI Provider Setup

The system supports 42+ free AI providers. Add your API keys to the `.env` file:

```env
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_AI_API_KEY=your_google_key
ELEVENLABS_API_KEY=your_elevenlabs_key
STABILITY_API_KEY=your_stability_key
```

## Automated Jobs

The system runs several automated jobs:

- **Content Scraping**: Every 2 hours - finds trending content
- **Content Generation**: Every 30 minutes - creates new content
- **Content Publishing**: Every hour - publishes ready content
- **Quota Reset**: Daily at midnight - resets AI provider quotas
- **Health Check**: Every 5 minutes - monitors system health

## Database Schema

### Campaign
- name, platform, status, frequency
- affiliateLinks, targetKeywords, contentTemplate
- videosQueued, totalViews, revenue

### Content
- title, description, platform, status
- videoUrl, thumbnailUrl, tags
- views, engagement, revenue
- aiProviders used, publishedAt

### AIProvider
- name, type, status, baseUrl
- dailyLimit, usageToday, successRate
- avgResponseTime, quality, cost

## Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Use MongoDB Atlas or dedicated MongoDB instance
3. Set up Redis for job queue
4. Configure proper logging
5. Set up SSL certificates
6. Use PM2 or similar for process management

### Docker Deployment
```bash
# Build image
docker build -t ai-affiliate-backend .

# Run container
docker run -p 5000:5000 --env-file .env ai-affiliate-backend
```

## Monitoring

The system includes comprehensive monitoring:

- **Winston Logging**: Structured logging with multiple levels
- **Health Checks**: Regular system health monitoring
- **Performance Metrics**: CPU, memory, and response time tracking
- **Error Handling**: Comprehensive error handling and reporting

## Security

- Input validation with Joi
- Rate limiting on API endpoints
- Secure API key storage
- CORS configuration
- Helmet.js security headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.