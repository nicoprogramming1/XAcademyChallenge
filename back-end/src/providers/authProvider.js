const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  console.log("User found:", user);

  if (!user) {
    throw new Error('User not found');
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  console.log("Password valid:", passwordValid);

  if (!passwordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
  return { token, user };
};


module.exports = { authenticateUser };
