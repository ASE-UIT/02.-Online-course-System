import '../models/course_model.dart';
import '../services/HttpConfig.dart';
import 'package:flutter/foundation.dart';

class CourseViewModel extends ChangeNotifier {

  final String _courseEndpoint = '/course';
  bool isLoading = false;

  Future<Course> getCourseDetail(String courseId) async {
    try {
      isLoading = true;
      notifyListeners();

      final response = await HttpService.get('$_courseEndpoint/$courseId');
      return Course.fromJson(response['data']);

    } on HttpException catch (e) {
      throw HttpException(
        e.statusCode,
        message: 'Failed to get course detail: ${e.message}',
      );
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  Future<List<Course>> getAllCourses() async {
    try {
      isLoading = true;
      notifyListeners();

      final response = await HttpService.get(_courseEndpoint);
      final List coursesList = response['data'] as List;
      return coursesList.map((courseJson) => Course.fromJson(courseJson)).toList();
      
    } on HttpException catch (e) {
      throw HttpException(
        e.statusCode,
        message: 'Failed to get all courses: ${e.message}',
      );
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

}