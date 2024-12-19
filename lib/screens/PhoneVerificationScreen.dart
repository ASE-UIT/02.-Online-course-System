import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:online_course_system/ViewModels/signup_view_model.dart';
import 'package:online_course_system/ViewModels/verifyOTP_view_model.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/models/phone_signup_model.dart';
import 'package:online_course_system/models/verify_phone_model.dart';
import 'package:pin_code_fields/pin_code_fields.dart';
import 'dart:async';
import 'package:provider/provider.dart';

class PhoneVerificationScreen extends StatefulWidget {
  const PhoneVerificationScreen({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _PhoneVerificationScreenState createState() =>
      _PhoneVerificationScreenState();
}

class _PhoneVerificationScreenState extends State<PhoneVerificationScreen> {
  late VerifyOTPViewModel viewModel;
  late SignupViewModel signUpViewModel;
  // late PhoneSignUpRequest phoneSignUpRequest;
  int _timerCountdown = 30;
  Timer? _timer;

  final TextEditingController _pinController = TextEditingController();

  @override
  void initState() {
    super.initState();
    viewModel = Provider.of<VerifyOTPViewModel>(context, listen: false);
    signUpViewModel = Provider.of<SignupViewModel>(context, listen: false);
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

  Future<void> resendOTP(PhoneSignUpRequest phoneSignUpRequest) async {
    setState(() {
      _timerCountdown = 30; // Reset timer
    });
    startTimer();
    // Trigger resend OTP function here
    var info = phoneSignUpRequest.toJson().toString();
    debugPrint('Info: $info');
    await signUpViewModel.phoneSignUp(phoneSignUpRequest);

    // Xử lý thành công hoặc lỗi
    if (viewModel.errorMessage != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(viewModel.errorMessage!)),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Gửi lại OTP thành công!')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final PhoneSignUpRequest phoneSignUpRequest = ModalRoute.of(context)?.settings.arguments as PhoneSignUpRequest;

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
                'Vui lòng nhập OTP được gửi trong tin nhắn để hoàn tất quá trình đăng ký tài khoản.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 16, color: AppColors.black),
              ),
              const SizedBox(height: 20),
              PinCodeTextField(
                controller: _pinController,
                appContext: context,
                length: 6,
                onChanged: (value) {
                  if (value.isNotEmpty &&
                      !RegExp(r'^[0-9]+$').hasMatch(value)) {
                    _pinController.text = value.substring(0, value.length - 1);
                    _pinController.selection = TextSelection.fromPosition(
                        TextPosition(offset: _pinController.text.length));
                  }
                },
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
                      text: 'Gửi lại SĐT sau ${_timerCountdown}s',
                      style: TextStyle(
                          color:
                              _timerCountdown == 0 ? Colors.blue : Colors.grey,
                          fontSize: 16),
                      recognizer: TapGestureRecognizer()
                        ..onTap = () {
                          if (_timerCountdown == 0) {
                            resendOTP(phoneSignUpRequest);
                          }
                        },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () async {
                  if (_pinController.text.length == 6) {
                    final verifyPhoneRequest = VerifyPhoneRequest(
                        phoneNumber: phoneSignUpRequest.phoneNumber,
                        code: _pinController.text);

                    var req = verifyPhoneRequest.toJson().toString();
                    debugPrint('Request: $req');
                    // await viewModel.verify(verifyPhoneRequest);

                    if (viewModel.errorMessage != null) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text(viewModel.errorMessage!)),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Row(
                            children: [
                              Icon(Icons.check_circle, color: Colors.green),
                              SizedBox(width: 10),
                              Text("Xác thực SĐT thành công!"),
                            ],
                          ),
                          backgroundColor: Colors.black87,
                          behavior: SnackBarBehavior.floating,
                          duration: Duration(seconds: 1),
                        ),
                      );

                      Navigator.popUntil(
                        context,
                        (Route<dynamic> route) =>
                            route.settings.name == 'SignInScreen',
                      );
                    }
                  } else {
                    // Handle invalid OTP input
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text("Vui lòng nhập đúng mã OTP."),
                        backgroundColor: Colors.red,
                        behavior: SnackBarBehavior.floating,
                      ),
                    );
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
