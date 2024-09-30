import 'dotenv/config';
import { Account } from '../models/account.model';
import { Role } from '../models/role.model';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { BaseModel } from '@/models/base.model';
import { CartItem } from '@/models/cart_item.model';
import { Cart } from '@/models/cart.model';
import { Course } from '@/models/course.model';
import { CourseCategory } from '@/models/course_category.model';
import { CourseKey } from '@/models/course_key.model';
import { Discount } from '@/models/discount.model';
import { Employee } from '@/models/employee.model';
import { Enrollment } from '@/models/enrollment.model';
import { Lecturer } from '@/models/lecturer.model';
import { Lesson } from '@/models/lesson.model';
import { OrderItem } from '@/models/order_item.model';
import { Order } from '@/models/order.model';
import { Payment } from '@/models/payment.model';
import { Permission } from '@/models/permission.model';
import { Quiz } from '@/models/quiz.model';
import { RolePermission } from '@/models/role_permission.model';
import { StudentCompleteLesson } from '@/models/student_complete_lesson.model';
import { StudentCompleteQuiz } from '@/models/student_complete_quiz.model';
import { Student } from '@/models/student.model';
import { GlobalConfig } from '@/utils/config/global-config.util';

const models = [
  Account,
  Role,
  BaseModel,
  CartItem,
  Cart,
  Course,
  CourseCategory,
  CourseKey,
  Discount,
  Employee,
  Enrollment,
  Lecturer,
  Lesson,
  OrderItem,
  Order,
  Payment,
  Permission,
  Quiz,
  RolePermission,
  StudentCompleteLesson,
  StudentCompleteQuiz,
  Student
];

export class AppDataSourceSingleton {
  private static instance: DataSource;

  private constructor() {}

  public static getInstance(): DataSource {
    if (!AppDataSourceSingleton.instance) {
      AppDataSourceSingleton.instance = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'admin',
        database: process.env.DB_NAME || 'test',
        entities: models,
        synchronize: GlobalConfig.database.sync,
        logging: true,
        migrations: [__dirname + '/migrations/*.js']
      });
    }
    return AppDataSourceSingleton.instance;
  }
}

export const AppDataSource = AppDataSourceSingleton.getInstance();
