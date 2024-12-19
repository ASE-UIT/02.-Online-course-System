class QuizAnswerResponse {
  final String? status;
  final int? code;
  final bool? success;
  final String? message;
  final QuizAnswerData? data;
  final dynamic errors;

  QuizAnswerResponse({
    this.status,
    this.code,
    this.success,
    this.message,
    this.data,
    this.errors,
  });

  QuizAnswerResponse.fromJson(Map<String, dynamic> json)
      : status = json['status'] as String?,
        code = json['code'] as int?,
        success = json['success'] as bool?,
        message = json['message'] as String?,
        data = (json['data'] as Map<String,dynamic>?) != null ? QuizAnswerData.fromJson(json['data'] as Map<String,dynamic>) : null,
        errors = json['errors'];

  Map<String, dynamic> toJson() => {
    'status' : status,
    'code' : code,
    'success' : success,
    'message' : message,
    'data' : data?.toJson(),
    'errors' : errors
  };
}

class QuizAnswerData {
  final bool? answerResult;

  QuizAnswerData({
    this.answerResult,
  });

  QuizAnswerData.fromJson(Map<String, dynamic> json)
      : answerResult = json['answerResult'] as bool?;

  Map<String, dynamic> toJson() => {
    'answerResult' : answerResult
  };
}