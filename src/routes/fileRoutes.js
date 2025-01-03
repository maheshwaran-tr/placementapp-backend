import express from 'express';
import multer from 'multer';
import fileController from '../controllers/fileController.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/:fileName', fileController.getFileUrl);
router.delete('/:fileName', fileController.deleteFile);

export default router;