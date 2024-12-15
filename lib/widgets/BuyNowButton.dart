// BuyNowButton.dart
import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/screens/PaymentScreen.dart';

class BuyNowButton extends StatelessWidget {
  final String courseId;
  final String courseName;
  final String lecturerName;
  final String sellPrice;
  final String originalPrice;

  const BuyNowButton({
    Key? key,
    required this.courseId,
    required this.courseName,
    required this.lecturerName,
    required this.sellPrice,
    required this.originalPrice,
  }) : super(key: key);

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
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => PaymentScreen(
                courseId: courseId,
                courseName: courseName,
                lecturerName: lecturerName,
                sellPrice: sellPrice,
                originalPrice: originalPrice,
              ),
            ),
          );
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.warning100,
          padding: const EdgeInsets.symmetric(vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
          ),
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