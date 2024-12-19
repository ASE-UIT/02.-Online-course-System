import 'dart:convert';
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:online_course_system/models/change_passwrod_model.dart';

import '../services/HttpConfig.dart';

class ChangePasswordViewModel extends ChangeNotifier {
  bool isLoading = false;
  String? errorMessage;
  String? successMessage;

  Future<void> changePassword(ChangePasswordRequest request) async {
    isLoading = true;
    errorMessage = null;
    successMessage = null;
    notifyListeners();
    
    try {
      final response = await HttpService.put(
        "/student/change-password",
        body: request.toJson(),
      );

      if (response['success'] == true) {
        // Thành công
        successMessage = response['message'] ?? "Đổi mật khẩu thành công";
        log("Password changed successfully: $successMessage");
      } else {
        // Thất bại
        errorMessage = "Mật khẩu hiện tại không chính xác";
      }

    } catch (e) {
      errorMessage = 'Mật khẩu hiện tại không chính xác';

      // Nếu có phản hồi lỗi từ server, hiển thị thông báo lỗi chi tiết
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}
