class VerifyEmailRequest {
  final String email;
  final String code;

  VerifyEmailRequest({ required this.email, required this.code});

  Map<String, dynamic> toJson() {
    return {
      'email': email,
      'code': code,
    };
  }
}
