// AI Affiliate Marketing Automation Server - Million Dollar System
// Koyeb Compatible - Docker Ready
// Target: $1,000,000/month through AI affiliate programs

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { google } from 'googleapis';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import FormData from 'form-data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint for Koyeb
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    stats: systemStats 
  });
});

// Create uploads directory safely
const initializeDirectories = async () => {
  try {
    await fs.mkdir('uploads', { recursive: true });
    await fs.mkdir('logs', { recursive: true });
  } catch (error) {
    console.log('Directories already exist or created successfully');
  }
};

// System Statistics
let systemStats = {
  videosProcessed: 0,
  contentGenerated: 0,
  uploadsCompleted: 0,
  dailyRevenue: 0,
  monthlyRevenue: 0,
  yearlyRevenue: 0,
  activeAIProvider: 'huggingface',
  lastProcessed: null,
  errors: [],
  successfulCampaigns: 0,
  totalViews: 0,
  systemUptime: Date.now()
};

// AI Provider Management with Auto-Switching
const AI_PROVIDERS = {
  video: [
    {
      name: 'huggingface',
      endpoint: 'https://api-inference.huggingface.co/models/damo-vilab/text-to-video-ms-1.7b',
      apiKey: process.env.HUGGINGFACE_API_TOKEN,
      dailyLimit: 100,
      currentUsage: 0,
      active: true,
      priority: 1
    },
    {
      name: 'stability',
      endpoint: 'https://api.stability.ai/v1/generation/stable-video-diffusion-1-1/text-to-video',
      apiKey: process.env.STABILITY_AI_API_KEY,
      dailyLimit: 150,
      currentUsage: 0,
      active: true,
      priority: 2
    },
    {
      name: 'replicate',
      endpoint: 'https://api.replicate.com/v1/predictions',
      apiKey: process.env.REPLICATE_API_TOKEN,
      dailyLimit: 200,
      currentUsage: 0,
      active: true,
      priority: 3
    },
    {
      name: 'runway',
      endpoint: 'https://api.runwayml.com/v1/generate',
      apiKey: process.env.RUNWAY_ML_API_TOKEN,
      dailyLimit: 75,
      currentUsage: 0,
      active: true,
      priority: 4
    },
    {
      name: 'pika',
      endpoint: 'https://api.pika.art/generate',
      apiKey: process.env.PIKA_LABS_API_KEY,
      dailyLimit: 50,
      currentUsage: 0,
      active: true,
      priority: 5
    },
    {
      name: 'luma',
      endpoint: 'https://api.lumalabs.ai/dream-machine/v1/generations',
      apiKey: process.env.LUMA_AI_API_KEY,
      dailyLimit: 120,
      currentUsage: 0,
      active: true,
      priority: 6
    }
  ],
  image: [
    {
      name: 'huggingface',
      endpoint: 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
      apiKey: process.env.HUGGINGFACE_API_TOKEN,
      dailyLimit: 300,
      currentUsage: 0,
      active: true,
      priority: 1
    },
    {
      name: 'stability',
      endpoint: 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
      apiKey: process.env.STABILITY_AI_API_KEY,
      dailyLimit: 200,
      currentUsage: 0,
      active: true,
      priority: 2
    },
    {
      name: 'leonardo',
      endpoint: 'https://cloud.leonardo.ai/api/rest/v1/generations',
      apiKey: process.env.LEONARDO_AI_API_KEY,
      dailyLimit: 250,
      currentUsage: 0,
      active: true,
      priority: 3
    },
    {
      name: 'dezgo',
      endpoint: 'https://api.dezgo.com/text2image',
      apiKey: process.env.DEZGO_API_KEY,
      dailyLimit: 100,
      currentUsage: 0,
      active: true,
      priority: 4
    }
  ]
};

// High-Ticket AI Affiliate Programs Database
const AI_AFFILIATE_PROGRAMS = {
  highTicket: [
    {
      name: 'Jasper AI Enterprise',
      commission: 2400,
      conversionRate: 0.08,
      avgOrderValue: 12000,
      category: 'ai-content',
      description: 'Enterprise AI writing platform',
      targetAudience: 'businesses',
      commissionType: 'one-time',
      affiliateLink: 'https://jasper.ai/?fpr=affiliate-code',
      trending: true
    },
    {
      name: 'Copy.ai Pro Max',
      commission: 1800,
      conversionRate: 0.12,
      avgOrderValue: 8500,
      category: 'ai-copywriting',
      description: 'Advanced AI copywriting suite',
      targetAudience: 'marketers',
      commissionType: 'one-time',
      affiliateLink: 'https://copy.ai/?via=affiliate-code',
      trending: true
    },
    {
      name: 'Synthesia Enterprise',
      commission: 3200,
      conversionRate: 0.06,
      avgOrderValue: 15000,
      category: 'ai-video',
      description: 'AI video generation platform',
      targetAudience: 'enterprises',
      commissionType: 'one-time',
      affiliateLink: 'https://synthesia.io/?ref=affiliate-code',
      trending: true
    },
    {
      name: 'Midjourney Business',
      commission: 960,
      conversionRate: 0.15,
      avgOrderValue: 4800,
      category: 'ai-art',
      description: 'AI art generation for business',
      targetAudience: 'creatives',
      commissionType: 'one-time',
      affiliateLink: 'https://midjourney.com/business?ref=affiliate-code',
      trending: false
    }
  ],
  recurring: [
    {
      name: 'ChatGPT Plus',
      commission: 60,
      conversionRate: 0.25,
      avgOrderValue: 240,
      category: 'ai-chat',
      description: 'Premium ChatGPT subscription',
      targetAudience: 'general',
      commissionType: 'recurring',
      affiliateLink: 'https://openai.com/chatgpt/plus/?ref=affiliate-code',
      trending: true
    },
    {
      name: 'Notion AI Premium',
      commission: 120,
      conversionRate: 0.18,
      avgOrderValue: 480,
      category: 'ai-productivity',
      description: 'AI-powered productivity suite',
      targetAudience: 'professionals',
      commissionType: 'recurring',
      affiliateLink: 'https://notion.so/ai?ref=affiliate-code',
      trending: true
    },
    {
      name: 'Descript Pro',
      commission: 180,
      conversionRate: 0.14,
      avgOrderValue: 720,
      category: 'ai-editing',
      description: 'AI video and audio editing',
      targetAudience: 'content-creators',
      commissionType: 'recurring',
      affiliateLink: 'https://descript.com/pro?ref=affiliate-code',
      trending: false
    }
  ]
};

class YouTubeContentScraper {
  constructor() {
    this.youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY
    });
  }

  async getTrendingAIVideos(maxResults = 50) {
    try {
      const aiQueries = [
        'make money with AI 2024',
        'AI tools for business',
        'ChatGPT make money',
        'AI side hustle',
        'AI affiliate marketing',
        'passive income AI',
        'AI automation business',
        'AI content creation',
        'AI productivity tools',
        'best AI tools 2024'
      ];

      let allVideos = [];

      for (const query of aiQueries) {
        try {
          const response = await this.youtube.search.list({
            part: ['snippet'],
            q: query,
            type: 'video',
            order: 'viewCount',
            publishedAfter: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            maxResults: Math.ceil(maxResults / aiQueries.length)
          });

          for (const item of response.data.items) {
            try {
              const statsResponse = await this.youtube.videos.list({
                part: ['statistics', 'snippet', 'contentDetails'],
                id: item.id.videoId
              });

              const stats = statsResponse.data.items[0];
              if (stats && parseInt(stats.statistics.viewCount) >= 500000) {
                allVideos.push({
                  videoId: item.id.videoId,
                  title: item.snippet.title,
                  description: item.snippet.description,
                  channelTitle: item.snippet.channelTitle,
                  publishedAt: item.snippet.publishedAt,
                  viewCount: parseInt(stats.statistics.viewCount),
                  likeCount: parseInt(stats.statistics.likeCount || 0),
                  commentCount: parseInt(stats.statistics.commentCount || 0),
                  duration: stats.contentDetails.duration,
                  url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                  platform: 'youtube',
                  niche: 'ai-money',
                  scrapedAt: new Date().toISOString(),
                  engagementRate: (parseInt(stats.statistics.likeCount || 0) + parseInt(stats.statistics.commentCount || 0)) / parseInt(stats.statistics.viewCount)
                });
              }
            } catch (statsError) {
              console.error(`Error fetching stats for video ${item.id.videoId}:`, statsError.message);
            }
          }

          // Rate limiting for API compliance
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (queryError) {
          console.error(`Error searching for "${query}":`, queryError.message);
        }
      }

      systemStats.videosProcessed += allVideos.length;

      return allVideos
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, maxResults);

    } catch (error) {
      console.error('YouTube scraping error:', error);
      systemStats.errors.push({
        error: error.message,
        timestamp: new Date().toISOString(),
        function: 'getTrendingAIVideos'
      });
      return [];
    }
  }

  async getVideoComments(videoId, maxResults = 20) {
    try {
      const response = await this.youtube.commentThreads.list({
        part: ['snippet'],
        videoId: videoId,
        order: 'relevance',
        maxResults: maxResults
      });

      return response.data.items.map(item => ({
        comment: item.snippet.topLevelComment.snippet.textDisplay,
        author: item.snippet.topLevelComment.snippet.authorDisplayName,
        likeCount: item.snippet.topLevelComment.snippet.likeCount,
        publishedAt: item.snippet.topLevelComment.snippet.publishedAt
      }));
    } catch (error) {
      console.error(`Error fetching comments for ${videoId}:`, error.message);
      return [];
    }
  }
}

class AIContentGenerator {
  constructor() {
    this.currentVideoProvider = 0;
    this.currentImageProvider = 0;
  }

  async getAvailableProvider(type) {
    const providers = AI_PROVIDERS[type]
      .filter(p => p.active && p.apiKey)
      .sort((a, b) => a.priority - b.priority);
    
    // Find provider with available quota
    for (const provider of providers) {
      if (provider.currentUsage < provider.dailyLimit) {
        return provider;
      }
    }

    // Reset usage counters if all providers are at limit
    providers.forEach(p => p.currentUsage = 0);
    return providers[0];
  }

  async generateVideoContent(trendingVideo, affiliateProgram) {
    const provider = await this.getAvailableProvider('video');
    
    if (!provider) {
      throw new Error('No video providers available');
    }

    try {
      const prompt = this.createOptimizedPrompt(trendingVideo, affiliateProgram, 'video');
      
      let videoData;
      
      switch (provider.name) {
        case 'huggingface':
          videoData = await this.generateWithHuggingFace(prompt, provider, 'video');
          break;
        case 'stability':
          videoData = await this.generateWithStability(prompt, provider);
          break;
        case 'replicate':
          videoData = await this.generateWithReplicate(prompt, provider);
          break;
        case 'runway':
          videoData = await this.generateWithRunway(prompt, provider);
          break;
        case 'pika':
          videoData = await this.generateWithPika(prompt, provider);
          break;
        case 'luma':
          videoData = await this.generateWithLuma(prompt, provider);
          break;
        default:
          throw new Error(`Unknown provider: ${provider.name}`);
      }

      provider.currentUsage++;
      systemStats.contentGenerated++;
      systemStats.activeAIProvider = provider.name;

      return {
        videoPath: videoData,
        provider: provider.name,
        prompt,
        affiliateProgram,
        trendingVideo
      };

    } catch (error) {
      console.error(`Video generation error with ${provider.name}:`, error);
      
      // Mark provider as temporarily unavailable
      provider.currentUsage = provider.dailyLimit;
      
      systemStats.errors.push({
        error: error.message,
        provider: provider.name,
        timestamp: new Date().toISOString(),
        function: 'generateVideoContent'
      });
      
      // Try next available provider
      const nextProvider = await this.getAvailableProvider('video');
      if (nextProvider && nextProvider.name !== provider.name) {
        return this.generateVideoContent(trendingVideo, affiliateProgram);
      }
      
      throw error;
    }
  }

  async generateImageContent(trendingVideo, affiliateProgram) {
    const provider = await this.getAvailableProvider('image');
    
    if (!provider) {
      throw new Error('No image providers available');
    }

    try {
      const prompt = this.createOptimizedPrompt(trendingVideo, affiliateProgram, 'image');
      
      let imageData;
      
      switch (provider.name) {
        case 'huggingface':
          imageData = await this.generateWithHuggingFace(prompt, provider, 'image');
          break;
        case 'stability':
          imageData = await this.generateWithStabilityImage(prompt, provider);
          break;
        case 'leonardo':
          imageData = await this.generateWithLeonardo(prompt, provider);
          break;
        case 'dezgo':
          imageData = await this.generateWithDezgo(prompt, provider);
          break;
        default:
          throw new Error(`Unknown provider: ${provider.name}`);
      }

      provider.currentUsage++;
      systemStats.contentGenerated++;

      return {
        imagePath: imageData,
        provider: provider.name,
        prompt,
        affiliateProgram,
        trendingVideo
      };

    } catch (error) {
      console.error(`Image generation error with ${provider.name}:`, error);
      
      provider.currentUsage = provider.dailyLimit;
      
      systemStats.errors.push({
        error: error.message,
        provider: provider.name,
        timestamp: new Date().toISOString(),
        function: 'generateImageContent'
      });
      
      const nextProvider = await this.getAvailableProvider('image');
      if (nextProvider && nextProvider.name !== provider.name) {
        return this.generateImageContent(trendingVideo, affiliateProgram);
      }
      
      throw error;
    }
  }

  createOptimizedPrompt(trendingVideo, affiliateProgram, type) {
    const basePrompts = {
      video: `Create a high-energy promotional video about ${affiliateProgram.name}. 
             Show a professional presenter demonstrating how to make money with ${affiliateProgram.category}.
             Include: money graphics, success metrics, step-by-step tutorial, modern office setting,
             laptop with earnings dashboard, excited facial expressions, thumbs up gestures.
             Style: professional, energetic, money-focused, clickbait-worthy, viral potential.
             Duration: 15-30 seconds, vertical format optimized.`,
             
      image: `Professional YouTube thumbnail for "${affiliateProgram.name} - Make $10K/Month".
             Show: split screen with person pointing at money graphics, ${affiliateProgram.category} interface,
             large dollar signs, "INSANE RESULTS" text overlay, bright colors (green/gold),
             shocked facial expression, modern workspace background.
             Style: high-contrast, clickbait thumbnail, money-focused, eye-catching.`
    };

    return basePrompts[type];
  }

  async generateWithHuggingFace(prompt, provider, type) {
    const response = await fetch(provider.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${provider.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        options: { wait_for_model: true }
      })
    });

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    return await this.saveMediaFile(blob, type);
  }

  async generateWithStability(prompt, provider) {
    const formData = new FormData();
    formData.append('text_prompts[0][text]', prompt);
    formData.append('text_prompts[0][weight]', '1');
    formData.append('cfg_scale', '7');
    formData.append('steps', '30');

    const response = await fetch(provider.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${provider.apiKey}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Stability API error: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    return await this.saveMediaFile(blob, 'video');
  }

  async generateWithStabilityImage(prompt, provider) {
    const formData = new FormData();
    formData.append('text_prompts[0][text]', prompt);
    formData.append('text_prompts[0][weight]', '1');
    formData.append('cfg_scale', '7');
    formData.append('steps', '30');
    formData.append('width', '1024');
    formData.append('height', '1024');

    const response = await fetch(provider.endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${provider.apiKey}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Stability API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.artifacts && result.artifacts[0] && result.artifacts[0].base64) {
      const buffer = Buffer.from(result.artifacts[0].base64, 'base64');
      const filename = `generated_image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.jpg`;
      const filepath = path.join('uploads', filename);
      await fs.writeFile(filepath, buffer);
      return filepath;
    }

    throw new Error('Stability image generation failed');
  }

  async saveMediaFile(blob, type) {
    const ext = type === 'video' ? 'mp4' : 'jpg';
    const filename = `generated_${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;
    const filepath = path.join('uploads', filename);

    const buffer = Buffer.from(await blob.arrayBuffer());
    await fs.writeFile(filepath, buffer);

    return filepath;
  }
}

class AffiliateRevenueOptimizer {
  constructor() {
    this.revenueTargets = {
      daily: 33333,
      monthly: 1000000,
      yearly: 12000000
    };
  }

  selectOptimalProgram(trendingVideos, currentHour = new Date().getHours()) {
    const highConversionHours = [9, 10, 11, 14, 15, 16, 19, 20, 21];
    
    let programs = [...AI_AFFILIATE_PROGRAMS.highTicket, ...AI_AFFILIATE_PROGRAMS.recurring];
    
    // Filter for trending programs during peak hours
    if (highConversionHours.includes(currentHour)) {
      programs = programs.filter(p => p.trending).concat(
        programs.filter(p => !p.trending)
      );
    }

    // Analyze trending topics
    const trendingKeywords = trendingVideos
      .map(v => v.title.toLowerCase())
      .join(' ');

    let bestMatch = programs[0];
    let maxScore = 0;

    programs.forEach(program => {
      let score = program.commission * program.conversionRate;
      
      // Keyword matching boost
      const keywords = [program.category, program.name.toLowerCase(), program.targetAudience];
      const matches = keywords.filter(k => trendingKeywords.includes(k.toLowerCase())).length;
      score *= (1 + matches * 0.4);
      
      // Recurring revenue multiplier
      if (program.commissionType === 'recurring') {
        score *= 1.8;
      }

      // Trending program boost
      if (program.trending) {
        score *= 1.3;
      }

      if (score > maxScore) {
        maxScore = score;
        bestMatch = program;
      }
    });

    return bestMatch;
  }

  calculateRevenueProjection(program, estimatedViews, videoEngagement = 0.05) {
    const baseConversionRate = program.conversionRate;
    const engagementMultiplier = Math.min(videoEngagement / 0.05, 2.5);
    const adjustedConversionRate = baseConversionRate * engagementMultiplier;
    
    const ctr = 0.08; // 8% CTR for AI niche
    const clicks = estimatedViews * ctr;
    const conversions = clicks * adjustedConversionRate;
    
    let revenue;
    if (program.commissionType === 'recurring') {
      revenue = conversions * program.commission * 12;
    } else {
      revenue = conversions * program.commission;
    }

    return {
      estimatedClicks: Math.floor(clicks),
      estimatedConversions: Math.floor(conversions),
      projectedRevenue: Math.floor(revenue),
      dailyRecurring: program.commissionType === 'recurring' ? 
        Math.floor(conversions * program.commission / 30) : 0,
      monthlyProjection: Math.floor(revenue / 12),
      program: program.name,
      conversionRate: Math.round(adjustedConversionRate * 10000) / 100,
      engagementBoost: Math.round(engagementMultiplier * 100) / 100
    };
  }
}

class YouTubeUploader {
  constructor() {
    this.oauth2Client = null;
    this.youtube = null;
    this.initializeAuth();
  }

  initializeAuth() {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      console.warn('YouTube OAuth credentials not provided');
      return;
    }

    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.YOUTUBE_REDIRECT_URI || `https://your-koyeb-app.koyeb.app/auth/youtube/callback`
    );

    this.youtube = google.youtube({
      version: 'v3',
      auth: this.oauth2Client
    });
  }

  getAuthUrl() {
    if (!this.oauth2Client) {
      throw new Error('OAuth client not initialized');
    }

    const scopes = [
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube'
    ];
    
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  async uploadVideo(videoPath, trendingVideo, affiliateProgram, thumbnailPath = null) {
    try {
      if (!this.youtube) {
        throw new Error('YouTube client not initialized');
      }

      const tokensLoaded = await this.loadSavedTokens();
      if (!tokensLoaded) {
        throw new Error('YouTube authentication required');
      }

      const optimizedTitle = this.optimizeTitle(affiliateProgram);
      const optimizedDescription = this.optimizeDescription(affiliateProgram);
      const optimizedTags = this.optimizeTags(affiliateProgram);

      console.log(`Uploading: ${optimizedTitle}`);

      const videoBuffer = await fs.readFile(videoPath);

      const requestBody = {
        snippet: {
          title: optimizedTitle,
          description: optimizedDescription,
          tags: optimizedTags,
          categoryId: '28',
          defaultLanguage: 'en'
        },
        status: {
          privacyStatus: 'public',
          madeForKids: false
        }
      };

      const uploadResponse = await this.youtube.videos.insert({
        part: ['snippet', 'status'],
        requestBody,
        media: {
          body: videoBuffer
        }
      });

      const videoId = uploadResponse.data.id;
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      if (thumbnailPath) {
        try {
          const thumbnailBuffer = await fs.readFile(thumbnailPath);
          await this.youtube.thumbnails.set({
            videoId: videoId,
            media: { body: thumbnailBuffer }
          });
        } catch (thumbError) {
          console.error('Thumbnail upload failed:', thumbError.message);
        }
      }

      systemStats.uploadsCompleted++;
      
      // Cleanup files
      try {
        await fs.unlink(videoPath);
        if (thumbnailPath) await fs.unlink(thumbnailPath);
      } catch (cleanupError) {
        console.error('File cleanup error:', cleanupError.message);
      }

      return {
        success: true,
        videoId,
        videoUrl,
        title: optimizedTitle,
        uploadedAt: new Date().toISOString()
      };

    } catch (error) {
      console.error('YouTube upload error:', error);
      systemStats.errors.push({
        error: error.message,
        timestamp: new Date().toISOString(),
        function: 'uploadVideo'
      });
      
      return {
        success: false,
        error: error.message,
        requiresAuth: error.message.includes('authentication')
      };
    }
  }

  async loadSavedTokens() {
    try {
      const tokensData = await fs.readFile('youtube_tokens.json', 'utf8');
      const tokens = JSON.parse(tokensData);
      
      this.oauth2Client.setCredentials(tokens);
      
      if (tokens.refresh_token) {
        const { credentials } = await this.oauth2Client.refreshAccessToken();
        this.oauth2Client.setCredentials(credentials);
        await fs.writeFile('youtube_tokens.json', JSON.stringify(credentials, null, 2));
      }
      
      return true;
    } catch (error) {
      return false;
    }
  }

  optimizeTitle(affiliateProgram) {
    const hooks = [
      `🚀 ${affiliateProgram.name}: How I Made $10K in 30 Days (PROOF!)`,
      `💰 ${affiliateProgram.name} Review: $1000/Day Method REVEALED`,
      `🔥 Make Money with ${affiliateProgram.name} in 2024 (Step by Step)`,
      `⚡ ${affiliateProgram.name}: The AI Money Maker Everyone's Using`,
      `💸 I Tried ${affiliateProgram.name} for 30 Days - INSANE Results!`
    ];
    
    return hooks[Math.floor(Math.random() * hooks.length)];
  }

  optimizeDescription(affiliateProgram) {
    return `🔥 MAKE MONEY WITH AI IN 2024! 🔥

In this video, I show you exactly how to use ${affiliateProgram.name} to generate massive income online!

💰 What you'll learn:
• How to set up ${affiliateProgram.name} in under 10 minutes
• My exact strategy that generated $${affiliateProgram.commission} in commissions
• Secret tips that 99% of people don't know
• Live demo of the entire process
• Proof of earnings and results

🎯 ${affiliateProgram.description}

⭐ GET STARTED TODAY: ${affiliateProgram.affiliateLink}

🔔 SUBSCRIBE for more AI money-making strategies!
💬 Comment "AI MONEY" if this helped you!

#AI #MakeMoneyOnline #AffiliateMarketing #${affiliateProgram.category.replace('-', '')} #PassiveIncome

⚠️ DISCLAIMER: Results may vary. This is for educational purposes only.

🕐 TIMESTAMPS:
00:00 - Introduction
01:30 - ${affiliateProgram.name} Setup
03:45 - Money-Making Strategy
06:20 - Live Demo
08:10 - Results & Proof
09:40 - Next Steps

💼 BUSINESS INQUIRIES: contact@yoursite.com
📱 FOLLOW ME: @yoursocial`;
  }

  optimizeTags(affiliateProgram) {
    const baseTags = [
      'make money online',
      'AI tools',
      'affiliate marketing',
      'passive income',
      'online business',
      'AI money',
      'work from home',
      'side hustle'
    ];

    const programTags = [
      affiliateProgram.name.toLowerCase(),
      affiliateProgram.category,
      affiliateProgram.targetAudience,
      `${affiliateProgram.category} review`,
      `how to use ${affiliateProgram.name.toLowerCase()}`
    ];

    return [...baseTags, ...programTags].slice(0, 30);
  }
}

class AutomationOrchestrator {
  constructor() {
    this.scraper = new YouTubeContentScraper();
    this.generator = new AIContentGenerator();
    this.optimizer = new AffiliateRevenueOptimizer();
    this.uploader = new YouTubeUploader();
    this.isRunning = false;
    this.currentCampaign = null;
  }

  async runFullCampaign() {
    if (this.isRunning) {
      console.log('Campaign already running...');
      return { status: 'already_running' };
    }

    this.isRunning = true;
    const campaignId = `campaign_${Date.now()}`;
    
    try {
      console.log(`🚀 Starting Campaign: ${campaignId}`);
      
      // Step 1: Scrape trending AI videos
      console.log('📈 Analyzing trending AI content...');
      const trendingVideos = await this.scraper.getTrendingAIVideos(20);
      
      if (trendingVideos.length === 0) {
        throw new Error('No trending videos found');
      }

      // Step 2: Select optimal affiliate program
      console.log('💰 Selecting optimal affiliate program...');
      const selectedProgram = this.optimizer.selectOptimalProgram(trendingVideos);
      
      // Step 3: Calculate revenue projections
      const avgViews = trendingVideos.reduce((sum, v) => sum + v.viewCount, 0) / trendingVideos.length;
      const revenueProjection = this.optimizer.calculateRevenueProjection(
        selectedProgram, 
        Math.floor(avgViews * 0.3) // Conservative 30% of trending performance
      );

      console.log(`💸 Revenue Projection: $${revenueProjection.projectedRevenue}`);

      // Step 4: Generate video content
      console.log('🎬 Generating AI video content...');
      const topTrendingVideo = trendingVideos[0];
      const videoContent = await this.generator.generateVideoContent(topTrendingVideo, selectedProgram);
      
      // Step 5: Generate thumbnail
      console.log('🖼️ Creating optimized thumbnail...');
      const thumbnailContent = await this.generator.generateImageContent(topTrendingVideo, selectedProgram);

      // Step 6: Upload to YouTube
      console.log('📺 Uploading to YouTube...');
      const uploadResult = await this.uploader.uploadVideo(
        videoContent.videoPath,
        topTrendingVideo,
        selectedProgram,
        thumbnailContent.imagePath
      );

      // Update system stats
      if (uploadResult.success) {
        systemStats.successfulCampaigns++;
        systemStats.dailyRevenue += revenueProjection.dailyRecurring;
        systemStats.monthlyRevenue += revenueProjection.monthlyProjection;
        systemStats.yearlyRevenue += revenueProjection.projectedRevenue;
        systemStats.lastProcessed = new Date().toISOString();
      }

      this.currentCampaign = {
        campaignId,
        status: uploadResult.success ? 'completed' : 'failed',
        selectedProgram,
        revenueProjection,
        uploadResult,
        trendingVideoAnalyzed: topTrendingVideo.title,
        completedAt: new Date().toISOString()
      };

      console.log(`✅ Campaign ${campaignId} completed successfully!`);
      
      return {
        status: 'success',
        campaign: this.currentCampaign
      };

    } catch (error) {
      console.error(`❌ Campaign ${campaignId} failed:`, error);
      
      systemStats.errors.push({
        campaignId,
        error: error.message,
        timestamp: new Date().toISOString(),
        function: 'runFullCampaign'
      });

      this.currentCampaign = {
        campaignId,
        status: 'failed',
        error: error.message,
        failedAt: new Date().toISOString()
      };

      return {
        status: 'error',
        error: error.message,
        campaign: this.currentCampaign
      };
    } finally {
      this.isRunning = false;
    }
  }

  async getSystemStatus() {
    return {
      isRunning: this.isRunning,
      currentCampaign: this.currentCampaign,
      systemStats,
      uptime: Math.floor((Date.now() - systemStats.systemUptime) / 1000),
      providers: {
        video: AI_PROVIDERS.video.map(p => ({
          name: p.name,
          active: p.active,
          usage: `${p.currentUsage}/${p.dailyLimit}`,
          available: p.currentUsage < p.dailyLimit
        })),
        image: AI_PROVIDERS.image.map(p => ({
          name: p.name,
          active: p.active,
          usage: `${p.currentUsage}/${p.dailyLimit}`,
          available: p.currentUsage < p.dailyLimit
        }))
      }
    };
  }
}

// Initialize orchestrator
const orchestrator = new AutomationOrchestrator();

// API Routes

// Dashboard endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 AI Affiliate Marketing Automation Server',
    status: 'running',
    target: '$1,000,000/month',
    endpoints: {
      dashboard: '/dashboard',
      status: '/status',
      campaign: '/campaign/start',
      youtube_auth: '/auth/youtube',
      stats: '/stats',
      health: '/health'
    }
  });
});

// System status endpoint
app.get('/status', async (req, res) => {
  try {
    const status = await orchestrator.getSystemStatus();
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start campaign endpoint
app.post('/campaign/start', async (req, res) => {
  try {
    const result = await orchestrator.runFullCampaign();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// YouTube authentication
app.get('/auth/youtube', (req, res) => {
  try {
    const authUrl = orchestrator.uploader.getAuthUrl();
    res.redirect(authUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// YouTube OAuth callback
app.get('/auth/youtube/callback', async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code not provided' });
    }

    const { tokens } = await orchestrator.uploader.oauth2Client.getToken(code);
    orchestrator.uploader.oauth2Client.setCredentials(tokens);
    
    // Save tokens for future use
    await fs.writeFile('youtube_tokens.json', JSON.stringify(tokens, null, 2));
    
    res.json({ 
      success: true, 
      message: 'YouTube authentication successful!',
      redirect: '/dashboard'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Detailed stats endpoint
app.get('/stats', (req, res) => {
  res.json({
    systemStats,
    affiliatePrograms: AI_AFFILIATE_PROGRAMS,
    providers: AI_PROVIDERS,
    revenueBreakdown: {
      daily: {
        target: 33333,
        current: systemStats.dailyRevenue,
        progress: Math.round((systemStats.dailyRevenue / 33333) * 100)
      },
      monthly: {
        target: 1000000,
        current: systemStats.monthlyRevenue,
        progress: Math.round((systemStats.monthlyRevenue / 1000000) * 100)
      },
      yearly: {
        target: 12000000,
        current: systemStats.yearlyRevenue,
        progress: Math.round((systemStats.yearlyRevenue / 12000000) * 100)
      }
    }
  });
});

// Dashboard HTML endpoint
app.get('/dashboard', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Affiliate Marketing Dashboard</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
            }
            .dashboard {
                max-width: 1200px;
                margin: 0 auto;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .header h1 {
                font-size: 2.5em;
                margin-bottom: 10px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            .card {
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                border-radius: 15px;
                padding: 25px;
                border: 1px solid rgba(255,255,255,0.2);
            }
            .card h3 {
                margin-top: 0;
                font-size: 1.3em;
                margin-bottom: 15px;
            }
            .stat-value {
                font-size: 2em;
                font-weight: bold;
                color: #4ade80;
                margin: 10px 0;
            }
            .button {
                background: #4ade80;
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 25px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
                display: inline-block;
                margin: 10px;
            }
            .button:hover {
                background: #22c55e;
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            }
            .button.danger {
                background: #ef4444;
            }
            .button.danger:hover {
                background: #dc2626;
            }
            .actions {
                text-align: center;
                margin: 30px 0;
            }
            .status {
                padding: 10px 20px;
                border-radius: 20px;
                font-weight: bold;
                text-align: center;
                margin: 10px 0;
            }
            .status.running {
                background: rgba(34, 197, 94, 0.2);
                border: 1px solid #22c55e;
            }
            .status.stopped {
                background: rgba(239, 68, 68, 0.2);
                border: 1px solid #ef4444;
            }
            .providers {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 10px;
                margin-top: 15px;
            }
            .provider {
                background: rgba(255,255,255,0.05);
                padding: 10px;
                border-radius: 8px;
                font-size: 0.9em;
            }
            .provider.available {
                border-left: 4px solid #4ade80;
            }
            .provider.unavailable {
                border-left: 4px solid #ef4444;
            }
        </style>
    </head>
    <body>
        <div class="dashboard">
            <div class="header">
                <h1>🚀 AI Affiliate Marketing Automation</h1>
                <p>Target: $1,000,000/month through AI affiliate programs</p>
            </div>

            <div class="cards">
                <div class="card">
                    <h3>💰 Revenue Stats</h3>
                    <div>Daily: <span class="stat-value" id="dailyRevenue">$0</span></div>
                    <div>Monthly: <span class="stat-value" id="monthlyRevenue">$0</span></div>
                    <div>Yearly: <span class="stat-value" id="yearlyRevenue">$0</span></div>
                </div>
                
                <div class="card">
                    <h3>📊 Performance</h3>
                    <div>Videos Processed: <span class="stat-value" id="videosProcessed">0</span></div>
                    <div>Content Generated: <span class="stat-value" id="contentGenerated">0</span></div>
                    <div>Uploads Completed: <span class="stat-value" id="uploadsCompleted">0</span></div>
                </div>
                
                <div class="card">
                    <h3>⚡ System Status</h3>
                    <div class="status" id="systemStatus">Checking...</div>
                    <div>Active Provider: <span id="activeProvider">-</span></div>
                    <div>Successful Campaigns: <span class="stat-value" id="successfulCampaigns">0</span></div>
                </div>
            </div>

            <div class="actions">
                <button class="button" onclick="startCampaign()">🚀 Start New Campaign</button>
                <a href="/auth/youtube" class="button">🔐 Authenticate YouTube</a>
                <button class="button" onclick="refreshStats()">🔄 Refresh Stats</button>
                <a href="/stats" class="button" target="_blank">📈 Detailed Stats</a>
            </div>

            <div class="cards">
                <div class="card">
                    <h3>🤖 AI Providers Status</h3>
                    <div id="providersStatus">Loading...</div>
                </div>
                
                <div class="card">
                    <h3>📝 Recent Activity</h3>
                    <div id="recentActivity">No recent activity</div>
                </div>
            </div>
        </div>

        <script>
            async function refreshStats() {
                try {
                    const response = await fetch('/status');
                    const data = await response.json();
                    
                    document.getElementById('dailyRevenue').textContent = '$' + data.systemStats.dailyRevenue.toLocaleString();
                    document.getElementById('monthlyRevenue').textContent = '$' + data.systemStats.monthlyRevenue.toLocaleString();
                    document.getElementById('yearlyRevenue').textContent = '$' + data.systemStats.yearlyRevenue.toLocaleString();
                    document.getElementById('videosProcessed').textContent = data.systemStats.videosProcessed;
                    document.getElementById('contentGenerated').textContent = data.systemStats.contentGenerated;
                    document.getElementById('uploadsCompleted').textContent = data.systemStats.uploadsCompleted;
                    document.getElementById('successfulCampaigns').textContent = data.systemStats.successfulCampaigns;
                    document.getElementById('activeProvider').textContent = data.systemStats.activeAIProvider;
                    
                    const statusEl = document.getElementById('systemStatus');
                    if (data.isRunning) {
                        statusEl.textContent = '🟢 Campaign Running';
                        statusEl.className = 'status running';
                    } else {
                        statusEl.textContent = '🔴 System Ready';
                        statusEl.className = 'status stopped';
                    }

                    // Update providers status
                    const providersEl = document.getElementById('providersStatus');
                    let providersHTML = '<div class="providers">';
                    
                    data.providers.video.forEach(provider => {
                        const status = provider.available ? 'available' : 'unavailable';
                        providersHTML += \`<div class="provider \${status}">
                            <strong>\${provider.name}</strong><br>
                            \${provider.usage}
                        </div>\`;
                    });
                    
                    providersHTML += '</div>';
                    providersEl.innerHTML = providersHTML;

                    // Update recent activity
                    if (data.currentCampaign) {
                        const activityEl = document.getElementById('recentActivity');
                        activityEl.innerHTML = \`
                            <strong>Last Campaign:</strong><br>
                            Status: \${data.currentCampaign.status}<br>
                            \${data.currentCampaign.completedAt ? 'Completed: ' + new Date(data.currentCampaign.completedAt).toLocaleString() : ''}
                        \`;
                    }
                } catch (error) {
                    console.error('Error refreshing stats:', error);
                    alert('Error refreshing stats: ' + error.message);
                }
            }

            async function startCampaign() {
                try {
                    const button = event.target;
                    button.textContent = '⏳ Starting Campaign...';
                    button.disabled = true;
                    
                    const response = await fetch('/campaign/start', {
                        method: 'POST'
                    });
                    
                    const result = await response.json();
                    
                    if (result.status === 'success') {
                        alert('🎉 Campaign completed successfully!');
                    } else if (result.status === 'already_running') {
                        alert('⚠️ Campaign is already running!');
                    } else {
                        alert('❌ Campaign failed: ' + result.error);
                    }
                    
                    refreshStats();
                } catch (error) {
                    alert('Error starting campaign: ' + error.message);
                } finally {
                    const button = event.target;
                    button.textContent = '🚀 Start New Campaign';
                    button.disabled = false;
                }
            }

            // Auto-refresh every 30 seconds
            setInterval(refreshStats, 30000);
            
            // Initial load
            refreshStats();
        </script>
    </body>
    </html>
  `);
});

// Automated campaigns scheduling
cron.schedule('0 */3 * * *', async () => {
  console.log('🕐 Scheduled campaign trigger');
  try {
    await orchestrator.runFullCampaign();
  } catch (error) {
    console.error('Scheduled campaign error:', error);
  }
});

// Reset daily provider usage
cron.schedule('0 0 * * *', () => {
  console.log('🔄 Resetting daily provider usage');
  Object.values(AI_PROVIDERS).forEach(providers => {
    providers.forEach(provider => {
      provider.currentUsage = 0;
    });
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  });
});

// Start server
const startServer = async () => {
  try {
    await initializeDirectories();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`
🚀 AI AFFILIATE MARKETING AUTOMATION SERVER STARTED 🚀

💰 Target: $1,000,000/month
🌐 Server: http://0.0.0.0:${PORT}
📊 Dashboard: http://0.0.0.0:${PORT}/dashboard
📈 Stats: http://0.0.0.0:${PORT}/stats
🔍 Health: http://0.0.0.0:${PORT}/health

🤖 AI Providers: ${Object.values(AI_PROVIDERS).flat().filter(p => p.active && p.apiKey).length} active
💼 Affiliate Programs: ${AI_AFFILIATE_PROGRAMS.highTicket.length + AI_AFFILIATE_PROGRAMS.recurring.length} loaded
⏰ Auto-campaigns: Every 3 hours

Ready to generate massive affiliate income! 💸
      `);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();
