class LoginRequest {
  final String phoneNumberOrEmail;
  final String password;

  LoginRequest({required this.phoneNumberOrEmail, required this.password});

  Map<String, dynamic> toJson() {
    return {
      'phoneNumberOrEmail': phoneNumberOrEmail,
      'password': password,
    };
  }
}
