import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/models/course_model.dart';
import 'package:online_course_system/widgets/CourseCard.dart';

class CourseListCategory extends StatelessWidget {
  final String categoryTitle;
  final List<Data> courses;


  const CourseListCategory({
    Key? key,
    required this.categoryTitle,
    required this.courses,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
        children: [
          Row(
            children: [
              Expanded(
                child:
                  Text(
                    categoryTitle,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w700,
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
                        fontSize: 16,
                        color: AppColors.primary500,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    SizedBox(width: 4), // Khoảng cách giữa text và icon
                    Icon(
                      Icons.arrow_forward_ios,
                      size: 16,
                    ),
                  ],
                ),
              )
            ],
          ),
          SizedBox(
            height: 290, // Điều chỉnh chiều cao phù hợp với CourseCard
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: courses.length,
              separatorBuilder: (context, index) => const SizedBox(width: 16),
              itemBuilder: (context, index) {
                final course = courses[index];
                return SizedBox(
                  width: 280, // Điều chỉnh chiều rộng phù hợp với CourseCard
                  child: CourseCard(
                    title: course.name,
                    author: course.lecturer?.name,
                    reviewCount: course.totalReviews,
                    rating: course.averageRating,
                    price: course.originalPrice,
                  ),
                );
              },
            ),
          ),
        ],

    );
  }
}
