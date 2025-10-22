// Middleware de autenticación con API Key
export const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  // API Key del proyecto (en producción usar variable de entorno)
  const VALID_API_KEY = process.env.API_KEY || 'YOUR_SECRET_API_KEY_HERE';

  if (!apiKey) {
    return res.status(401).json({
      error: 'API key requerida',
      message: 'Incluye tu API key en el header X-API-Key o como query parameter api_key'
    });
  }

  if (apiKey !== VALID_API_KEY) {
    return res.status(403).json({
      error: 'API key inválida',
      message: 'La API key proporcionada no es válida'
    });
  }

  next();
};

// Middleware opcional para endpoints públicos
export const optionalAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;
  req.authenticated = apiKey === (process.env.API_KEY || 'YOUR_SECRET_API_KEY_HERE');
  next();
};
