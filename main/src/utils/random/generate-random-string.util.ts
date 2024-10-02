import * as crypto from 'crypto';

export async function generateRandomString(): Promise<string> {
  const token = crypto.randomInt(10, 99);
  const now = new Date();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Tạo chuỗi số
  return `${minutes}${seconds}${token}`;
}
