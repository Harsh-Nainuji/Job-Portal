import multer from 'multer';
import path from 'path';

// Set up storage configuration for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure you have an 'uploads' folder in your backend root directory
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Use a unique name for the file using Date.now()
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
});

// Define file filter to allow only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

// Create the multer instance with the defined storage and file filter
const upload = multer({ storage, fileFilter });

export default upload;
