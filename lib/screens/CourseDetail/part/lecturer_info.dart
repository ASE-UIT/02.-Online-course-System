import 'package:flutter/material.dart';
import 'package:online_course_system/models/course_detail.dart';

class CourseLecturerInfo extends StatelessWidget {
  final CourseDetailData courseDetail;

  const CourseLecturerInfo({Key? key, required this.courseDetail})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Thông tin giảng viên',
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
         Text(
          courseDetail.lecturer?.name ?? "",
          style: const TextStyle(
            fontSize: 16,
          ),
        ),
        const Text(
          'Giảng viên',
          style: TextStyle(
            fontSize: 16,
            fontStyle: FontStyle.italic,
          ),
        ),
        const SizedBox(height: 16),
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 142,
              height: 142,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                image: DecorationImage(
                  fit: BoxFit.cover,
                  image: AssetImage('assets/course_image.png'),
                ),
              ),
            ),
            const SizedBox(width: 57),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildInfoRow(Icons.sentiment_satisfied, '4.3 xếp hạng'),
                  _buildInfoRow(Icons.star_outline, '300 đánh giá'),
                  _buildInfoRow(Icons.people_outline, '2585 học viên'),
                  _buildInfoRow(Icons.library_books_outlined, '7 khoá học'),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Text(
          courseDetail.lecturer?.bio ?? "",
          style: const TextStyle(
            fontSize: 16,
            color: Colors.black,
          ),
        ),
      ],
    );
  }

  Widget _buildInfoRow(IconData icon, String text) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        children: [
          Icon(icon, size: 20),
          const SizedBox(width: 8),
          Text(text, style: const TextStyle(fontSize: 14)),
        ],
      ),
    );
  }
}
