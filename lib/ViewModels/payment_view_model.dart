// payment_view_model.dart
import 'package:flutter/foundation.dart';
import '../services/HttpConfig.dart';
import '../models/payment_model.dart';
import '../services/PaymentService.dart';

class PaymentViewModel extends ChangeNotifier {
  PaymentResponse? _paymentResponse;
  String? _paymentUrl;

  PaymentResponse? get paymentResponse => _paymentResponse;
  String? get paymentUrl => _paymentUrl;

  Future<void> createOrder(String courseId, String customerName, String customerEmail, String customerPhone) async {
    try {
      final response = await HttpService.post(
        '/order/create-order/with-course-ids',
        body: {
          "payType": "VNPAY",
          "customerFullname": customerName,
          "customerEmail": customerEmail,
          "customerPhone": customerPhone,
          "courseIds": [courseId],
        },
      );

      _paymentResponse = PaymentResponse.fromJson(response);

      if (_paymentResponse != null && _paymentResponse!.success) {
        final paymentId = _paymentResponse!.data!.paymentId;
        _paymentUrl = await PaymentService.getVnpayUrl(paymentId);
      }

      notifyListeners();
    } catch (e) {
      print("Error creating order: $e");
      rethrow;
    }
  }
}