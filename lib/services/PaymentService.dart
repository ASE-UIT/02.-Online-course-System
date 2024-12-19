//PaymentService.dart
import 'HttpConfig.dart';
import 'package:online_course_system/models/vnpay_model.dart';

class PaymentService {
  static Future<String?> getVnpayUrl(String paymentId) async {
    try {
      final response = await HttpService.get('/payment/vnp-url/$paymentId');
      return VNPay.fromJson(response).data?.payUrl;
    } catch (e) {
      print("error getVnpayUrl: $e");
      throw Exception('Failed to get VNPAY URL: $e');
    }
  }
}