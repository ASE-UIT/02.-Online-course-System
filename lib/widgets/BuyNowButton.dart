import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';

class BuyNowButton extends StatelessWidget {
  const BuyNowButton({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
             color: Colors.black.withOpacity(0.2),
            blurRadius: 8,
            spreadRadius: 0,
            offset: const Offset(0, 0),
          ),
        ],
      ),
      child: ElevatedButton(
        onPressed: () {},
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.warning100,
          padding: const EdgeInsets.symmetric(vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
           //elevation: 8,
           //shadowColor: Colors.black.withOpacity(0.2),
        ),
        child: const Text(
          'Mua ngay',
          style: TextStyle(
            fontSize: 16,
            color: AppColors.warning950,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}