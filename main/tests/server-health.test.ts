import request from 'supertest';
import app from '../src/server';
import { AppDataSourceSingleton } from '../src/database/db.datasource';

// Khởi tạo kết nối tới cơ sở dữ liệu và khởi động server trước khi chạy các test
beforeAll(async () => {
  await AppDataSourceSingleton.getInstance().initialize();
});

// Đóng kết nối cơ sở dữ liệu sau khi tất cả test hoàn thành
afterAll(async () => {
  await AppDataSourceSingleton.getInstance().destroy();
  console.log('Database disconnected');
});

describe('Test the user routes', () => {
  it('Health should be OK', async () => {
    const res = await request(app).get('/api/v1/health');
    console.log('res body', res.body);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      message: 'OK'
    });
  });
});
