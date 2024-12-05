import 'dart:developer' as developer;
import '../models/course_model.dart';
import '../services/HttpConfig.dart';
import 'package:flutter/foundation.dart';

class CourseViewModel extends ChangeNotifier {
  final String _courseEndpoint = '/course';

  // Private fields for state management
  bool _isLoading = false;
  CourseModel? _courseResponse;
  List<Data> _courses = [];

  // Getters for state
  bool get isLoading => _isLoading;
  List<Data> get courses => _courses;
  CourseModel? get courseResponse => _courseResponse;

  // Private method to update loading state
  void _setLoading(bool loading) {
    if (_isLoading != loading) {
      _isLoading = loading;
      notifyListeners();
    }
  }

  Future<Data?> getCourseDetail(String courseId) async {
    if (_isLoading) return null;

    try {
      _setLoading(true);

      final response = await HttpService.get('$_courseEndpoint/$courseId');
      final courseModel = CourseModel.fromJson(response);

      if (courseModel.success == true && courseModel.data != null && courseModel.data!.isNotEmpty) {
        return courseModel.data!.first;
      }
      return null;

    } catch (e) {
      developer.log('Error getting course detail: $e');
      rethrow;
    } finally {
      _setLoading(false);
    }
  }

  Future<void> getAllCourses() async {
    if (_isLoading) return;

    try {
      developer.log('Loading courses...');
      _setLoading(true);

      final response = await HttpService.get(_courseEndpoint);
      developer.log(response.toString());

      _courseResponse = CourseModel.fromJson(response);
      developer.log('Course response: $_courseResponse');


      if (_courseResponse?.success == true && _courseResponse?.data != null) {
        _courses = _courseResponse!.data!;
        developer.log('Successfully loaded ${_courses.length} courses');
      } else {
        developer.log('Failed to load courses: ${_courseResponse?.message}');
        _courses = [];
      }

    } catch (e) {
      developer.log('Error loading courses 1: $e');
      _courses = [];
      rethrow;
    } finally {
      developer.log('finally');
      _setLoading(false);
      developer.log(isLoading.toString());

    }
  }

  // Helper method to get course status
  String getCourseStatus(Data course) {
    return course.status ?? 'UNKNOWN';
  }

  // Helper method to get formatted price
 /* String getFormattedPrice(Data course) {
    final sellPrice = course.sellPrice ?? '0';
    final originalPrice = course.originalPrice ?? '0';
    return double.parse(sellPrice) > 0 ? sellPrice : originalPrice;
  }*/

  // Helper method to check if course is free
  /*bool isFree(Data course) {
    final price = getFormattedPrice(course);
    return double.parse(price) <= 0;
  }*/
}