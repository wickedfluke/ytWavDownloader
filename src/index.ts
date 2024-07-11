import express from 'express';
import path from 'path';
import { downloadAndConvertAudio } from './api/download/dw.service';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/api/audio/download', async (req, res) => {
    const { url } = req.body;
    try {
        const audioPath = await downloadAndConvertAudio(url);
        res.json({ path: `/audio/${path.basename(audioPath)}` });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
