import 'package:flutter/material.dart';
import 'package:online_course_system/widgets/StarBar.dart';

class CourseReviews extends StatelessWidget {
  const CourseReviews({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            const Icon(Icons.star, color: Colors.amber),
            const SizedBox(width: 8),
            const Text(
              '4.0 xếp hạng - 10 đánh giá',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ],
        ),
        const SizedBox(height: 8),
        ListView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: 4,
          itemBuilder: (context, index) {
            return const Column(
                children: [
                  ReviewItem(),
                  SizedBox(height: 12),
                ]
            );
          },
        ),
        const SizedBox(height: 4),
        GestureDetector(
            child: Container(
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.black),
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Text(
                'Xem thêm đánh giá',
                style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.black
                ),
              ),
            )
        )
      ],
    );
  }
}

class ReviewItem extends StatelessWidget {
  const ReviewItem({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border(bottom: BorderSide(color: Colors.grey[300]!)),
        borderRadius: BorderRadius.circular(4),
        color: Color(0xFFEFEFEF),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
              children: [
                Container(
                  width: 52,
                  height: 52,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    image: DecorationImage(
                      fit: BoxFit.cover,
                      image: AssetImage('assets/course_image.png'),
                    ),
                  ),
                ),
                const SizedBox(width: 20),
                Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Nguyễn Lan H',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            StarBar(rating: 4),
                            const SizedBox(width: 16),
                            Text(
                                '1 tuần trước',
                                style: TextStyle(fontSize: 16)
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                      ],
                    )
                ),
              ]
          ),
          const SizedBox(height: 8),
          const Text(
            'Tuyệt vời!',
            style: TextStyle(
                fontSize: 16
            ),
          ),
        ],
      ),
    );
  }
}