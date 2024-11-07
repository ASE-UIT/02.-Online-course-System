import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/screens/AccountUpdateScreen.dart';
import 'package:pin_code_fields/pin_code_fields.dart';
import 'dart:async';

class PhoneVerificationScreen extends StatefulWidget {
  const PhoneVerificationScreen({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _PhoneVerificationScreenState createState() =>
      _PhoneVerificationScreenState();
}

class _PhoneVerificationScreenState extends State<PhoneVerificationScreen> {
  int _timerCountdown = 10;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    startTimer();
  }

  void startTimer() {
    _timer = Timer.periodic(Duration(seconds: 1), (timer) {
      setState(() {
        if (_timerCountdown > 0) {
          _timerCountdown--;
        } else {
          _timer?.cancel();
        }
      });
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void resendOTP() {
    setState(() {
      _timerCountdown = 10; // Reset timer
    });
    startTimer();
    // Trigger resend OTP function here
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.white,
        title: const Text(
          'Xác thực SĐT',
          style: TextStyle(
            color: Colors.black,
            fontSize: 28,
            fontWeight: FontWeight.w800,
          ),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const SizedBox(height: 20),
              Image.asset(
                'assets/bigsent.png',
                height: 255,
              ),
              const SizedBox(height: 20),
              const Text(
                'Chúng tôi đã gửi cho bạn một mã OTP để xác thực SĐT tài khoản. '
                'Vui lòng nhập OTP được gửi trong tin nhắn để hoàn tất quá trình cập nhật email.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 16, color: AppColors.black),
              ),
              const SizedBox(height: 20),
              PinCodeTextField(
                appContext: context,
                length: 6,
                onChanged: (value) {},
                pinTheme: PinTheme(
                  shape: PinCodeFieldShape.box,
                  borderRadius: BorderRadius.circular(5),
                  fieldHeight: 50,
                  fieldWidth: 40,
                  activeColor: Colors.blue,
                  inactiveColor: Colors.grey,
                ),
              ),
              const SizedBox(height: 20),
              RichText(
                textAlign: TextAlign.center,
                text: TextSpan(
                  style: const TextStyle(fontSize: 16, color: Colors.black),
                  children: [
                    const TextSpan(
                      text: 'Chưa nhận được SMS? ',
                      style: TextStyle(fontWeight: FontWeight.w400),
                    ),
                    TextSpan(
                      text: 'Gửi lại email sau ${_timerCountdown}s',
                      style: TextStyle(
                        color: _timerCountdown == 0 ? Colors.blue : Colors.grey, fontSize: 16
                      ),
                      recognizer: TapGestureRecognizer()
                        ..onTap = () {
                          if (_timerCountdown == 0) {
                            resendOTP();
                          }
                        },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => const AccountUpdateScreen()),
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
                  "Xác thực",
                  style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: Colors.white),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
