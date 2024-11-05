const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    throw new Error('Invalid credentials');
  }

  // Generar token con el ID y rol del usuario
  const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
  return { token, user };
};

module.exports = { authenticateUser };
