import 'package:flutter/material.dart';

import '../constants/colors.dart';

class CourseCategoryTag extends StatelessWidget {
  final String text;
  final Function(String) onSelected; // Callback khi tag được nhấn

  const CourseCategoryTag({super.key, required this.text, required this.onSelected});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      contentPadding: const EdgeInsets.only(right: 0), // Chỉ giữ padding bên phải
      title: Text(
        text,
        style: const TextStyle(
          color: AppColors.black,
          fontSize: 16,
          fontWeight: FontWeight.w400,
        ),
      ),
      onTap: () {
        onSelected(text); // Gọi callback khi nhấn
      },
      trailing: const Icon(Icons.arrow_forward_ios),
    );
  }
}
