export function validateRequest(req, res, next) {
  const { code, language, context } = req.body;

  if (!code || typeof code !== 'string' || code.trim().length === 0) {
    return res.status(400).json({ error: 'Request body must include a non-empty "code" string.' });
  }
  if (code.length > 10000) {
    return res.status(400).json({ error: 'Code exceeds maximum allowed length of 10,000 characters.' });
  }
  if (!language || typeof language !== 'string' || language.trim().length === 0) {
    return res.status(400).json({ error: 'Request body must include a non-empty "language" string.' });
  }
  if (context !== undefined && typeof context !== 'string') {
    return res.status(400).json({ error: '"context" must be a string if provided.' });
  }

  next();
}
