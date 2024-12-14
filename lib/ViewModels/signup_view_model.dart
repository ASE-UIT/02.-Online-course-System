import 'dart:developer';

import 'package:flutter/material.dart';

import '../models/signup_model.dart';
import '../services/HttpConfig.dart';

class SignupViewModel extends ChangeNotifier {
  bool isLoading = false;
  String? errorMessage;


  Future<void> signup(SignUpRequest request) async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();

    log(request.toJson().toString(), name: 'SignUpRequest');

    try {
      final response = await HttpService.post(
        '/student/register-email',
        body: request.toJson(),
      );

      log('SignUp success, response: ${response.toString()}');
    } catch (e) {
      errorMessage = 'Đã xảy ra lỗi: $e';
      debugPrint('Error: $e');
      log(errorMessage!, name: 'SignUpError');
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}
