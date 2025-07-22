import { Router } from 'express';
import { CampaignController } from '../controllers/CampaignController';
import { validateCampaign } from '../middleware/validation';

const router = Router();
const campaignController = new CampaignController();

router.get('/', campaignController.getAllCampaigns);
router.get('/:id', campaignController.getCampaign);
router.post('/', validateCampaign, campaignController.createCampaign);
router.put('/:id', validateCampaign, campaignController.updateCampaign);
router.delete('/:id', campaignController.deleteCampaign);
router.post('/:id/start', campaignController.startCampaign);
router.post('/:id/pause', campaignController.pauseCampaign);

export default router;