import { Router } from 'express';
import { SocialController } from '../controllers/SocialController';

const router = Router();
const socialController = new SocialController();

// YouTube routes
router.get('/youtube/trending', socialController.getYouTubeTrending);
router.post('/youtube/upload', socialController.uploadToYouTube);
router.get('/youtube/analytics/:videoId', socialController.getYouTubeAnalytics);

// Instagram routes
router.get('/instagram/trending', socialController.getInstagramTrending);
router.post('/instagram/upload', socialController.uploadToInstagram);
router.get('/instagram/analytics/:postId', socialController.getInstagramAnalytics);

// TikTok routes
router.get('/tiktok/trending', socialController.getTikTokTrending);
router.post('/tiktok/upload', socialController.uploadToTikTok);
router.get('/tiktok/analytics/:videoId', socialController.getTikTokAnalytics);

// Platform status
router.get('/status', socialController.getPlatformStatus);

export default router;