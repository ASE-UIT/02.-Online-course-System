// PaymentScreen.dart
import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:intl/intl.dart';
import 'PaymentMethodScreen.dart';

class PaymentScreen extends StatefulWidget {
  final String courseId;
  final String courseName;
  final String lecturerName;
  final String sellPrice;
  final String originalPrice;

  const PaymentScreen({
    Key? key,
    required this.courseId,
    required this.courseName,
    required this.lecturerName,
    required this.sellPrice,
    required this.originalPrice,
  }) : super(key: key);

  @override
  _PaymentScreenState createState() => _PaymentScreenState();

}

class _PaymentScreenState extends State<PaymentScreen> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  String get courseId => widget.courseId;
  String get courseName => widget.courseName;
  String get lecturerName => widget.lecturerName;
  String get sellPrice => widget.sellPrice;
  String get originalPrice => widget.originalPrice;

  String _formatCurrency(String price) {
    final formatter = NumberFormat("#,###", "vi_VN");
    try {
      return formatter.format(int.parse(price)) + 'đ';
    } catch (e) {
      return '0đ';
    }
  }

  void _navigateToPaymentMethodScreen() {
    final customerName = _nameController.text;
    final customerEmail = _emailController.text;
    final customerPhone = _phoneController.text;

    if (customerName.isEmpty || customerEmail.isEmpty || customerPhone.isEmpty) {
      // Hiển thị thông báo lỗi nếu thiếu thông tin
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Vui lòng nhập đầy đủ thông tin!')),
      );
      return;
    }

    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => PaymentMethodScreen(
          courseId: courseId,
          courseName: courseName,
          lecturerName: lecturerName,
          sellPrice: sellPrice,
          originalPrice: originalPrice,
          customerName: customerName,
          customerEmail: customerEmail,
          customerPhone: customerPhone,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.white,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppColors.black),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: const Text(
          'Thông Tin Thanh Toán',
          style: TextStyle(
            color: AppColors.black,
            fontSize: 20,
            fontWeight: FontWeight.w600
          ),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            //Course Info
            const Text(
              'Thông tin khóa học',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w700
              ),
            ),
            const SizedBox(height: 10),
            Text(
              courseName,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600
              ),
            ),
            const SizedBox(height: 10),
            Text(
              lecturerName,
              style: const TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w400
              ),
            ),
            const SizedBox(height: 10),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Text(
                  _formatCurrency(sellPrice),
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700
                  ),
                ),
              ],
            ),
            Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Text(
                    _formatCurrency(originalPrice),
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.gray600,
                      fontWeight: FontWeight.w400,
                      decoration: TextDecoration.lineThrough,
                    ),
                  ),
                ],
              ),
            const SizedBox(height: 20),
            const Text(
              'Thông tin người mua',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w700
              ),
            ),
            const SizedBox(height: 10),
            _buildTextField(
              labelText: 'Họ tên',
              hintText: 'Nhập họ tên',
              controller: _nameController
            ),
            const SizedBox(height: 10),
            _buildTextField(
              labelText: 'Email',
              hintText: 'Nhập email',
              controller: _emailController
            ),
            const SizedBox(height: 10),
            _buildTextField(
              labelText: 'Số điện thoại',
              hintText: 'Nhập số điện thoại',
              controller: _phoneController
            ),
            const SizedBox(height: 20),
            SizedBox(
              width: 430,
              height: 48,
              child: ElevatedButton(
                onPressed: () {
                  _navigateToPaymentMethodScreen();
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary500,
                  padding: const EdgeInsets.all(12),
                    shape: RoundedRectangleBorder( // Thêm RoundedRectangleBorder
                    borderRadius: BorderRadius.circular(8) // Border radius 8px
                  )
                ),
                child: const Text(
                  'Tiếp tục',
                  style: TextStyle(
                    fontSize: 16,
                    color: AppColors.white
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField({ required String labelText, required String hintText, required TextEditingController controller}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        RichText(
          text: TextSpan(
            children: [
              TextSpan(
                text: labelText,
                style: const TextStyle(fontSize: 16, color: Colors.black),
              ),
              TextSpan(
                text: ' *',
                style: const TextStyle(fontSize: 16, color: AppColors.error500),
              ),
            ],
          ),
        ),
        const SizedBox(height: 4),
        TextField(
          controller: controller,
          decoration: InputDecoration(
            hintText: hintText,
            border: OutlineInputBorder(
              borderSide: const BorderSide(width: 1),
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        ),
      ],
    );
  }
}