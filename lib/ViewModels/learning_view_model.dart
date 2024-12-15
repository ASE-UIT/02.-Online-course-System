import 'dart:developer';

import 'package:flutter/foundation.dart';
import 'package:online_course_system/models/QuizAnswerRequest.dart';
import 'package:online_course_system/models/UpdateLearningProgress.dart';
import 'package:online_course_system/models/learning_model.dart';

import '../services/HttpConfig.dart';

class LearningViewModel extends ChangeNotifier {
  final String _learingEndpoint = '/course/learning';
  final String _updateLearningProgressEndpoint =
      '/student-complete-lesson/update-progress';
  bool isLoading = false;
  String? errorMessage;

  Future<LearningModel?> getLearning(String courseId) async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();
    try {
      // Call API to get learning data
      final response = await HttpService.get("$_learingEndpoint/$courseId");
      // Assuming the response is a Map and contains the learning data
      log('Learning data: $response');
      LearningModel _learningResponse = LearningModel.fromJson(response);
      log('Learning data: ${_learningResponse.data!.toJson()}');
      return _learningResponse;
    } catch (e) {
      isLoading = false;
      errorMessage = 'An error occurred: $e';
      log(errorMessage!);
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  Future<void> updateLearningProgress(UpdateLearningProgress request) async {
    isLoading = true;
    errorMessage = null;
    notifyListeners();
    try {
      // Call API to update learning progress
      final response = await HttpService.put("$_updateLearningProgressEndpoint",
          body: request.toJson());
      // Assuming the response is a Map and contains the learning data
      log('Update learning data: $response');
    } catch (e) {
      isLoading = false;
      errorMessage = 'An error occurred: $e';
      log(errorMessage!);
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }

  Future<void> answerQuiz(QuizAnswerRequest request) async {
    notifyListeners();
    try {
      // Call API to answer quiz
      final response = await HttpService.post("/quiz/answer",
          body: request.toJson());
      // Assuming the response is a Map and contains the learning data
      log('Answer quiz data: $response');
    } catch (e) {
      log('Answer failed: $e');
      log(errorMessage!);
    } finally {
      log('Answer OK');
      notifyListeners();
    }
  }
}
