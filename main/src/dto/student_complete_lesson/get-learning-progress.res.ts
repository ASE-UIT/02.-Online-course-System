class LessonLearnProgress {
  lessonId!: string;
  progress!: number;
  isComplete!: boolean;
  completeAt!: Date;
}

export class GetLearningProgressRes {
  lessonLearnProgresses!: LessonLearnProgress[];
  courseProgress!: number;
  totalCompleteLesson!: number;
  totalLesson!: number;
  totalQuiz!: number;
  totalCompleteQuiz!: number;
}
