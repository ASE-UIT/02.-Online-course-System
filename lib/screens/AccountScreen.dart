import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/widgets/CustomListTitle.dart';
import 'package:online_course_system/widgets/FavoriteCard.dart';

class AccountScreen extends StatelessWidget {
  const AccountScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.white,
        title: const Center(
          child: Text(
            'Tài khoản',
            style: TextStyle(
              color: Colors.black,
              fontSize: 20,
              fontWeight: FontWeight.w400,
            ),
          ),
        ),
      ),
      body: Center(
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              Container(
                height: 1.5, // Thickness of the separator
                color: Colors.black, // Color of the separator
              ),
              const SizedBox(height: 24),
              Container(
                width: 140, // Kích thước cố định
                height: 140,
                child: const CircleAvatar(
                    backgroundImage:
                        // NetworkImage('URL_của_ảnh'),
                        AssetImage('assets/avatar_example.png')),
              ),
              const SizedBox(height: 24),
              const Text(
                'Nguyễn Hình Duy H',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 24),
              const Text(
                'Trở thành giảng viên',
                style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                    color: AppColors.primary500),
              ),
              const SizedBox(height: 24),
              CustomListTile(
                title: 'Cập nhật thông tin',
                onTap: () {},
              ),
              CustomListTile(
                title: 'Đổi mật khẩu',
                onTap: () {},
              ),
              CustomListTile(
                title: 'Xóa mật khẩu',
                onTap: () {},
              ),
              const SizedBox(height: 12),
              const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.logout,
                    color: AppColors.error500,
                    size: 24,
                  ),
                  SizedBox(width: 8),
                  Text(
                    'ĐĂNG XUẤT',
                    style: TextStyle(
                      color: AppColors.error500,
                      fontSize: 16,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
