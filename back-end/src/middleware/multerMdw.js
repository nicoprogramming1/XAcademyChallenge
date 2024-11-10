const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../files/uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // si no existe crea el directorio
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // aca se guardan los archivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  // aceptar solo archivos CSV
  if (file.mimetype === 'text/csv') {
    cb(null, true); // archivo valido
  } else {
    cb(new Error('Formato de archivo no soportado. Solo se permiten archivos CSV.'), false); // error si no es CSV
  }
};

const uploadCSVMdw = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 100 } // limitar el tamaño del archivo a 100 mb
});

module.exports = uploadCSVMdw;
