import 'package:flutter/foundation.dart';

import '../services/HttpConfig.dart';

class CartService extends ChangeNotifier {
  // Endpoint cho cart
  static const String _cartEndpoint = '/cart';
  bool isLoading = false;

  // Thêm khóa học vào giỏ hàng
  Future<void> addToCart(String courseId) async {
    try {
      isLoading = true;
      notifyListeners();
      await HttpService.post(
        '$_cartEndpoint/add',
        body: {
          'courseId': courseId,
        },
      );

    } on HttpException catch (e) {
      throw HttpException(
        e.statusCode,
        message: 'Failed to add to cart: ${e.message}',
      );
    } finally {
      isLoading = false;
      notifyListeners();
    }
  }
}