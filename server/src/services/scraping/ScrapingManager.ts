import { logger } from '../../utils/logger';
import { ApifyScrapingService } from './ApifyScrapingService';
import { PuppeteerScrapingService } from './PuppeteerScrapingService';
import { PlaywrightScrapingService } from './PlaywrightScrapingService';
import { PublicAPIScrapingService } from './PublicAPIScrapingService';
import { CheerioScrapingService } from './CheerioScrapingService';

export interface ScrapingResult {
  id: string;
  title: string;
  description: string;
  author: string;
  viewCount: number;
  likeCount: number;
  shareCount?: number;
  commentCount: number;
  hashtags: string[];
  thumbnailUrl: string;
  videoUrl?: string;
  platform: 'youtube' | 'instagram' | 'tiktok';
  createdAt: string;
  engagementRate: number;
}

export interface ScrapingService {
  name: string;
  isAvailable(): Promise<boolean>;
  scrapeYouTube(limit?: number): Promise<ScrapingResult[]>;
  scrapeInstagram(limit?: number): Promise<ScrapingResult[]>;
  scrapeTikTok(limit?: number): Promise<ScrapingResult[]>;
  getRemainingQuota(): Promise<number>;
}

export class ScrapingManager {
  private services: ScrapingService[] = [];
  private currentServiceIndex = 0;

  constructor() {
    this.initializeServices();
  }

  private initializeServices() {
    this.services = [
      new ApifyScrapingService(),
      new PuppeteerScrapingService(),
      new PlaywrightScrapingService(),
      new PublicAPIScrapingService(),
      new CheerioScrapingService()
    ];
  }

  private async getNextAvailableService(): Promise<ScrapingService | null> {
    const startIndex = this.currentServiceIndex;
    
    do {
      const service = this.services[this.currentServiceIndex];
      
      try {
        const isAvailable = await service.isAvailable();
        if (isAvailable) {
          logger.info(`Using scraping service: ${service.name}`);
          return service;
        }
      } catch (error) {
        logger.warn(`Service ${service.name} is not available:`, error.message);
      }
      
      this.currentServiceIndex = (this.currentServiceIndex + 1) % this.services.length;
    } while (this.currentServiceIndex !== startIndex);

    logger.error('No scraping services available');
    return null;
  }

  async scrapeYouTube(limit = 50): Promise<ScrapingResult[]> {
    const service = await this.getNextAvailableService();
    if (!service) {
      throw new Error('No YouTube scraping services available');
    }

    try {
      const results = await service.scrapeYouTube(limit);
      logger.info(`Scraped ${results.length} YouTube videos using ${service.name}`);
      return results.filter(video => video.viewCount >= 500000);
    } catch (error) {
      logger.error(`YouTube scraping failed with ${service.name}:`, error);
      
      // Try next service
      this.currentServiceIndex = (this.currentServiceIndex + 1) % this.services.length;
      if (this.currentServiceIndex !== 0) {
        return this.scrapeYouTube(limit);
      }
      throw error;
    }
  }

  async scrapeInstagram(limit = 50): Promise<ScrapingResult[]> {
    const service = await this.getNextAvailableService();
    if (!service) {
      throw new Error('No Instagram scraping services available');
    }

    try {
      const results = await service.scrapeInstagram(limit);
      logger.info(`Scraped ${results.length} Instagram posts using ${service.name}`);
      return results.filter(post => post.likeCount >= 10000);
    } catch (error) {
      logger.error(`Instagram scraping failed with ${service.name}:`, error);
      
      // Try next service
      this.currentServiceIndex = (this.currentServiceIndex + 1) % this.services.length;
      if (this.currentServiceIndex !== 0) {
        return this.scrapeInstagram(limit);
      }
      throw error;
    }
  }

  async scrapeTikTok(limit = 50): Promise<ScrapingResult[]> {
    const service = await this.getNextAvailableService();
    if (!service) {
      throw new Error('No TikTok scraping services available');
    }

    try {
      const results = await service.scrapeTikTok(limit);
      logger.info(`Scraped ${results.length} TikTok videos using ${service.name}`);
      return results.filter(video => video.viewCount >= 500000);
    } catch (error) {
      logger.error(`TikTok scraping failed with ${service.name}:`, error);
      
      // Try next service
      this.currentServiceIndex = (this.currentServiceIndex + 1) % this.services.length;
      if (this.currentServiceIndex !== 0) {
        return this.scrapeTikTok(limit);
      }
      throw error;
    }
  }

  async getAllTrendingContent(): Promise<ScrapingResult[]> {
    try {
      const [youtubeResults, instagramResults, tiktokResults] = await Promise.allSettled([
        this.scrapeYouTube(20),
        this.scrapeInstagram(20),
        this.scrapeTikTok(20)
      ]);

      const allResults: ScrapingResult[] = [];

      if (youtubeResults.status === 'fulfilled') {
        allResults.push(...youtubeResults.value);
      }
      if (instagramResults.status === 'fulfilled') {
        allResults.push(...instagramResults.value);
      }
      if (tiktokResults.status === 'fulfilled') {
        allResults.push(...tiktokResults.value);
      }

      // Sort by engagement rate and view count
      return allResults.sort((a, b) => {
        const scoreA = a.engagementRate * Math.log(a.viewCount);
        const scoreB = b.engagementRate * Math.log(b.viewCount);
        return scoreB - scoreA;
      });
    } catch (error) {
      logger.error('Error getting all trending content:', error);
      throw error;
    }
  }

  async getServiceStatus() {
    const status = [];
    
    for (const service of this.services) {
      try {
        const isAvailable = await service.isAvailable();
        const remainingQuota = await service.getRemainingQuota();
        
        status.push({
          name: service.name,
          available: isAvailable,
          remainingQuota,
          status: isAvailable ? 'active' : 'unavailable'
        });
      } catch (error) {
        status.push({
          name: service.name,
          available: false,
          remainingQuota: 0,
          status: 'error',
          error: error.message
        });
      }
    }
    
    return status;
  }
}