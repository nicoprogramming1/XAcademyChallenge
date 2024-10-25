const headerMdw = (req, res, next) => {
  // deberia ser solo para rutas especificas
  console.log("Request a url: ", req.url);
  res.setHeader("Content-Type", "Application/json");
  next();
};

module.exports = { headerMdw };
