import { DifficultyLevel } from '@/enums/difficulty-level.enum';
import { IsNotEmpty, IsOptional, IsUUID, IsString, IsNumber, IsEnum, IsDate, Validate } from 'class-validator';
import { Expose } from 'class-transformer';

export const CourseSelectRes = {
  id: true,

  name: true,

  description: true,

  thumbnail: true,

  price: true,

  duration: true,

  difficultyLevel: true,

  startDate: true,

  endDate: true,

  category: {
    id: true,
    name: true
  },

  lecturer: {
    id: true,
    name: true
  }
};
