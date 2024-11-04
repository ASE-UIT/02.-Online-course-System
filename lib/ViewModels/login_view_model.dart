import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/login_model.dart';
import '../services/HttpConfig.dart';

class LoginViewModel extends ChangeNotifier {
  bool isLoading = false;
  String? errorMessage;

  Future<void> login(LoginRequest request) async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();
    log(request.toJson().toString());
    try {
      final response = await HttpService.post(
        '/student/login',
        body: request.toJson(),
      );
      // Assuming the response is a Map and contains the token
      String token = response['data']['token'];
      log(token);
      // Save the token to SharedPreferences
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', token);

      log('Token saved: $token');  // Optional: Log the saved token
    } catch (e) {
      isLoading = false;
      // Xử lý lỗi
      errorMessage = 'An error occurred: $e';
      log(errorMessage!);
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}
