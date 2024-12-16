import 'package:flutter/material.dart';
import 'package:online_course_system/constants/mockdata/exploreTags.dart';
import 'package:online_course_system/widgets/BorderTag.dart';

import '../constants/colors.dart';

class HomeExploreCategory extends StatelessWidget {
  const HomeExploreCategory({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            const Expanded(
              child: Text(
                "Khám phá EduHub",
                style:  TextStyle(
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
          height: 40, // Điều chỉnh chiều cao phù hợp với CourseCard
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: exploreTags.length,
            separatorBuilder: (context, index) => const SizedBox(width: 8),
            itemBuilder: (context, index) {
              final course = exploreTags[index];
              return SizedBox(
                child: BorderTag(
                  text: course,
                  onSelected: (value) => {},
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
