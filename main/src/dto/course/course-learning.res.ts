import { CourseDetailRes } from '@/dto/course/course-detail.res';
import { Course } from '@/models/course.model';
import { CourseCategory } from '@/models/course_category.model';
import { Lecturer } from '@/models/lecturer.model';
import { Lesson } from '@/models/lesson.model';
import { LessonPart } from '@/models/lesson_part.model';
import { Quiz } from '@/models/quiz.model';

class LessonDto extends Lesson {
  progress!: number;
  isComplete!: boolean;
  completeAt?: Date;
}

class QuizDto extends Quiz {
  isComplete!: boolean;

  correctChoices?: string[];
}

class LessonPartDto extends LessonPart {
  lessons!: LessonDto[];

  quizzes!: QuizDto[];
}

export class CourseLearningRes extends Course {
  lessonParts!: LessonPartDto[];

  //Learning progress
  learningProgress!: {
    courseProgress: number;
    totalCompleteLesson: number;
    totalLesson: number;
  };
}
