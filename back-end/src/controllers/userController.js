const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const { authenticateUser } = require("../providers/authProvider");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await authenticateUser(email, password);
    res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso. Bienvenido!",
      data: user,
      token,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "No fue posible iniciar sesión",
      data: null,
    });
  }
};

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // hashea la pass

    const userData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    };

    const registeredUser = await userService.createUser(userData);

    if (registeredUser) {
      return res.status(201).json({
        success: true,
        message: "Usuario registrado con éxito",
        data: registeredUser,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Usuario no registrado",
        data: null,
      });
    }
  } catch (error) {
    console.error("Error en createUser (controller):", error);
    return res.status(500).json({
      success: false,
      message: "Error al intentar registrar el usuario",
      data: null,
    });
  }
};