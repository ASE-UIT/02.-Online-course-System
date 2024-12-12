import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:online_course_system/screens/LearningScreen.dart';

import '../constants/colors.dart';
import '../models/MyCourses.dart';

class StudyCard extends StatelessWidget {
  final MyCoursesData course;

  StudyCard({
    Key? key,
    required this.course,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        log("courseId log: "+course.courseId.toString());
        // Navigate to course details screen
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => CourseScreen(courseId: course.courseId??"",)),
        );
      },
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
            SizedBox(
              width: 80, // Set the width of the image
              height: 80, // Ensure height is set to prevent overflow
              child: Image.network(
                course.course?.thumbnail ?? 'assets/coursecard.png',
                fit: BoxFit.fitWidth, // Ensure image covers the available space
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      course.course?.name ?? 'Unknown Course',
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
                      course.course?.lecturer?.name ?? 'Unknown Author',
                      style: const TextStyle(
                        fontSize: 14,
                        color: Color(0xFF747474),
                      ),
                    ),
                    const SizedBox(height: 4),
                    course.completionPercentage?.toDouble()  == 0
                        ? const Text(
                            'Bắt đầu khóa học',
                            style: TextStyle(
                              fontSize: 12,
                              color: AppColors.primary500,
                            ),
                          )
                        : LinearProgressIndicator(
                            value: course.completionPercentage?.toDouble() ?? 0,
                            backgroundColor: AppColors.gray400,
                            valueColor: AlwaysStoppedAnimation<Color>(
                                AppColors.primary900),
                          ),
                    const SizedBox(height: 4),
                    if (course.completionPercentage?.toDouble()  == 1)
                      const Text(
                        'Đã hoàn thành',
                        style: TextStyle(
                          fontSize: 12,
                          color: AppColors.primary500,
                        ),
                      ),/*
                    if (course.completionPercentage?.toDouble() < 1.0 && course.completionPercentage?.toDouble() > 0)
                      Text(
                        'Hoàn thành ${course.completionPercentage?.toDouble() * 100}%',
                        style: const TextStyle(
                          fontSize: 12,
                          color: AppColors.primary500,
                        ),
                      ),*/
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
