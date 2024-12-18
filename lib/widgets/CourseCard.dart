import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';

import '../screens/CourseDetail/CourseDetailScreen.dart';

class CourseCard extends StatelessWidget {
  final String? id;
  final String? title;
  final String? author;
  final int? rating;
  final int? reviewCount;
  final String? sellPrice;
  final String? originalPrice;
  final String? imageUrl;

  const CourseCard({
    super.key,
    required this.title,
    required this.author,
    required this.rating,
    required this.reviewCount,
    required this.id,
    this.imageUrl,
    this.sellPrice,
    this.originalPrice,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        // Navigate to course detail screen
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => CourseDetailPage(courseId: id ?? ""),
          ),
        );
      },
      child: Card(
        color: Colors.white,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
          side: const BorderSide(
            color: Color(0xFFEFEFEF),
            width: 1,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(4),
              ),
              child: SizedBox(
                height: 130,
                width: double.infinity,
                child: Image.network(
                  imageUrl ?? 'https://placehold.co/600x400?text=Eduhub',
                  fit: BoxFit.fitWidth,
                  errorBuilder: (context, error, stackTrace) {
                    return Center(child: Text('Failed to load image'));
                  },
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title!,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                        color: AppColors.black,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis),
                  const SizedBox(height: 8),
                  Text(
                    author!,
                    style: const TextStyle(
                      fontSize: 14,
                      color: Color(0xFF747474),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Text(
                        rating!.toStringAsFixed(1),
                        style: const TextStyle(
                          fontSize: 12,
                          color: Color(0xFF1A1A1A),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Icon(
                        Icons.star,
                        color: AppColors.warning500,
                        size: 16,
                      ),
                      const SizedBox(width: 3),
                      Text(
                        '($reviewCount đánh giá)',
                        style: const TextStyle(
                          fontSize: 12,
                          color: Color(0xFF747474),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Text(
                        'đ${sellPrice?.replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},')}',
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                          color: AppColors.primary500,
                        ),
                      ),
                      SizedBox(
                        width: 5,
                      ),
                      Text(
                        'đ${originalPrice?.replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},')}',
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                          color: AppColors.gray600,
                          decoration: TextDecoration.lineThrough,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}