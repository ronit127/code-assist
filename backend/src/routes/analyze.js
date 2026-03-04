import { Router } from 'express';
import { validateRequest } from '../middleware/validateRequest.js';
import { analyzeCode } from '../services/openaiService.js';
import { searchRelatedContent } from '../services/searchService.js';

export const analyzeRouter = Router();

analyzeRouter.post('/', validateRequest, async (req, res, next) => {
  try {
    const { code, language, context, question } = req.body;

    const analysisResult = await analyzeCode(code, language, context || null, question || null);

    // Replace searchTopics with real links
    const topics = analysisResult.searchTopics || [];
    delete analysisResult.searchTopics;

    const relatedLinks = await searchRelatedContent(topics, language).catch(() => []);
    analysisResult.relatedLinks = relatedLinks;

    res.json(analysisResult);
  } catch (err) {
    next(err);
  }
});
