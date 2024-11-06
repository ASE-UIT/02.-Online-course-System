import '../models/course_model.dart';
import 'HttpConfig.dart';

class CourseService {

  static const String _courseEndpoint = '/course';

  static Future<Course> getCourseDetail(String courseId) async {
    try {
      final response = await HttpService.get('$_courseEndpoint/$courseId');
      
      return Course.fromJson(response['data']);

    } on HttpException catch (e) {
      throw HttpException(
        e.statusCode,
        message: 'Failed to get course detail: ${e.message}',
      );
    }
  }

  static Future<List<Course>> getAllCourses() async {
    try {
      final response = await HttpService.get(_courseEndpoint);

      final List coursesList = response['data'] as List;
      return coursesList.map((courseJson) => Course.fromJson(courseJson)).toList();
      
    } on HttpException catch (e) {
      throw HttpException(
        e.statusCode,
        message: 'Failed to get all courses: ${e.message}',
      );
    }
  }

}