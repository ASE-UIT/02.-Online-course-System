import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';

class UpdatePhoneScreen extends StatelessWidget {
  const UpdatePhoneScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.white,
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: const Text(
          'Cập nhật số điện thoại',
          style: TextStyle(
            color: Colors.black,
            fontSize: 20,
            fontWeight: FontWeight.w400,
          ),
        ),
        centerTitle: true,
      ),
      body: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 1.5,
              color: Colors.black,
            ),
            const SizedBox(height: 20),
            Center(child: Image.asset('assets/bigphone.png', height: 230)),
            const SizedBox(height: 20),
            const Text.rich(
              TextSpan(
                children: [
                  TextSpan(
                    text: 'Nhập số điện thoại mới',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w400),
                  ),
                  TextSpan(
                    text: ' *',
                    style: TextStyle(fontSize: 18, color: Colors.red),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            const TextField(
              decoration: InputDecoration(
                border: OutlineInputBorder(),
              ),
              style: TextStyle(
                fontSize: 18,
                height: 1,
              ),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(
                  context,
                  'PhoneVerificationScreen'
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary500,
                minimumSize: const Size(double.infinity, 35),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
              ),
              child: const Text(
                "Tiếp tục",
                style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
