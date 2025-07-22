import { Router } from 'express';
import { AIProviderController } from '../controllers/AIProviderController';

const router = Router();
const aiProviderController = new AIProviderController();

router.get('/', aiProviderController.getAllProviders);
router.get('/:id', aiProviderController.getProvider);
router.post('/', aiProviderController.createProvider);
router.put('/:id', aiProviderController.updateProvider);
router.delete('/:id', aiProviderController.deleteProvider);
router.post('/:id/test', aiProviderController.testProvider);
router.post('/reset-quotas', aiProviderController.resetQuotas);

export default router;