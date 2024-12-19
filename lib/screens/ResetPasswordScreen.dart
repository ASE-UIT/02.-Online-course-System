import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:online_course_system/ViewModels/change_password_view_model.dart';
import 'package:online_course_system/ViewModels/reset_password.viewmodel.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/models/reset_password_model.dart';
import 'package:online_course_system/models/verify_otp_model.dart';
import 'package:online_course_system/widgets/customtextfield.dart';
import 'package:provider/provider.dart';

class ResetPasswordScreen extends StatefulWidget {
  const ResetPasswordScreen({Key? key}) : super(key: key);

  @override
  State<ResetPasswordScreen> createState() => _ResetPasswordScreenState();
}

class _ResetPasswordScreenState extends State<ResetPasswordScreen> {
  late ResetPasswordViewModel _resetPasswordViewModel;
  bool isLoading = false;

  final TextEditingController newPasswordController = TextEditingController();

  final TextEditingController newPasswordConfirmationController =
      TextEditingController();

  final _formKey = GlobalKey<FormState>();
  bool isButtonEnabled = false;

  @override
  void initState() {
    super.initState();
    _resetPasswordViewModel =
        Provider.of<ResetPasswordViewModel>(context, listen: false);
    newPasswordController.addListener(_updateButtonState);
    newPasswordConfirmationController.addListener(_updateButtonState);
  }

  @override
  void dispose() {
    newPasswordController.removeListener(_updateButtonState);
    newPasswordConfirmationController.removeListener(_updateButtonState);

    newPasswordController.dispose();
    newPasswordConfirmationController.dispose();
    super.dispose();
  }

  void _updateButtonState() {
    setState(() {
      isButtonEnabled = newPasswordController.text.isNotEmpty &&
          newPasswordConfirmationController.text.isNotEmpty;
    });
  }

  void _showDialog(BuildContext context,
      {required String title,
      required String content,
      VoidCallback? onPressed}) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(content),
        actions: [
          TextButton(
            onPressed: onPressed ?? () => Navigator.pop(context),
            child: const Text("OK"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final VerifyOTPRequest verifyOTPRequest =
        ModalRoute.of(context)?.settings.arguments as VerifyOTPRequest;

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.white,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          color: Colors.black,
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: const Text(
          'Đổi mật khẩu',
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
        child: Form(
          key: _formKey,
          autovalidateMode: AutovalidateMode.disabled,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        height: 1.5,
                        color: Colors.black,
                      ),
                      const SizedBox(height: 18),
                      const Text(
                        'THÔNG TIN CÁ NHÂN',
                        style: TextStyle(
                            fontWeight: FontWeight.w400,
                            color: AppColors.gray700,
                            fontSize: 16),
                      ),
                      const SizedBox(height: 8),
                      CustomTextField(
                        hintText: "Mật khẩu mới",
                        prefixIcon: Icons.lock_person,
                        isPassword: true,
                        controller: newPasswordController,
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
                        hintText: "Xác nhận mật khẩu mới",
                        prefixIcon: Icons.lock_person,
                        isPassword: true,
                        controller: newPasswordConfirmationController,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return "Vui lòng xác nhận mật khẩu";
                          }
                          if (value != newPasswordController.text) {
                            return "Mật khẩu không khớp";
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 18),
                      ElevatedButton(
                        onPressed: isButtonEnabled
                            ? () async {
                                if (_formKey.currentState?.validate() ??
                                    false) {
                                  setState(() {
                                    isLoading = true;
                                  });
                                  final resetPasswordRequest =
                                      ResetPasswordRequest(
                                    otp: verifyOTPRequest.otp,
                                    emailOrPhone: verifyOTPRequest.emailOrPhone,
                                    newPassword: newPasswordController.text,
                                  );
                                  await _resetPasswordViewModel
                                      .resetPassword(resetPasswordRequest);

                                  setState(() {
                                    isLoading = false;
                                  });

                                  if (_resetPasswordViewModel.errorMessage !=
                                      null) {
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(
                                          content: Text(_resetPasswordViewModel
                                              .errorMessage!)),
                                    );
                                  } else {
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      const SnackBar(
                                        content: Row(
                                          children: [
                                            Icon(Icons.check_circle,
                                                color: Colors.green),
                                            SizedBox(width: 10),
                                            Text("Lấy lại mật khẩu thành công!"),
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
                                }
                              }
                            : null,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: isButtonEnabled
                              ? AppColors.primary500
                              : AppColors.gray400,
                          minimumSize: const Size(double.infinity, 60),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                        child: const Text(
                          "XÁC NHẬN",
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
            ],
          ),
        ),
      ),
    );
  }
}
