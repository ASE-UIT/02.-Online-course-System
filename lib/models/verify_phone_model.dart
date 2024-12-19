class VerifyPhoneRequest {
  final String phoneNumber;
  final String code;

  VerifyPhoneRequest({ required this.phoneNumber, required this.code});

  String formatPhoneNumber(String phone) {
    if (phone.startsWith('0')) {
      return '+84${phone.substring(1)}';
    }
    return phone;
  }

  Map<String, dynamic> toJson() {
    return {
      'phoneNumber': formatPhoneNumber(phoneNumber),
      'code': code,
    };
  }
}
