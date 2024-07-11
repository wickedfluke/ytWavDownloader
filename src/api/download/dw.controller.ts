import { Request, Response } from 'express';
import { downloadAndConvertAudio } from './dw.service';
import fs from 'fs';

export const downloadAudio = async (req: Request, res: Response) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const filePath = await downloadAndConvertAudio(url);
        res.download(filePath, (err) => {
            if (err) {
                console.error(`Error sending file: ${err.message}`);
            } else {
                // Delete the file after sending it
                //fs.unlinkSync(filePath);
                //console.log(`Temporary audio file deleted: ${filePath}`);
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to download audio' });
    }
};
