class ChangePasswordRequest {
  final String currentPassword;
  final String newPassword;

  ChangePasswordRequest({required this.currentPassword, required this.newPassword});

  Map<String, dynamic> toJson() {
    return {
    'currentPassword': currentPassword,
    'newPassword': newPassword,
  };
  }
}
