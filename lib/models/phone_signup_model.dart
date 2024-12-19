class PhoneSignUpRequest {
  final String name;
  final String phoneNumber;
  final String password;

  PhoneSignUpRequest(
      {required this.name, required this.phoneNumber, required this.password});

  String formatPhoneNumber(String phone) {
    if (phone.startsWith('0')) {
      return '+84${phone.substring(1)}';
    }
    return phone;
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'phoneNumber': formatPhoneNumber(phoneNumber),
      'password': password,
    };
  }
}
