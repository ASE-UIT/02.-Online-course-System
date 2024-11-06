import 'package:flutter/material.dart';
import 'package:online_course_system/screens/SignInScreen.dart';
import 'package:online_course_system/widgets/customtextfield.dart';
import 'package:online_course_system/widgets/socialloginbutton.dart';

import '../constants/colors.dart';

class SignUpScreen extends StatelessWidget {
  SignUpScreen({super.key});

  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          backgroundColor: Colors.white,
          body: SingleChildScrollView(
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 0),
              width: double.infinity,
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
                          keyboardType: TextInputType.name,
                          controller: nameController,
                        ),
                        const SizedBox(height: 16),
                        CustomTextField(
                          hintText: "Email",
                          prefixIcon: Icons.email,
                          keyboardType: TextInputType.emailAddress,
                          controller: emailController,
                        ),
                        const SizedBox(height: 16),
                        CustomTextField(
                          hintText: "Nhập số điện thoại",
                          prefixIcon: Icons.phone,
                          keyboardType: TextInputType.phone,
                          controller: phoneController,
                        ),
                        const SizedBox(height: 16),
                        CustomTextField(
                          hintText: 'Mật khẩu',
                          prefixIcon: Icons.lock,
                          isPassword: true,
                          controller: passwordController,
                        ),
                        const SizedBox(height: 18),
                        ElevatedButton(
                          onPressed: () {},
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
                                color: Colors.white
                            ),
                          ),
                        ),
                        const SizedBox(height: 24),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Text('Bạn đã có tài khoản? '),
                            TextButton(
                              onPressed: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(builder: (context) =>  SignInScreen()),
                                );
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
          )),
    );
  }
}
