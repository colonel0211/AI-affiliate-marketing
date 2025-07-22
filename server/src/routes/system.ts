import { Router } from 'express';
import { SystemController } from '../controllers/SystemController';

const router = Router();
const systemController = new SystemController();

router.get('/status', systemController.getSystemStatus);
router.get('/metrics', systemController.getSystemMetrics);
router.post('/start', systemController.startSystem);
router.post('/stop', systemController.stopSystem);
router.post('/restart', systemController.restartSystem);

export default router;