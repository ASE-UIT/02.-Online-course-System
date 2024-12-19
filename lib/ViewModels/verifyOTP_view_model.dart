import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:online_course_system/models/verify_email_model.dart';
import 'package:online_course_system/models/verify_phone_model.dart';

import '../services/HttpConfig.dart';

class VerifyOTPViewModel extends ChangeNotifier {
  bool isLoading = false;
  String? errorMessage;


  Future<void> verifyEmail(VerifyEmailRequest request) async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();

    log(request.toJson().toString(), name: 'VerifyEmailRequest');

    try {
      final response = await HttpService.post(
        '/student/activate-email',
        body: request.toJson(),
      );

      log('VerifyEmail success, response: ${response.toString()}');
    } catch (e) {
      errorMessage = 'Đã xảy ra lỗi: $e';
      debugPrint('Error: $e');
      log(errorMessage!, name: 'VerifyEmailError');
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  Future<void> verifyPhone(VerifyPhoneRequest request) async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();

    log(request.toJson().toString(), name: 'VerifyPhoneRequest');

    try {
      final response = await HttpService.post(
        '/student/activate-phone',
        body: request.toJson(),
      );

      log('VerifyEmail success, response: ${response.toString()}');
    } catch (e) {
      errorMessage = 'Đã xảy ra lỗi: $e';
      debugPrint('Error: $e');
      log(errorMessage!, name: 'VerifyPhoneError');
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}
