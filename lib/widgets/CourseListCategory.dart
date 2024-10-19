import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/widgets/CourseCard.dart';

class CourseListCategory extends StatelessWidget {
  final String CategoryTitle;
  final List<Map<String, dynamic>> courses;

  CourseListCategory({
    Key? key,
    required this.CategoryTitle,
    required this.courses,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Text(
                  CategoryTitle,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ),
            TextButton(
              onPressed: () {},
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                // Giữ cho button không chiếm hết space
                children: [
                  Text(
                    'Xem thêm',
                    style: TextStyle(
                      color: AppColors.primary500,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  SizedBox(width: 4), // Khoảng cách giữa text và icon
                  Icon(Icons.arrow_forward_ios, size: 16),
                ],
              ),
            )
          ],
        ),
        const SizedBox(height: 16),
        SizedBox(
          height: 320, // Điều chỉnh chiều cao phù hợp với CourseCard
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            scrollDirection: Axis.horizontal,
            itemCount: courses.length,
            separatorBuilder: (context, index) => const SizedBox(width: 16),
            itemBuilder: (context, index) {
              final course = courses[index];
              return SizedBox(
                width: 280, // Điều chỉnh chiều rộng phù hợp với CourseCard
                child: CourseCard(
                  title: course['title'],
                  author: course['author'],
                  rating: course['rating'],
                  reviewCount: course['reviewCount'],
                  price: course['price'],
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
