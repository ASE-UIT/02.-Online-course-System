import multer from 'multer';
import os from 'os';

// Cấu hình lưu trữ tạm thời
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir()); // Lưu vào thư mục tạm của hệ thống
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Giữ nguyên tên file
  }
});

// Middleware multer để xử lý upload
const uploadImageMiddleware = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // Giới hạn kích thước file là 100MB
});

export default uploadImageMiddleware;
