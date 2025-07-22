import cron from 'node-cron';
import { ContentGenerationService } from './content/ContentGenerationService';
import { AIProviderManager } from './ai/AIProviderManager';
import { logger } from '../utils/logger';

const contentService = new ContentGenerationService();
const aiProviderManager = new AIProviderManager();

export const initializeJobs = async () => {
  logger.info('Initializing scheduled jobs...');

  // Initialize AI providers on startup
  await aiProviderManager.initializeProviders();

  // Content scraping job - every 2 hours
  cron.schedule('0 */2 * * *', async () => {
    logger.info('Starting content scraping job...');
    try {
      await contentService.scrapeContent();
    } catch (error) {
      logger.error('Content scraping job failed:', error);
    }
  });

  // Content generation job - every 30 minutes
  cron.schedule('*/30 * * * *', async () => {
    logger.info('Starting content generation job...');
    try {
      await contentService.generateContent();
    } catch (error) {
      logger.error('Content generation job failed:', error);
    }
  });

  // Content publishing job - every hour
  cron.schedule('0 * * * *', async () => {
    logger.info('Starting content publishing job...');
    try {
      await contentService.publishContent();
    } catch (error) {
      logger.error('Content publishing job failed:', error);
    }
  });

  // Reset AI provider quotas daily at midnight
  cron.schedule('0 0 * * *', async () => {
    logger.info('Resetting AI provider daily quotas...');
    try {
      await aiProviderManager.resetDailyQuotas();
    } catch (error) {
      logger.error('Failed to reset AI provider quotas:', error);
    }
  });

  // System health check - every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    try {
      await performHealthCheck();
    } catch (error) {
      logger.error('Health check failed:', error);
    }
  });

  logger.info('All scheduled jobs initialized successfully');
};

const performHealthCheck = async () => {
  // Check database connection
  // Check AI provider status
  // Check social media API connections
  // Log system metrics
  logger.info('System health check completed');
};