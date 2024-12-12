class VNPay {
  final String? status;
  final int? code;
  final bool? success;
  final String? message;
  final VNPayData? data;
  final dynamic errors;

  VNPay({
    this.status,
    this.code,
    this.success,
    this.message,
    this.data,
    this.errors,
  });

  VNPay.fromJson(Map<String, dynamic> json)
    : status = json['status'] as String?,
      code = json['code'] as int?,
      success = json['success'] as bool?,
      message = json['message'] as String?,
      data = (json['data'] as Map<String,dynamic>?) != null ? VNPayData.fromJson(json['data'] as Map<String,dynamic>) : null,
      errors = json['errors'];

  Map<String, dynamic> toJson() => {
    'status' : status,
    'code' : code,
    'success' : success,
    'message' : message,
    'data' : data?.toJson(),
    'errors' : errors
  };
}

class VNPayData {
  final String? payUrl;

  VNPayData({
    this.payUrl,
  });

  VNPayData.fromJson(Map<String, dynamic> json)
    : payUrl = json['payUrl'] as String?;

  Map<String, dynamic> toJson() => {
    'payUrl' : payUrl
  };
}