import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { analyzeRouter } from './src/routes/analyze.js';
import { errorHandler } from './src/middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

app.use('/api/analyze', analyzeRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`CodeAssistor backend running on port ${PORT}`);
});
