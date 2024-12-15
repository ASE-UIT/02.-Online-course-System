class QuizAnswerRequest {
  final String? quizId;
  final List<String>? choices;

  QuizAnswerRequest({
    this.quizId,
    this.choices,
  });

  QuizAnswerRequest.fromJson(Map<String, dynamic> json)
      : quizId = json['quizId'] as String?,
        choices = (json['choices'] as List?)?.map((dynamic e) => e as String).toList();

  Map<String, dynamic> toJson() => {
    'quizId' : quizId,
    'choices' : choices
  };
}