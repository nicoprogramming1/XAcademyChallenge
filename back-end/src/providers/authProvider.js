const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  console.log("User found:", user); // Verifica si el usuario se encuentra

  if (!user) {
    throw new Error('User not found');
  }

  // La contraseña original
const originalPassword = 'password'; // Asegúrate de que esta sea la contraseña correcta
// Hash de la contraseña que está en la base de datos
const hashedPassword = '$2a$10$kz8o2X5YZce/nT2H.J0D7W8k9Gb6KCEYXZmG6eYgx2b/ymxeQZG1q';

// Compara la contraseña original con el hash
bcrypt.compare(originalPassword, hashedPassword, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('¿Las contraseñas coinciden?', result); // Debería ser `true`
});
  console.log("Password valid:", passwordValid); // Verifica si la contraseña es válida

  if (!passwordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
  return { token, user };
};


module.exports = { authenticateUser };
