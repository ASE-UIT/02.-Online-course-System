import 'package:flutter/foundation.dart';
import 'package:online_course_system/models/signup_model.dart';

import '../services/HttpConfig.dart';

class SignUpViewModel extends ChangeNotifier {
  //Endpoint cho student 
  static const String _studentEndpoint = '/student';
  bool isLoading = false;

  // Gửi yêu cầu đăng ký bằng email
  Future<void> requestSignUpWithEmail(SignUpRequset request) async {
    try {
      isLoading = true;
      notifyListeners();
      await HttpService.post(
        '$_studentEndpoint/register-email',
        body: {
          'name': request.fullName,
          'email': request.email,
          'password': request.password
        }
        );
    } on HttpException catch (e) {
      throw HttpException(
        e.statusCode,
        message: 'Failed to request signup: ${e.message}'
      );
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  //Xác thực email

  // Gửi yêu cầu đăng ký bằng SDT
  Future<void> requestSignUpWithPhoneNumber(SignUpRequset request) async {
    try {
      isLoading = true;
      notifyListeners();
      await HttpService.post(
        '$_studentEndpoint/register-email',
        body: {
          'name': request.fullName,
          'phoneNumber': request.phoneNumber,
          'password': request.password
        }
        );
    } on HttpException catch (e) {
      throw HttpException(
        e.statusCode,
        message: 'Failed to request signup: ${e.message}'
      );
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  //Xác thực SDT
}