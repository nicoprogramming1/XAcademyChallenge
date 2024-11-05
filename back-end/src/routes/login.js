const express = require('express');
const { authenticateUser } = require('../providers/authProvider');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await authenticateUser(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
