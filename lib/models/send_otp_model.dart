class SendOTPRequest {
  final String emailOrPhone;

  SendOTPRequest(
      {required this.emailOrPhone});

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
        'emailOrPhone': emailOrPhone,
      };
    }
    
    return {
      'emailOrPhone': formatPhoneNumber(emailOrPhone),
    };
  }
}
