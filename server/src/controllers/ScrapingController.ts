import { Request, Response } from 'express';
import { ScrapingManager } from '../services/scraping/ScrapingManager';
import { logger } from '../utils/logger';
import { ApiResponse } from '../utils/apiResponse';

export class ScrapingController {
  private scrapingManager = new ScrapingManager();

  async getAllTrending(req: Request, res: Response) {
    try {
      const { limit = 50 } = req.query;
      const trending = await this.scrapingManager.getAllTrendingContent();
      
      // Limit results if specified
      const limitedResults = trending.slice(0, Number(limit));
      
      res.json(ApiResponse.success(limitedResults));
    } catch (error) {
      logger.error('Error getting all trending content:', error);
      res.status(500).json(ApiResponse.error('Failed to get trending content'));
    }
  }

  async scrapeYouTube(req: Request, res: Response) {
    try {
      const { limit = 50 } = req.query;
      const videos = await this.scrapingManager.scrapeYouTube(Number(limit));
      res.json(ApiResponse.success(videos));
    } catch (error) {
      logger.error('Error scraping YouTube:', error);
      res.status(500).json(ApiResponse.error('Failed to scrape YouTube'));
    }
  }

  async scrapeInstagram(req: Request, res: Response) {
    try {
      const { limit = 50 } = req.query;
      const posts = await this.scrapingManager.scrapeInstagram(Number(limit));
      res.json(ApiResponse.success(posts));
    } catch (error) {
      logger.error('Error scraping Instagram:', error);
      res.status(500).json(ApiResponse.error('Failed to scrape Instagram'));
    }
  }

  async scrapeTikTok(req: Request, res: Response) {
    try {
      const { limit = 50 } = req.query;
      const videos = await this.scrapingManager.scrapeTikTok(Number(limit));
      res.json(ApiResponse.success(videos));
    } catch (error) {
      logger.error('Error scraping TikTok:', error);
      res.status(500).json(ApiResponse.error('Failed to scrape TikTok'));
    }
  }

  async getServiceStatus(req: Request, res: Response) {
    try {
      const status = await this.scrapingManager.getServiceStatus();
      res.json(ApiResponse.success(status));
    } catch (error) {
      logger.error('Error getting service status:', error);
      res.status(500).json(ApiResponse.error('Failed to get service status'));
    }
  }

  async testServices(req: Request, res: Response) {
    try {
      const testResults = await Promise.allSettled([
        this.scrapingManager.scrapeYouTube(5),
        this.scrapingManager.scrapeInstagram(5),
        this.scrapingManager.scrapeTikTok(5)
      ]);

      const results = {
        youtube: testResults[0].status === 'fulfilled' ? 'success' : 'failed',
        instagram: testResults[1].status === 'fulfilled' ? 'success' : 'failed',
        tiktok: testResults[2].status === 'fulfilled' ? 'success' : 'failed',
        details: testResults.map((result, index) => ({
          platform: ['youtube', 'instagram', 'tiktok'][index],
          status: result.status,
          data: result.status === 'fulfilled' ? result.value.length : 0,
          error: result.status === 'rejected' ? result.reason.message : null
        }))
      };

      res.json(ApiResponse.success(results));
    } catch (error) {
      logger.error('Error testing services:', error);
      res.status(500).json(ApiResponse.error('Failed to test services'));
    }
  }
}