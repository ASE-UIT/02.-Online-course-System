import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../screens/CourseDetail/CourseDetailScreen.dart';

class FavoriteCard extends StatelessWidget {
  final String? id;
  final String courseName;
  final String authorName;
  final double rating;
  final int numberOfRatings;
  final double price;
  final double originalPrice;
  final double discountPercentage;
  final String? imageUrl;
  final bool isBestSeller;

  FavoriteCard({
    Key? key,
    required this.id,
    required this.courseName,
    required this.authorName,
    required this.rating,
    required this.numberOfRatings,
    required this.price,
    required this.originalPrice,
    required this.discountPercentage,
    this.imageUrl = 'assets/coursecard.png',
    required this.isBestSeller,
  }) : super(key: key);

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
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              width: 80, // Set the width of the image
              height: 100, // Ensure height is set to prevent overflow
              child: Image.network(
                imageUrl ?? 'assets/coursecard.png',
                fit: BoxFit.contain,
                errorBuilder: (context, error, stackTrace) {
                  return Image(
                    image: AssetImage('assets/coursecard.png'),
                    fit: BoxFit.fitHeight,
                  );
                },
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      courseName,
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
                      authorName,
                      style: const TextStyle(
                        fontSize: 14,
                        color: Color(0xFF747474),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Text(
                          rating.toStringAsFixed(1),
                          style: const TextStyle(
                            fontSize: 12,
                            color: Color(0xFF1A1A1A),
                          ),
                        ),
                        Icon(
                          Icons.star,
                          color: AppColors.warning500,
                          size: 16,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          '($numberOfRatings đánh giá)',
                          style: const TextStyle(
                            fontSize: 12,
                            color: Color(0xFF747474),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Text(
                          'đ${price.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},')}',
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w700,
                            color: AppColors.primary500,
                          ),
                        ),
                        const SizedBox(width: 8),
                        Text(
                          'đ${originalPrice.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]},')}',
                          style: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w700,
                            color: AppColors.gray600,
                            decoration: TextDecoration
                                .lineThrough, // Thêm dòng này để có gạch ngang
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    if (isBestSeller)
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 6,
                          vertical: 4,
                        ),
                        decoration: BoxDecoration(
                          color: AppColors.success200,
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: const Text(
                          'Best Seller',
                          style: TextStyle(
                            fontSize: 12,
                            color: AppColors.black,
                          ),
                        ),
                      ),
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
