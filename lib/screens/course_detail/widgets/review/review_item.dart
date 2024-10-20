import 'package:flutter/material.dart';
//import starbar
import '../info/star_bar.dart';

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
              fontWeight: FontWeight.bold, 
              fontSize: 16
            ),
          ),
        ],
      ),
    );
  }
}