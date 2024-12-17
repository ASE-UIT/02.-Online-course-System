import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:online_course_system/ViewModels/signup_view_model.dart';
import 'package:online_course_system/models/phonesignup_model.dart';
import 'package:online_course_system/widgets/customtextfield.dart';
import 'package:provider/provider.dart';
import '../constants/colors.dart';

class PhoneSignUpScreen extends StatefulWidget {
  const PhoneSignUpScreen({Key? key}) : super(key: key);

  @override
  State<PhoneSignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<PhoneSignUpScreen> {
  late SignupViewModel viewModel;

  final TextEditingController nameController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController passwordConfirmationController =
      TextEditingController();

  // Key để kiểm soát form
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
    viewModel = Provider.of<SignupViewModel>(context, listen: false);
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.white,
        body: SingleChildScrollView(
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 0),
            width: double.infinity,
            child: Form(
              key: _formKey,
              child: Column(
                children: <Widget>[
                  IntrinsicHeight(
                    child: Stack(
                      children: <Widget>[
                        Align(
                          alignment: Alignment.centerLeft,
                          child: IconButton(
                            icon: Image.asset('assets/arrowleft_icon.png',
                                height: 40),
                            onPressed: () {
                              Navigator.pop(context);
                            },
                          ),
                        ),
                        const Center(
                          child: Text(
                            "Đăng ký",
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 28,
                                fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 35),
                  Image.asset('assets/eduhublogo.png', height: 40),
                  const SizedBox(height: 35),
                  Container(
                    margin: const EdgeInsets.symmetric(horizontal: 30),
                    child: Column(
                      children: [
                        CustomTextField(
                          hintText: "Họ và tên",
                          prefixIcon: Icons.person,
                          controller: nameController,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return "Vui lòng nhập họ và tên";
                            }
                            return null;
                          },
                        ),
                        const SizedBox(height: 16),
                        CustomTextField(
                          hintText: "Số điện thoại",
                          prefixIcon: Icons.phone,
                          keyboardType: TextInputType.phone,
                          controller: phoneController,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return "Vui lòng nhập số điện thoại";
                            }
                            if (!RegExp(
                                    r"^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$")
                                .hasMatch(value)) {
                              return "Số điện thoại không hợp lệ";
                            }
                            return null;
                          },
                        ),
                        const SizedBox(height: 16),
                        CustomTextField(
                          hintText: "Mật khẩu",
                          prefixIcon: Icons.lock,
                          isPassword: true,
                          controller: passwordController,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return "Vui lòng nhập mật khẩu";
                            }
                            if (value.length < 6) {
                              return "Mật khẩu phải có ít nhất 6 ký tự";
                            }
                            return null;
                          },
                        ),
                        const SizedBox(height: 16),
                        CustomTextField(
                          hintText: "Xác nhận mật khẩu",
                          prefixIcon: Icons.lock_person,
                          isPassword: true,
                          controller: passwordConfirmationController,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return "Vui lòng xác nhận mật khẩu";
                            }
                            if (value != passwordController.text) {
                              return "Mật khẩu không khớp";
                            }
                            return null;
                          },
                        ),
                        const SizedBox(height: 20),
                        ElevatedButton(
                          onPressed: () async {
                            if (_formKey.currentState!.validate()) {
                              log('Form hợp lệ');
                              final signupRequest = PhoneSignUpRequest(
                                name: nameController.text,
                                phoneNumber: phoneController.text,
                                password: passwordController.text,
                              );

                              var info = signupRequest.toJson().toString();
                              debugPrint('Info: $info');
                              await viewModel.phoneSignUp(signupRequest);

                              // Xử lý thành công hoặc lỗi
                              if (viewModel.errorMessage != null) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                      content: Text(viewModel.errorMessage!)),
                                );
                              } else {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                      content: Text(
                                          'Tiến hành xác thực số điện thoại!')),
                                );
                                Navigator.pushNamed(
                                    context, 'PhoneVerificationScreen',
                                    arguments: signupRequest);
                              }
                            } else {
                              log('Form không hợp lệ');
                            }
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppColors.primary500,
                            minimumSize: const Size(double.infinity, 60),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          child: const Text(
                            "ĐĂNG KÝ",
                            style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w600,
                                color: Colors.white),
                          ),
                        ),
                        const SizedBox(height: 24),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Text('Hoặc đăng ký bằng số thoại? '),
                            TextButton(
                              onPressed: () {
                                Navigator.pushNamed(context, 'SignInScreen');
                              },
                              style: TextButton.styleFrom(
                                padding: EdgeInsets.zero,
                                minimumSize: Size.zero,
                                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                              ),
                              child: const Text(
                                'Đăng ký mới',
                                style: TextStyle(
                                  color: Color(0xFF0038FF),
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 24),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Text('Bạn đã có tài khoản? '),
                            TextButton(
                              onPressed: () {
                                Navigator.pushNamed(context, 'SignInScreen');
                              },
                              style: TextButton.styleFrom(
                                padding: EdgeInsets.zero,
                                minimumSize: Size.zero,
                                tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                              ),
                              child: const Text(
                                'Đăng nhập',
                                style: TextStyle(
                                  color: Color(0xFF0038FF),
                                  fontWeight: FontWeight.w500,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
