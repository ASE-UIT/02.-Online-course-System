import 'package:flutter/material.dart';
import 'package:online_course_system/models/course_detail.dart';
import 'star_bar.dart';
import 'favourite_button.dart';
import 'property_item.dart';
import 'target_list/target_list.dart';
import '../add_to_cart_button.dart';

class CourseInfo extends StatelessWidget {
  final CourseDetailData courseDetail;

  const CourseInfo({super.key, required this.courseDetail});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            courseDetail.name ?? "Tên khóa học",
            style: const TextStyle(
              fontSize: 30,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            courseDetail.shortDescription ?? "",
            style: const TextStyle(
              fontSize: 16,
              color: Colors.black87,
            ),
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Text(
                courseDetail.averageRating.toString(),
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              const SizedBox(width: 8),
              StarBar(rating: courseDetail.averageRating?.toDouble()??0.0),
              const SizedBox(width: 8),
              Text('(${courseDetail.averageRating} đánh giá)',
                  style: TextStyle(fontSize: 16)),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              const Text(
                'Giảng viên:',
                style: TextStyle(fontSize: 16),
              ),
              const SizedBox(width: 8),
              Text(
                courseDetail.lecturer?.name ?? '',
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.blue,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(
                "${courseDetail.sellPrice}đ",
                style: const TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.blue,
                ),
              ),
              const SizedBox(width: 20),
              Text(
                "${courseDetail.originalPrice}đ",
                style: const TextStyle(
                  fontSize: 18,
                  color: Colors.grey,
                  decoration: TextDecoration.lineThrough,
                ),
              ),
              const Spacer(),
              Text(
                'Giảm xx%',
                style: TextStyle(
                  fontSize: 16,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          Row(
            children: [
              const Expanded(child: AddToCartButton()),
              const SizedBox(width: 16),
              FavouriteButton(isFavourite: false),
            ],
          ),
          const SizedBox(height: 20),
          PropertyItem(
              Icons.videocam_outlined, "Thời lượng: ", "05 giờ 30 phút"),
          const SizedBox(height: 8),
          PropertyItem(Icons.menu_book_outlined, "Giáo trình: ", "1 bài giảng"),
          const SizedBox(height: 8),
          PropertyItem(
              Icons.access_time_outlined, "Sở hữu khóa học trọn đời", ""),
          const SizedBox(height: 8),
          PropertyItem(Icons.assignment_turned_in_outlined,
              "Cấp chứng nhận hoàn thành", ""),
          const SizedBox(height: 16),
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              border: Border.all(color: Colors.grey[300]!),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Bạn sẽ học được',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.blue,
                  ),
                ),
                const SizedBox(height: 8),
                TargetList(targets: courseDetail.courseTargets ?? [""]),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
