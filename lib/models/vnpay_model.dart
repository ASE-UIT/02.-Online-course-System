//vnpay_model.dart
class VNPay {
  final String status;
  final int code;
  final bool success;
  final String message;
  final VNPayData? data;
  final dynamic errors;

  VNPay({
    required this.status,
    required this.code,
    required this.success,
    required this.message,
    this.data,
    this.errors,
  });

  factory VNPay.fromJson(Map<String, dynamic> json) {
    return VNPay(
      status: json['status'],
      code: json['code'],
      success: json['success'],
      message: json['message'],
      data: json['data'] != null ? VNPayData.fromJson(json['data']) : null,
      errors: json['errors'],
    );
  }
}

class VNPayData {
  final String? payUrl;

  VNPayData({
    this.payUrl,
  });

  factory VNPayData.fromJson(Map<String, dynamic> json) {
    return VNPayData(
      payUrl: json['payUrl'],
    );
  }
}