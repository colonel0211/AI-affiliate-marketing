import { Router } from 'express';
import { ScrapingController } from '../controllers/ScrapingController';

const router = Router();
const scrapingController = new ScrapingController();

// Get trending content from all platforms
router.get('/trending', scrapingController.getAllTrending);

// Platform-specific scraping
router.get('/youtube', scrapingController.scrapeYouTube);
router.get('/instagram', scrapingController.scrapeInstagram);
router.get('/tiktok', scrapingController.scrapeTikTok);

// Service status and management
router.get('/services/status', scrapingController.getServiceStatus);
router.post('/services/test', scrapingController.testServices);

export default router;