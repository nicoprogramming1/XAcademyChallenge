const csvDataService = require("../services/csvDataService");

exports.uploadCSV = async (req, res) => {
  const file = req.file
  console.log("Desde el controller csv, file: ", file)
  try {
    if (!file) {
      // verificar que el archivo fue subido correctamente
      return res.status(400).json({
        success: false,
        message: "No se ha subido ningún archivo",
      });
    }

    await csvDataService.processCSV(file.path);
    res.status(200).json({
      success: true,
      message: "Datos del CSV importados exitosamente",
    });
  } catch (error) {
    console.error("Error al importar CSV:", error);
    res.status(500).json({
      succes: false,
      message: `Error al importar CSV: ${error}`
    });
  }
};
