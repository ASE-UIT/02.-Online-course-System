
export class UpdateCourseRatingRes{
  id!: string;
  courseId!: string;
  ratingPoint!: number;
  comment?: string;
  liked?: number;
  unliked?: number;

  constructor(courserating: any) {
    this.id = courserating.id;
    this.courseId = courserating.courseId;
    this.ratingPoint = courserating.ratingPoint;
    this.comment = courserating.comment;
    this.liked = courserating.liked;
    this.unliked = courserating.unliked;
  }
}
