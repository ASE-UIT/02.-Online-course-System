import 'package:flutter/material.dart';
import 'package:online_course_system/ViewModels/send_OTP_view_model.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/models/send_otp_model.dart';
import 'package:provider/provider.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  late SenOTPViewModel viewModel;

  final TextEditingController emailOrPhoneController = TextEditingController();

  @override
  void initState() {
    super.initState();
    viewModel = Provider.of<SenOTPViewModel>(context, listen: false);
  }

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
          'Quên mật khẩu',
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
            Center(child: Image.asset('assets/bigemail.png', height: 170)),
            const SizedBox(height: 20),
            const Text.rich(
              TextSpan(
                children: [
                  TextSpan(
                    text: 'Nhập email hoặc số điện thoại',
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
            TextField(
              controller: emailOrPhoneController,
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
              ),
              style: const TextStyle(
                fontSize: 18,
                height: 1,
              ),
            ),
            const SizedBox(height: 12),
            ElevatedButton(
              onPressed: () async {
                final sentOTPRequest =
                    SendOTPRequest(emailOrPhone: emailOrPhoneController.text);
                debugPrint("EmailorPhone: " +emailOrPhoneController.text);
                await viewModel.forgotPassword(sentOTPRequest);

                if (viewModel.errorMessage != null) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text(viewModel.errorMessage!)),
                  );
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                        content: Text('Tiến hành xác thực OTP!')),
                  );
                  Navigator.pushNamed(
                      context, 'ForgotPasswordVerificationScreen',
                      arguments: sentOTPRequest);
                }
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
