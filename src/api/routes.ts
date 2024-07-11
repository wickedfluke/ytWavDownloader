import express from 'express';
import dwRouter from './download/dw.router';

const router = express.Router();

router.use('/audio', dwRouter);

export default router;