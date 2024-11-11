const roleMdw = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user; // Usuario autenticado por passport
    console.log("Desde el roleMdw - User:", user);
    console.log("Desde el roleMdw - Required Role:", requiredRole);

    if (user && user.role === requiredRole) {
      return next(); // si todo ok sigue
    }

    // Si el rol no coincide devuelve acceso denegado
    return res.status(403).json({ message: 'Acceso denegado.' });
  };
};

module.exports = roleMdw;
