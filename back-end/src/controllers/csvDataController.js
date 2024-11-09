const csvDataService = require("../services/csvDataService");
const fs = require("fs")

exports.uploadCSV = async (req, res) => {
  const file = req.file;
  console.log("Desde el controller csv, file: ", file);
  try {
    if (!file) {
      // verificar que el archivo fue subido correctamente
      return res.status(400).json({
        success: false,
        message: "No se ha subido ningún archivo",
      });
    }

    await csvDataService.importCSV(file.path);
    res.status(200).json({
      success: true,
      message: "Datos del CSV importados exitosamente",
    });
  } catch (error) {
    console.error("Error al importar CSV:", error);
    res.status(500).json({
      succes: false,
      message: `Error al importar CSV: ${error}`,
    });
  }
};

exports.downloadCSV = async (req, res) => {
  try {
    const csvFilePath = await csvDataService.exportCSV(); // Genera el archivo CSV

    if (!csvFilePath || !fs.existsSync(csvFilePath)) {
      return res.status(400).send('Error al exportar el CSV: El archivo no existe.');
    }

    // Creamos un flujo de lectura (stream) del archivo
    const fileStream = fs.createReadStream(csvFilePath);

    // Configuramos los encabezados de la respuesta para la descarga del archivo
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=database_export_${Date.now()}.csv`);

    // Pipe el archivo al response para enviar el archivo al cliente
    fileStream.pipe(res);

    // Eliminar el archivo después de enviarlo (esto es opcional)
    fileStream.on('end', () => {
      fs.unlinkSync(csvFilePath); // Eliminamos el archivo del servidor
    });

    fileStream.on('error', (err) => {
      console.error('Error al enviar el archivo:', err);
      res.status(500).send('Error al enviar el archivo.');
    });

  } catch (error) {
    console.error("Ha ocurrido un error en el controller csv:", error);
    res.status(500).send('Ha ocurrido un error al exportar el archivo CSV.');
  }
};