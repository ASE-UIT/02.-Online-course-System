class ResetPasswordRequest {
  final String emailOrPhone;
  final String newPassword;
  final String otp;

  ResetPasswordRequest({ required this.emailOrPhone, required this.otp, required this.newPassword});

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
        'emailOrPhone': emailOrPhone,
        'newPassword': newPassword,
      };
    }
    
    return {
      'otp': otp,
      'emailOrPhone': formatPhoneNumber(emailOrPhone),
      'newPassword': newPassword,
    };
  }
}
