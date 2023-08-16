const jwt = require('jsonwebtoken');
const {BadRequestError} = require('../errors');
const {StatusCodes} = require('http-status-codes');
require('dotenv').config();

const login = async (req, res, next) => {
  const {username, password} = req.body;

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const id = new Date().getDate();
  const token = jwt.sign(
    {
      id,
      username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
  console.log(token);
  res.status(StatusCodes.OK).json({
    msg: 'user created',
    token,
  });
};

const dashboard = async (req, res, next) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(StatusCodes.OK).json({
    msg: `hello ${req.user.username}`,
    secret: `here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {login, dashboard};
