import 'dart:developer' as developer;
import 'dart:developer';
import 'package:online_course_system/models/CategoryModel.dart';
import 'package:online_course_system/models/course_detail.dart';

import '../models/MyCourses.dart';
import '../models/course_model.dart';
import '../services/HttpConfig.dart';
import 'package:flutter/foundation.dart';

class CourseViewModel extends ChangeNotifier {
  final String _courseEndpoint = '/course';
  String? errorMessage;

  // Private fields for state management
  CourseModel? _courseResponse;
  List<Data> _courses = [];
  CourseDetail _courseDetailRespose = CourseDetail();
  CourseDetailData _courseDetail = CourseDetailData();


  // Getters for state
  List<Data> get courses => _courses;
  CourseModel? get courseResponse => _courseResponse;
  CourseDetailData get courseDetail => _courseDetail;


  Future<void> getCourseDetail(String courseId) async {

    try {
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
      notifyListeners();
    }
  }

  Future<void> getAllCourses() async {

    try {
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
      notifyListeners();

    }
  }
  Future<List<MyCoursesData?>?> getMyCourses() async {
    errorMessage = null;
    notifyListeners();
    try {
      // Call API to get learning data
      final response = await HttpService.get("/enrollment/me");
      // Assuming the response is a Map and contains the learning data
      log('MyCourses data: $response');
      MyCourses _myCoursesResponse = MyCourses.fromJson(response);
      return _myCoursesResponse.data;
    } catch (e) {
      errorMessage = 'An error occurred getMyCourses: $e';
      log(errorMessage!);
    } finally {
      notifyListeners();
    }
    return null;
  }
  Future<List<CategoryData>?>? getCategories() async {
    try {
      final response = await HttpService.get('/course-category');
      log('Category data: $response');
      CategoryModel _categoryResponse = CategoryModel.fromJson(response);
      return _categoryResponse.data;
    } catch (e) {
      log('Error getting categories: $e');
    }
    finally {
      log('Category OK');
      notifyListeners();
    }
    return null;
  }
}