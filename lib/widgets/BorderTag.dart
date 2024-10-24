import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';

class BorderTag extends StatelessWidget {
  final String text;

  const BorderTag({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return FilterChip(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      label: Text(
        text,
        style: const TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w500,
          color: AppColors.black,
        ),
      ),
      backgroundColor: Colors.transparent,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: const BorderSide(color: AppColors.black),
      ),
      onSelected: (bool value) {
        print("selected");
      },
      selected: false,
    );
  }
}
