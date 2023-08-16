require('dotenv').config();
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('./../errors');

const authMiddleware = async (req, res, next) => {
  console.log('authMiddleware is called');
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthenticatedError('No token provided');
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {id, username} = decoded;
    req.user = {id, username};
    next();
  } catch (err) {
    throw new UnauthenticatedError('Not authorized to access this route');
  }
};

module.exports = authMiddleware;
