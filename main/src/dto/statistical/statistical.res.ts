export class StatisticalRes {
  revenue!: number;
  newStudents!: number;
  newLecturer!: number;
  newCourses!: number;
  coursesPurchased!: number;
  courseRatings!: number;
  averageRating!: number;

  revenuePercentage!: number;
  newStudentsPercentage!: number;
  newCoursesPercentage!: number;
  newLecturerPercentage!: number;
  coursesPurchasedPercentage!: number;
  courseRatingsPercentage!: number;
  averageRatingPercentage!: number;
  constructor(data: {
    revenue: number;
    newStudents: number;
    newLecturer: number;
    newCourses: number;
    coursesPurchased: number;
    courseRatings: number;
    averageRating: number;
    revenuePercentage: number;
    newStudentsPercentage: number;
    newCoursesPercentage: number;
    newLecturerPercentage: number;
    coursesPurchasedPercentage: number;
    courseRatingsPercentage: number;
    averageRatingPercentage: number;
  }) {
    this.revenue = data.revenue;
    this.newStudents = data.newStudents;
    this.newLecturer = data.newLecturer;
    this.newCourses = data.newCourses;
    this.coursesPurchased = data.coursesPurchased;
    this.courseRatings = data.courseRatings;
    this.averageRating = data.averageRating;
    this.revenuePercentage = data.revenuePercentage;
    this.newStudentsPercentage = data.newStudentsPercentage;
    this.newCoursesPercentage = data.newCoursesPercentage;
    this.newLecturerPercentage = data.newLecturerPercentage;
    this.coursesPurchasedPercentage = data.coursesPurchasedPercentage;
    this.courseRatingsPercentage = data.courseRatingsPercentage;
    this.averageRatingPercentage = data.averageRatingPercentage;
  }
}
