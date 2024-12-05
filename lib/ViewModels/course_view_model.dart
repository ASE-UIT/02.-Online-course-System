import 'dart:developer' as developer;
import 'package:online_course_system/models/course_detail.dart';

import '../models/course_model.dart';
import '../services/HttpConfig.dart';
import 'package:flutter/foundation.dart';

class CourseViewModel extends ChangeNotifier {
  final String _courseEndpoint = '/course';

  // Private fields for state management
  bool _isLoading = false;
  CourseModel? _courseResponse;
  List<Data> _courses = [];
  CourseDetail _courseDetailRespose = CourseDetail();
  CourseDetailData _courseDetail = CourseDetailData();


  // Getters for state
  bool get isLoading => _isLoading;
  List<Data> get courses => _courses;
  CourseModel? get courseResponse => _courseResponse;
  CourseDetailData get courseDetail => _courseDetail;
  // Private method to update loading state
  void _setLoading(bool loading) {
    if (_isLoading != loading) {
      _isLoading = loading;
      notifyListeners();
    }
  }

  Future<void> getCourseDetail(String courseId) async {

    try {
      _setLoading(true);
      developer.log('courseID: ${courseId.toString()}');

      final response = await HttpService.get('$_courseEndpoint/$courseId');
      _courseDetailRespose = CourseDetail.fromJson(response);

      if (_courseDetailRespose.success == true && _courseDetailRespose.data != null) {
        _courseDetail = _courseDetailRespose.data!;
      }
      developer.log('courseID: ${courseId.toString()}');

      developer.log('ok get course detail: ${_courseDetail.toString()}');

    } catch (e) {
      developer.log('Error getting course detail: $e');
      rethrow;
    } finally {
      developer.log('final');
      _setLoading(false);
    }
  }

  Future<void> getAllCourses() async {

    try {
      _setLoading(true);
      final response = await HttpService.get(_courseEndpoint);
      _courseResponse = CourseModel.fromJson(response);
      if (_courseResponse?.success == true && _courseResponse?.data != null) {
        _courses = _courseResponse!.data!;
      } else {
        _courses = [];
      }

    } catch (e) {
      _courses = [];
      rethrow;
    } finally {
      _setLoading(false);

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