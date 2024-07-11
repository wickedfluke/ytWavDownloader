import { Router } from 'express';
import { downloadAudio } from './dw.controller';

const router = Router();

router.post('/download', downloadAudio);

export default router;
