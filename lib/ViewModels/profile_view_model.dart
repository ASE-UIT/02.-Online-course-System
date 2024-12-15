import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:online_course_system/models/ProfileModel.dart';

import '../services/HttpConfig.dart';

class ProfileViewModel extends ChangeNotifier {
  bool isLoading = false;
  String? errorMessage;

  Future<ProfileData?> getMyProfile() async {
    errorMessage = null;
    notifyListeners();
    try {
      // Call API to get profile data
      final response = await HttpService.get("/student/me");

      log('MyProfile data: $response');
      ProfileModel _myCoursesResponse = ProfileModel.fromJson(response);
      return _myCoursesResponse.data;
    } catch (e) {
      errorMessage = 'An error occurred getMyProfile: $e';
      log(errorMessage!);
    } finally {
      notifyListeners();
    }
    return null;
  }
}
