const roleMdw = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user; // Usuario autenticado por passport

    if (user && user.role === requiredRole) {
      return next(); // si todo ok sigue
    }

    // Si el rol no coincide devuelve acceso denegado
    return res.status(403).json({ message: 'Acceso denegado.' });
  };
};

module.exports = roleMdw;
