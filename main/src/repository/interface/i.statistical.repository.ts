export interface IStatisticalRepository {
  getStatisticsBetweenDates(time: number): Promise<{
    revenue: number;
    revenuePercentage: number;
    newStudents: number;
    newStudentsPercentage: number;
    newLecturer: number;
    newLecturerPercentage: number;
    coursesPurchased: number;
    coursesPurchasedPercentage: number;
    newCourses: number;
    newCoursesPercentage: number;
    courseRatings: number;
    courseRatingsPercentage: number;
    averageRating: number;
    averageRatingPercentage: number;
  }>;
}
