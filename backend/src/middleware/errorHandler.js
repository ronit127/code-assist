export function errorHandler(err, req, res, next) {
  console.error('[ErrorHandler]', err.message);

  if (err.status === 429) {
    return res.status(429).json({ error: 'OpenAI rate limit reached. Please wait and try again.' });
  }
  if (err.status === 401) {
    return res.status(401).json({ error: 'Invalid OpenAI API key.' });
  }

  res.status(err.status || 500).json({
    error: err.message || 'An unexpected server error occurred.'
  });
}
