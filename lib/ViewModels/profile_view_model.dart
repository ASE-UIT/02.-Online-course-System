import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:online_course_system/models/ProfileModel.dart';
import 'package:online_course_system/models/UpdateStudentInfo.dart';

import '../services/HttpConfig.dart';

class ProfileViewModel extends ChangeNotifier {
  bool isLoading = false;
  String? errorMessage;
  ProfileData? _cachedProfileData; // Cached profile data

  // Getter for cached profile data
  ProfileData? get cachedProfileData => _cachedProfileData;

  // Method to fetch profile data with caching
  Future<ProfileData?> getMyProfile() async {
    errorMessage = null;
    notifyListeners();

    // Return cached data if available
    if (_cachedProfileData != null) {
      return _cachedProfileData;
    }

    try {
      // Call API to get profile data
      final response = await HttpService.get("/student/me");

      log('MyProfile data: $response');
      ProfileModel _myCoursesResponse = ProfileModel.fromJson(response);
      _cachedProfileData = _myCoursesResponse.data; // Cache the data
      return _cachedProfileData;
    } catch (e) {
      errorMessage = 'An error occurred getMyProfile: $e';
      log(errorMessage!);
    } finally {
      notifyListeners();
    }
    return null;
  }

  Future<ProfileData?> getMyProfileCache() async {
    errorMessage = null;
    notifyListeners();

    try {
      // Call API to get profile data
      final response = await HttpService.get("/student/me");

      log('MyProfile data: $response');
      ProfileModel _myCoursesResponse = ProfileModel.fromJson(response);
      _cachedProfileData = _myCoursesResponse.data; // Cache the data
      return _cachedProfileData;
    } catch (e) {
      errorMessage = 'An error occurred getMyProfile: $e';
      log(errorMessage!);
    } finally {
      notifyListeners();
    }
    return null;
  }

  // Method to update profile data
  Future<void> updateMyProfile(UpdateStudentInfo request) async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();
    try {
      final response = await HttpService.put("/student/update-my-profile",
          body: request.toJson());
      debugPrint('Update Student data: $response');

      // Trực tiếp cập nhật cached data thay vì gọi lại API
      if (response != null && response['data'] != null) {
        _cachedProfileData = ProfileData.fromJson(response['data']);
        notifyListeners(); // Thông báo ngay lập tức về sự thay đổi
      } else {
        // Nếu response không như mong đợi, mới gọi lại getMyProfile()
        _cachedProfileData = await getMyProfileCache();
      }
      debugPrint("Cached data: " + _cachedProfileData!.toJson().toString());
    } catch (e) {
      isLoading = false;
      errorMessage = 'An error occurred: $e';
      log(errorMessage!);
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  // Method to clear the cached profile data (e.g., for logout)
  void clearProfileCache() {
    _cachedProfileData = null;
    notifyListeners();
  }
}
