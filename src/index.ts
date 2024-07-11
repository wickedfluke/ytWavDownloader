import express from 'express';
import path from 'path';
import { downloadAudio } from './api/download/dw.controller';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/api/audio/download', downloadAudio);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
