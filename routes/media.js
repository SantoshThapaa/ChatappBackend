import express from 'express';
import upload from '../middlewares/multer.js';
import { getMediaById, uploadMedia } from '../controllers/mediaController.js';
const router = express.Router();

router.post('/uploadmedia', upload.single('file'), uploadMedia);
router.get('/media/:mediaId', getMediaById); 

export default router;
