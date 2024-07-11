import { Request, Response } from 'express';
import { downloadAndConvertAudio } from '../download/dw.service';
import path from 'path';

export const downloadAudio = async (req: Request, res: Response) => {
    const { url } = req.body;
    console.log(`Received request to download audio for URL: ${url}`);
    try {
        const audioPath = await downloadAndConvertAudio(url);
        console.log(`Audio downloaded and converted successfully: ${audioPath}`);
        res.json({ path: `/audio/${path.basename(audioPath)}` });
    } catch (error) {
        console.error(`Failed to download or convert audio: ${error}`);
        res.status(500).json({ error: error });
    }
};
