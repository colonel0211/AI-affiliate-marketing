import { Router } from 'express';
import { AnalyticsController } from '../controllers/AnalyticsController';

const router = Router();
const analyticsController = new AnalyticsController();

router.get('/overview', analyticsController.getOverview);
router.get('/revenue', analyticsController.getRevenue);
router.get('/content-performance', analyticsController.getContentPerformance);
router.get('/ai-providers', analyticsController.getAIProviderStats);
router.get('/platform-stats', analyticsController.getPlatformStats);

export default router;