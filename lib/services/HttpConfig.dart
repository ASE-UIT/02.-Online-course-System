import 'dart:convert';
import 'dart:developer';
import 'dart:typed_data';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class HttpService {
  // Base URL của API
  static const String baseUrl = 'http://152.42.232.101/eduhub-api/api/v1';
  static final storage = new FlutterSecureStorage();
  // API Key nếu cần
  static const String apiKey = 'YOUR_API_KEY';
  static String getUrl() {
    return baseUrl;
  }

// Lấy token từ SharedPreferences
  static Future<String?> _getToken() async {
    String? token = await storage.read(key: 'token');
    return token; // Khóa lưu token
  }

  // GET Request
  static Future<dynamic> get(String endpoint) async {
    try {
      final token = await _getToken();
      final response = await http.get(
        Uri.parse('$baseUrl$endpoint'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      return _handleResponse(response);
    } catch (e) {
      throw Exception('Failed to perform GET request: $e');
    }
  }

  // POST Request
  // POST Request
  static Future<dynamic> post(String endpoint,
      {Map<String, dynamic>? body}) async {
    try {
      final token = await _getToken();

      final response = await http.post(
        Uri.parse('$baseUrl$endpoint'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(body),
      );

      return _handleResponse(response);
    } catch (e) {
      throw Exception('Failed to perform POST request: $e');
    }
  }

  // PUT Request
  static Future<dynamic> put(String endpoint,
      {Map<String, dynamic>? body}) async {
    try {
      final token = await _getToken();
      final response = await http.put(
        Uri.parse('$baseUrl$endpoint'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(body),
      );

      return _handleResponse(response);
    } catch (e) {
      throw Exception('Failed to perform PUT request: $e');
    }
  }

  // DELETE Request
  static Future<dynamic> delete(String endpoint) async {
    try {
      final token = await _getToken();
      final response = await http.delete(
        Uri.parse('$baseUrl$endpoint'),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
      );

      return _handleResponse(response);
    } catch (e) {
      throw Exception('Failed to perform DELETE request: $e');
    }
  }

  // Elastic search
  static Future<dynamic> searchElasticsearchEduhub(
      Map<String, dynamic> query) async {
    try {
      final token = await _getToken();
      final response = await http.post(
        Uri.parse(
            'https://eduhub.io.vn/eduhub-search/courses/_search?filter_path=hits.hits._source,hits.total'),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(query),
      );

      return _handleResponse(response);
    } catch (e) {
      throw Exception('Failed to perform Elasticsearch search: $e');
    }
  }

  // Xử lý response
  static dynamic _handleResponse(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      final Uint8List bodyBytes =
          response.bodyBytes; // Dùng bodyBytes thay vì body
      final String decodedBody = utf8.decode(bodyBytes);
      return jsonDecode(decodedBody);
    } else {
      throw HttpException(
        response.statusCode,
        message: response.body,
      );
    }
  }
}

// Custom Exception để xử lý lỗi HTTP
class HttpException implements Exception {
  final int statusCode;
  final String message;

  HttpException(this.statusCode, {required this.message});

  @override
  String toString() =>
      'HttpException: Status Code: $statusCode, Message: $message';
}
