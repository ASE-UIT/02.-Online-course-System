import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';

class StarBar extends StatelessWidget {
  final double rating; // Rating from 0 to 5

  const StarBar({required this.rating});

  @override
  Widget build(BuildContext context) {
    const double starSize = 24;

    return SizedBox(
      width: starSize * 5,
      height: starSize,
      child: Stack(
        children: [
          // Background stars (empty stars)
          Row(
            mainAxisSize: MainAxisSize.min,
            children: List.generate(5, (index) {
              return Icon(Icons.star_border, color: AppColors.warning500, size: starSize);
            }),
          ),
          // Foreground stars (filled stars)
          Row(
            mainAxisSize: MainAxisSize.min,
            children: List.generate(5, (index) {
              // Calculate the fill percentage for each star
              double starFill = (rating - index).clamp(0.0, 1.0);

              return ClipRect(
                clipBehavior: Clip.hardEdge,
                child: Align(
                  alignment: Alignment.topLeft,
                  widthFactor: starFill,
                  child: Icon(Icons.star, color: AppColors.warning500, size: starSize),
                ),
              );
            }),
          ),
        ],
      ),
    );
  }
}