import { Router } from 'express';
import { ContentController } from '../controllers/ContentController';

const router = Router();
const contentController = new ContentController();

router.get('/', contentController.getAllContent);
router.get('/:id', contentController.getContent);
router.post('/', contentController.createContent);
router.put('/:id', contentController.updateContent);
router.delete('/:id', contentController.deleteContent);
router.post('/generate', contentController.generateContent);
router.post('/:id/publish', contentController.publishContent);

export default router;