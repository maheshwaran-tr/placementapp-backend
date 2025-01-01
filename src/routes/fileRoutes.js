import express from 'express';
import multer from 'multer';
import fileController from '../controllers/fileController.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/file/:fileName', fileController.getFileUrl);
router.delete('/file/:fileName', fileController.deleteFile);

export default router;