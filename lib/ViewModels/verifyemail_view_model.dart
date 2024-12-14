import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:online_course_system/models/verifyemail_model.dart';

import '../services/HttpConfig.dart';

class VerifyEmailViewModel extends ChangeNotifier {
  bool isLoading = false;
  String? errorMessage;


  Future<void> verify(VerifyEmailRequest request) async {
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
}
