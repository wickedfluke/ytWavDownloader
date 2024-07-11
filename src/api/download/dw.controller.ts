import { Request, Response } from 'express';
import { downloadAndConvertAudio } from '../download/dw.service';
import path from 'path';

export const downloadAudio = async (req: Request, res: Response) => {
    const { url } = req.body;
    try {
        const audioPath = await downloadAndConvertAudio(url);
        res.json({ path: `/audio/${path.basename(audioPath)}` });
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
