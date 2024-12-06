import 'package:flutter/material.dart';
import 'package:online_course_system/screens/LearningScreen.dart';

import '../constants/colors.dart';

class StudyCard extends StatelessWidget {
  final String courseName;
  final String authorName;
  final double progress;
  String imageUrl = 'https://example.com/course-image.jpg';

  StudyCard({
    Key? key,
    required this.courseName,
    required this.authorName,
    required this.imageUrl,
    required this.progress,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        // Navigate to course details screen
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => CourseScreen()),
        );      },
      child: Card(
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
          side: const BorderSide(
            color: Color(0xFFEFEFEF),
            width: 1,
          ),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Image.asset(
              "assets/coursecard.png",
              width: 80,
              fit: BoxFit.fitWidth,
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      courseName,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: AppColors.black,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      authorName,
                      style: const TextStyle(
                        fontSize: 14,
                        color: Color(0xFF747474),
                      ),
                    ),
                    const SizedBox(height: 4),
                    progress == 0 ?
                    const Text(
                      'Bắt đầu khóa học',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.primary500,
                      ),
                    ) :
                    LinearProgressIndicator(
                      value: progress,
                      backgroundColor: AppColors.gray400,
                      valueColor:
                          AlwaysStoppedAnimation<Color>(AppColors.primary900),
                    ),
                    const SizedBox(height: 4),
                    if (progress == 1)
                      const Text(
                        'Đã hoàn thành',
                        style: TextStyle(
                          fontSize: 12,
                          color: AppColors.primary500,
                        ),
                      ),
                    if (progress < 1 && progress > 0)
                      Text(
                        'Hoàn thành ${progress * 100}%',
                        style: const TextStyle(
                          fontSize: 12,
                          color: AppColors.primary500,
                        ),
                      ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
