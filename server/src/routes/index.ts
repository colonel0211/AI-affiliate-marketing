import { Router } from 'express';
import campaignRoutes from './campaigns';
import contentRoutes from './content';
import aiProviderRoutes from './aiProviders';
import analyticsRoutes from './analytics';
import socialRoutes from './social';
import systemRoutes from './system';
import scrapingRoutes from './scraping';

const router = Router();

router.use('/campaigns', campaignRoutes);
router.use('/content', contentRoutes);
router.use('/ai-providers', aiProviderRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/social', socialRoutes);
router.use('/system', systemRoutes);
router.use('/scraping', scrapingRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;