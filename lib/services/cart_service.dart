import 'HttpConfig.dart';

class CartService {
  // Endpoint cho cart
  static const String _cartEndpoint = '/cart';

  // Thêm khóa học vào giỏ hàng
  static Future<void> addToCart(String courseId) async {
    try {
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
    }
  }
}