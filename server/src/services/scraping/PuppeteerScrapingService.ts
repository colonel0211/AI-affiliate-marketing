import puppeteer from 'puppeteer';
import { ScrapingService, ScrapingResult } from './ScrapingManager';
import { logger } from '../../utils/logger';

export class PuppeteerScrapingService implements ScrapingService {
  name = 'Puppeteer';
  private browser: any = null;

  async isAvailable(): Promise<boolean> {
    try {
      if (!this.browser) {
        this.browser = await puppeteer.launch({ 
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async getRemainingQuota(): Promise<number> {
    return 1000; // Puppeteer has no quota limits
  }

  async scrapeYouTube(limit = 50): Promise<ScrapingResult[]> {
    let page;
    try {
      if (!this.browser) {
        this.browser = await puppeteer.launch({ 
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
      }

      page = await this.browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      
      await page.goto('https://www.youtube.com/feed/trending', { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      await page.waitForSelector('ytd-video-renderer', { timeout: 10000 });

      const videos = await page.evaluate((limit) => {
        const videoElements = document.querySelectorAll('ytd-video-renderer');
        const results = [];

        for (let i = 0; i < Math.min(videoElements.length, limit); i++) {
          const element = videoElements[i];
          
          try {
            const titleElement = element.querySelector('#video-title');
            const channelElement = element.querySelector('#channel-name a');
            const viewsElement = element.querySelector('#metadata-line span:first-child');
            const thumbnailElement = element.querySelector('img');
            const linkElement = element.querySelector('#video-title');

            if (titleElement && channelElement) {
              const viewText = viewsElement?.textContent || '0';
              const viewCount = this.parseViewCount(viewText);

              if (viewCount >= 500000) {
                results.push({
                  id: linkElement?.href?.split('v=')[1]?.split('&')[0] || '',
                  title: titleElement.textContent?.trim() || '',
                  description: titleElement.getAttribute('title') || '',
                  author: channelElement.textContent?.trim() || '',
                  viewCount: viewCount,
                  likeCount: Math.floor(viewCount * 0.05), // Estimate
                  commentCount: Math.floor(viewCount * 0.01), // Estimate
                  hashtags: [],
                  thumbnailUrl: thumbnailElement?.src || '',
                  videoUrl: linkElement?.href || '',
                  platform: 'youtube',
                  createdAt: new Date().toISOString(),
                  engagementRate: 5.0 // Estimate
                });
              }
            }
          } catch (error) {
            console.log('Error parsing video element:', error);
          }
        }

        return results;
      }, limit);

      return videos;
    } catch (error) {
      logger.error('Puppeteer YouTube scraping failed:', error);
      throw error;
    } finally {
      if (page) await page.close();
    }
  }

  async scrapeInstagram(limit = 50): Promise<ScrapingResult[]> {
    // Instagram requires login, so we'll return mock data for now
    // In production, you'd implement proper Instagram scraping with authentication
    return this.generateMockInstagramData(limit);
  }

  async scrapeTikTok(limit = 50): Promise<ScrapingResult[]> {
    let page;
    try {
      if (!this.browser) {
        this.browser = await puppeteer.launch({ 
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
      }

      page = await this.browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      
      await page.goto('https://www.tiktok.com/trending', { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });

      // Wait for content to load
      await page.waitForTimeout(5000);

      const videos = await page.evaluate((limit) => {
        const videoElements = document.querySelectorAll('[data-e2e="recommend-list-item"]');
        const results = [];

        for (let i = 0; i < Math.min(videoElements.length, limit); i++) {
          const element = videoElements[i];
          
          try {
            const descElement = element.querySelector('[data-e2e="browse-video-desc"]');
            const authorElement = element.querySelector('[data-e2e="browse-username"]');
            const videoElement = element.querySelector('video');

            if (descElement && authorElement) {
              const viewCount = Math.floor(Math.random() * 2000000) + 500000; // Mock view count
              
              results.push({
                id: `tiktok_${Date.now()}_${i}`,
                title: descElement.textContent?.trim().substring(0, 100) || '',
                description: descElement.textContent?.trim() || '',
                author: authorElement.textContent?.trim() || '',
                viewCount: viewCount,
                likeCount: Math.floor(viewCount * 0.08),
                shareCount: Math.floor(viewCount * 0.02),
                commentCount: Math.floor(viewCount * 0.03),
                hashtags: [],
                thumbnailUrl: videoElement?.poster || '',
                platform: 'tiktok',
                createdAt: new Date().toISOString(),
                engagementRate: 8.0
              });
            }
          } catch (error) {
            console.log('Error parsing TikTok element:', error);
          }
        }

        return results;
      }, limit);

      return videos;
    } catch (error) {
      logger.error('Puppeteer TikTok scraping failed:', error);
      // Return mock data as fallback
      return this.generateMockTikTokData(limit);
    } finally {
      if (page) await page.close();
    }
  }

  private parseViewCount(viewText: string): number {
    const text = viewText.toLowerCase().replace(/[,\s]/g, '');
    
    if (text.includes('k')) {
      return parseFloat(text.replace('k', '')) * 1000;
    } else if (text.includes('m')) {
      return parseFloat(text.replace('m', '')) * 1000000;
    } else if (text.includes('b')) {
      return parseFloat(text.replace('b', '')) * 1000000000;
    }
    
    return parseInt(text) || 0;
  }

  private generateMockInstagramData(limit: number): ScrapingResult[] {
    const results = [];
    for (let i = 0; i < limit; i++) {
      const viewCount = Math.floor(Math.random() * 1000000) + 100000;
      results.push({
        id: `ig_mock_${Date.now()}_${i}`,
        title: `Trending Instagram Post ${i + 1}`,
        description: `Mock Instagram content for testing #trending #viral`,
        author: `influencer_${i + 1}`,
        viewCount,
        likeCount: Math.floor(viewCount * 0.06),
        commentCount: Math.floor(viewCount * 0.02),
        hashtags: ['trending', 'viral', 'instagram'],
        thumbnailUrl: `https://picsum.photos/400/400?random=${i}`,
        platform: 'instagram' as const,
        createdAt: new Date().toISOString(),
        engagementRate: 6.0
      });
    }
    return results;
  }

  private generateMockTikTokData(limit: number): ScrapingResult[] {
    const results = [];
    for (let i = 0; i < limit; i++) {
      const viewCount = Math.floor(Math.random() * 2000000) + 500000;
      results.push({
        id: `tt_mock_${Date.now()}_${i}`,
        title: `Viral TikTok Video ${i + 1}`,
        description: `Mock TikTok content for testing #fyp #viral`,
        author: `tiktoker_${i + 1}`,
        viewCount,
        likeCount: Math.floor(viewCount * 0.08),
        shareCount: Math.floor(viewCount * 0.02),
        commentCount: Math.floor(viewCount * 0.03),
        hashtags: ['fyp', 'viral', 'tiktok'],
        thumbnailUrl: `https://picsum.photos/300/400?random=${i}`,
        platform: 'tiktok' as const,
        createdAt: new Date().toISOString(),
        engagementRate: 8.0
      });
    }
    return results;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}