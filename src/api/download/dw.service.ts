import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import youtubeDl from 'youtube-dl-exec';
import ytdl from 'ytdl-core';

const execPromise = promisify(exec);
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

export const downloadAndConvertAudio = async (url: string): Promise<string> => {
    const tempDir = path.join(__dirname, '..', 'temp');
    const audioDir = path.join(__dirname, '..', 'public', 'audio');

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }
    if (!fs.existsSync(audioDir)) {
        fs.mkdirSync(audioDir);
    }

    try {
        console.log(`Getting video info from URL: ${url}`);
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[^a-z0-9]/gi, '_').toLowerCase(); // Sanitize title
        const videoId = uuidv4();
        const videoPath = path.join(tempDir, `${videoId}.mp4`);
        const audioPath = path.join(audioDir, `${title}.wav`);

        console.log(`Downloading video from URL: ${url}`);
        await youtubeDl(url, { output: videoPath });
        console.log(`Video downloaded to: ${videoPath}`);

        await new Promise((resolve, reject) => {
            ffmpeg()
                .input(videoPath)
                .output(audioPath)
                .on('end', () => {
                    console.log(`Audio conversion completed: ${audioPath}`);
                    resolve(null);
                })
                .on('error', (err) => {
                    console.error(`Error during audio conversion: ${err.message}`);
                    reject(err);
                })
                .save(audioPath);
        });

        fs.unlinkSync(videoPath);
        console.log(`Temporary video file deleted: ${videoPath}`);

        return audioPath;
    } catch (error) {
        console.error(`Failed to download or convert audio: ${error}`);
        throw new Error('Failed to download or convert audio');
    }
};
