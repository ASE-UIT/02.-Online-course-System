class LoginRequest {
  final String phoneNumberOrEmail;
  final String password;

  LoginRequest({required this.phoneNumberOrEmail, required this.password});

  String formatPhoneNumber(String input) {
    final phoneRegex = RegExp(r'^0\d+$');
    if (phoneRegex.hasMatch(input)) {
      return '+84${input.substring(1)}'; 
    }
    return input; 
  }

  Map<String, dynamic> toJson() {
    return {
      'phoneNumberOrEmail': formatPhoneNumber(phoneNumberOrEmail),
      'password': password,
    };
  }
}
