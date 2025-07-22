import axios from 'axios';
import { ScrapingService, ScrapingResult } from './ScrapingManager';
import { logger } from '../../utils/logger';

export class ApifyScrapingService implements ScrapingService {
  name = 'Apify';
  private apiToken: string;
  private baseUrl = 'https://api.apify.com/v2';

  constructor() {
    this.apiToken = process.env.APIFY_API_TOKEN || '';
  }

  async isAvailable(): Promise<boolean> {
    if (!this.apiToken) return false;
    
    try {
      const response = await axios.get(`${this.baseUrl}/users/me`, {
        headers: { Authorization: `Bearer ${this.apiToken}` }
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  async getRemainingQuota(): Promise<number> {
    try {
      const response = await axios.get(`${this.baseUrl}/users/me`, {
        headers: { Authorization: `Bearer ${this.apiToken}` }
      });
      return response.data.monthlyUsageUsd || 0;
    } catch (error) {
      return 0;
    }
  }

  async scrapeYouTube(limit = 50): Promise<ScrapingResult[]> {
    try {
      const actorId = 'mshopik~youtube-scraper';
      const input = {
        searchKeywords: 'trending viral popular',
        maxResults: limit,
        includeVideoDetails: true
      };

      const response = await axios.post(
        `${this.baseUrl}/acts/${actorId}/run-sync-get-dataset-items`,
        input,
        {
          headers: { Authorization: `Bearer ${this.apiToken}` },
          params: { token: this.apiToken }
        }
      );

      return response.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        author: item.channelName,
        viewCount: parseInt(item.viewCount) || 0,
        likeCount: parseInt(item.likeCount) || 0,
        commentCount: parseInt(item.commentCount) || 0,
        hashtags: item.hashtags || [],
        thumbnailUrl: item.thumbnailUrl,
        videoUrl: item.url,
        platform: 'youtube' as const,
        createdAt: item.publishedAt,
        engagementRate: this.calculateEngagementRate(item.likeCount, item.viewCount)
      }));
    } catch (error) {
      logger.error('Apify YouTube scraping failed:', error);
      throw error;
    }
  }

  async scrapeInstagram(limit = 50): Promise<ScrapingResult[]> {
    try {
      const actorId = 'zhangcheng~instagram-scraper';
      const input = {
        hashtags: ['trending', 'viral', 'popular'],
        resultsLimit: limit
      };

      const response = await axios.post(
        `${this.baseUrl}/acts/${actorId}/run-sync-get-dataset-items`,
        input,
        {
          headers: { Authorization: `Bearer ${this.apiToken}` },
          params: { token: this.apiToken }
        }
      );

      return response.data.map((item: any) => ({
        id: item.id,
        title: item.caption?.substring(0, 100) || '',
        description: item.caption || '',
        author: item.ownerUsername,
        viewCount: parseInt(item.videoViewCount) || parseInt(item.likesCount) * 10,
        likeCount: parseInt(item.likesCount) || 0,
        commentCount: parseInt(item.commentsCount) || 0,
        hashtags: item.hashtags || [],
        thumbnailUrl: item.displayUrl,
        platform: 'instagram' as const,
        createdAt: item.timestamp,
        engagementRate: this.calculateEngagementRate(item.likesCount, item.videoViewCount)
      }));
    } catch (error) {
      logger.error('Apify Instagram scraping failed:', error);
      throw error;
    }
  }

  async scrapeTikTok(limit = 50): Promise<ScrapingResult[]> {
    try {
      const actorId = 'medvednikov~tiktok-scraper';
      const input = {
        hashtags: ['trending', 'viral', 'fyp'],
        resultsLimit: limit
      };

      const response = await axios.post(
        `${this.baseUrl}/acts/${actorId}/run-sync-get-dataset-items`,
        input,
        {
          headers: { Authorization: `Bearer ${this.apiToken}` },
          params: { token: this.apiToken }
        }
      );

      return response.data.map((item: any) => ({
        id: item.id,
        title: item.text?.substring(0, 100) || '',
        description: item.text || '',
        author: item.authorMeta?.name || '',
        viewCount: parseInt(item.playCount) || 0,
        likeCount: parseInt(item.diggCount) || 0,
        shareCount: parseInt(item.shareCount) || 0,
        commentCount: parseInt(item.commentCount) || 0,
        hashtags: item.hashtags || [],
        thumbnailUrl: item.covers?.default,
        videoUrl: item.videoUrl,
        platform: 'tiktok' as const,
        createdAt: item.createTime,
        engagementRate: this.calculateEngagementRate(item.diggCount, item.playCount)
      }));
    } catch (error) {
      logger.error('Apify TikTok scraping failed:', error);
      throw error;
    }
  }

  private calculateEngagementRate(likes: number, views: number): number {
    if (!views || views === 0) return 0;
    return (likes / views) * 100;
  }
}