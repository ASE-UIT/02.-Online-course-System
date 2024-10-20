import 'package:flutter/material.dart';
import 'review_item.dart';

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