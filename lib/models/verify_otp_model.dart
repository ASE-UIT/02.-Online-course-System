class VerifyOTPRequest {
  final String emailOrPhone;
  final String otp;

  VerifyOTPRequest({ required this.emailOrPhone, required this.otp});

  String formatPhoneNumber(String phone) {
    if (phone.startsWith('0')) {
      return '+84${phone.substring(1)}';
    }
    return phone;
  }

  Map<String, dynamic> toJson() {
    final isEmail = emailOrPhone.contains('@');
    if (isEmail) {
      return {
        'otp': otp,
        'emailOrPhone': emailOrPhone
      };
    }
    
    return {
      'otp': otp,
      'emailOrPhone': formatPhoneNumber(emailOrPhone)
    };
  }
}
