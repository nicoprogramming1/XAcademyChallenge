const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  console.log("Usuario encontrado:", user);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const passwordValid = await bcrypt.compare(password, user.password);
  console.log("Contraseña valida:", passwordValid);

  if (!passwordValid) {
    throw new Error('Credenciales invalidos');
  }

  const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
  return { token, user };
};


module.exports = { authenticateUser };
