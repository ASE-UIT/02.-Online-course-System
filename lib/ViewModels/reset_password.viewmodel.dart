import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:online_course_system/models/reset_password_model.dart';

import '../services/HttpConfig.dart';

class ResetPasswordViewModel extends ChangeNotifier {
  bool isLoading = false;
  String? errorMessage;


  Future<void> resetPassword(ResetPasswordRequest request) async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();

    log(request.toJson().toString(), name: 'ResetPasswordRequest');

    try {
      final response = await HttpService.post(
        '/student/reset-password',
        body: request.toJson(),
      );

      log('Reset password success, response: ${response.toString()}');
    } catch (e) {
      errorMessage = 'Đã xảy ra lỗi: $e';
      debugPrint('Error: $e');
      log(errorMessage!, name: 'ResetPasswordError');
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}
