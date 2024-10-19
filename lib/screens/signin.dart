import 'package:flutter/material.dart';
import 'package:online_course_system/widgets/customtextfield.dart';
import 'package:online_course_system/widgets/socialloginbutton.dart';

class SignInScreen extends StatelessWidget {
  SignInScreen({super.key});

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
                          "Đăng nhập",
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
                        hintText: "Email",
                        prefixIcon: Icons.email,
                        keyboardType: TextInputType.emailAddress,
                        controller: emailController,
                      ),
                      const SizedBox(height: 16),
                      CustomTextField(
                        hintText: 'Mật khẩu',
                        prefixIcon: Icons.lock,
                        isPassword: true,
                        controller: passwordController,
                      ),
                      const SizedBox(height: 18),
                      Container(
                        height: 60,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(12),
                          color: const Color(0xFFBFBFBF),
                        ),
                        child: const Center(
                          child: Text(
                            "ĐĂNG NHẬP",
                            style: TextStyle(
                                color: Color(0xFF747474),
                                fontWeight: FontWeight.w600,
                                fontSize: 16),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      const Align(
                          alignment: Alignment.centerLeft,
                          child: Text('Quên mật khẩu?',
                              style: TextStyle(
                                color: Color(0xFF0038FF),
                                fontWeight: FontWeight.w600,
                                fontSize: 16,
                                decoration: TextDecoration.underline,
                                decorationColor: Color(0xFF0038FF),
                              ))),
                      const SizedBox(height: 16),
                      const Row(children: [
                        Expanded(child: Divider()),
                        Padding(
                          padding: EdgeInsets.symmetric(horizontal: 8),
                          child: Text('Hoặc',
                              style: TextStyle(color: Color(0xFF747474))),
                        ),
                        Expanded(child: Divider()),
                      ]),
                      const SizedBox(height: 16),
                      SocialLoginButton(
                        title: 'Google',
                        imagePath: 'assets/google_logo.png',
                        onPressed: () {},
                      ),
                      const SizedBox(height: 16),
                      SocialLoginButton(
                        title: 'Facebook',
                        imagePath: 'assets/facebook_logo.png',
                        onPressed: () {},
                      ),
                      const SizedBox(height: 16),
                      SocialLoginButton(
                        title: 'Số điện thoại',
                        imagePath: 'assets/phone_logo.png',
                        onPressed: () {},
                      ),
                      const SizedBox(height: 24),
                      const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text('Bạn chưa có tài khoản? '),
                          Text('Đăng ký mới',
                              style: TextStyle(color: Color(0xFF0038FF), fontWeight: FontWeight.w500)),
                        ],
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        ));
  }
}
