import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:online_course_system/ViewModels/change_password_view_model.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/models/change_passwrod_model.dart';
import 'package:online_course_system/widgets/customtextfield.dart';
import 'package:provider/provider.dart';

class ChangePasswordScreen extends StatefulWidget {
  const ChangePasswordScreen({Key? key}) : super(key: key);

  @override
  State<ChangePasswordScreen> createState() => _ChangePasswordScreenState();
}

class _ChangePasswordScreenState extends State<ChangePasswordScreen> {
  late ChangePasswordViewModel _changePasswordViewModel;
  bool isLoading = false;

  final TextEditingController currentPasswordController =
      TextEditingController();

  final TextEditingController newPasswordController = TextEditingController();

  final TextEditingController newPasswordConfirmationController =
      TextEditingController();

  final _formKey = GlobalKey<FormState>();
  bool isButtonEnabled = false;

  @override
  void initState() {
    super.initState();
    _changePasswordViewModel =
        Provider.of<ChangePasswordViewModel>(context, listen: false);
    currentPasswordController.addListener(_updateButtonState);
    newPasswordController.addListener(_updateButtonState);
    newPasswordConfirmationController.addListener(_updateButtonState);
  }

  @override
  void dispose() {
    currentPasswordController.removeListener(_updateButtonState);
    newPasswordController.removeListener(_updateButtonState);
    newPasswordConfirmationController.removeListener(_updateButtonState);

    currentPasswordController.dispose();
    newPasswordController.dispose();
    newPasswordConfirmationController.dispose();
    super.dispose();
  }

  void _updateButtonState() {
    setState(() {
      isButtonEnabled = currentPasswordController.text.isNotEmpty &&
          newPasswordController.text.isNotEmpty &&
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
                        hintText: "Mật khẩu hiện tại",
                        prefixIcon: Icons.lock,
                        isPassword: true,
                        controller: currentPasswordController,
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
                          if (value == currentPasswordController.text) {
                            return "Mật khẩu mới không được giống mật khẩu cũ";
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
                                  final changePasswordRequest =
                                      ChangePasswordRequest(
                                    currentPassword:
                                        currentPasswordController.text,
                                    newPassword: newPasswordController.text,
                                  );
                                  await _changePasswordViewModel
                                      .changePassword(changePasswordRequest);

                                  setState(() {
                                    isLoading = false;
                                  });

                                  if (_changePasswordViewModel.successMessage !=
                                      null) {
                                    _showDialog(
                                      context,
                                      title: "Thành công",
                                      content: _changePasswordViewModel
                                          .successMessage!,
                                      onPressed: () => Navigator.popUntil(
                                          context, (route) => route.isFirst),
                                    );
                                  } else if (_changePasswordViewModel
                                          .errorMessage !=
                                      null) {
                                    _showDialog(
                                      context,
                                      title: "Lỗi",
                                      content: _changePasswordViewModel
                                              .errorMessage ??
                                          "Đã xảy ra lỗi không xác định.",
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
