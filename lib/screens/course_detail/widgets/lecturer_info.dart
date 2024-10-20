import 'package:flutter/material.dart';

class CourseLecturerInfo extends StatelessWidget {
  const CourseLecturerInfo({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white,
      margin: const EdgeInsets.all(16.0),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
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
            const Text(
              'Nguyễn Văn A',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
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
            Text.rich(
              TextSpan(
                children: [
                  TextSpan(
                    text: 'Nguyễn Văn A',
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  const TextSpan(
                    text:
                        ' là một giảng viên dày dặn kinh nghiệm trong lĩnh vực thiết kế đồ họa, đặc biệt với phần mềm Adobe Illustrator. Anh đã tham gia nhiều dự án thực tế về Graphic Design, Web Design, Game UI UX và Motion Graphics, mang đến khóa học những kiến thức thực tiễn và ứng dụng cao. Với niềm đam mê chia sẻ, ',
                  ),
                ],
              ),
              style: const TextStyle(
                fontSize: 16,
                color: Colors.black,
              ),
              textAlign: TextAlign.justify,
            )
          ],
        ),
      ),
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