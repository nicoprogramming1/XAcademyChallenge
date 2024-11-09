const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ruta absoluta al directorio de uploads
const uploadDir = path.join(__dirname, '../uploads'); // Usa la ruta absoluta para evitar errores

// Asegurarse de que el directorio de destino exista
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Crea el directorio si no existe
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Directorio donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para el archivo
  }
});

const fileFilter = (req, file, cb) => {
  // Aceptar solo archivos CSV
  if (file.mimetype === 'text/csv') {
    cb(null, true); // Archivo válido
  } else {
    cb(new Error('Formato de archivo no soportado. Solo se permiten archivos CSV.'), false); // Error si no es CSV
  }
};

const uploadCSVMdw = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Limitar el tamaño del archivo a 5 MB
});

module.exports = uploadCSVMdw;
