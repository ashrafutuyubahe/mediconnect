const jwt = require('jsonwebtoken');
const logger = require('../utils/logger'); 
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header missing or malformed' });
    }

   
    const token = authHeader.replace('Bearer ', '');

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

  
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }


    req.user = user; 
    next();
  } catch (err) {
    logger.error('Authentication failed:', err);

  
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }

    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authMiddleware;
