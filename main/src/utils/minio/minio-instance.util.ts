import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || '', // Địa chỉ MinIO
  port: Number(process.env.MINIO_PORT) || 9099, // Cổng của MinIO (bỏ nếu dùng https)
  useSSL: false, // true nếu dùng https
  accessKey: process.env.MINIO_ACCESS_KEY || '',
  secretKey: process.env.MINIO_SECRET_KEY || ''
});

export default minioClient;
