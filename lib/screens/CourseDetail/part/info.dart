import 'package:flutter/material.dart';
import 'package:online_course_system/models/course_detail.dart';
import 'package:online_course_system/constants/colors.dart';
import '../../../widgets/BuyNowButton.dart';
import 'package:online_course_system/widgets/StarBar.dart';

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
              color: AppColors.black,
            ),
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Text(
                courseDetail.averageRating.toString(),
                style: TextStyle(
                  fontSize: 16, 
                  fontWeight: FontWeight.bold,
                  color: AppColors.warning500
                ),
              ),
              const SizedBox(width: 8),
              StarBar(rating: courseDetail.averageRating!.toDouble()),
              const SizedBox(width: 8),
              Text(
                '(${courseDetail.averageRating} đánh giá)',
                style: TextStyle(
                  fontSize: 16
                )
              ),
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
                  color: AppColors.warning500,
                  decoration: TextDecoration.underline,
                  decorationColor: AppColors.warning500, 
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
                "${courseDetail.sellPrice.toString()}đ",
                style: const TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: AppColors.primary500,
                ),
              ),
              const SizedBox(width: 20),
              Text(
                "${courseDetail.originalPrice.toString()}đ",
                style: const TextStyle(
                  fontSize: 18,
                  color: AppColors.gray600,
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
              Expanded(
                child: BuyNowButton(
                  courseId: courseDetail.id ?? '',
                  courseName: courseDetail.name ?? '',
                  lecturerName: courseDetail.lecturer?.name ?? '',
                  sellPrice: courseDetail.sellPrice ?? '0',
                  originalPrice: courseDetail.originalPrice ?? '0',
                ),
              ),
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
                    color: AppColors.primary700,
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

class FavouriteButton extends StatefulWidget {
  bool isFavourite;

  FavouriteButton({super.key, required this.isFavourite});

  @override
  _FavouriteButtonState createState() => _FavouriteButtonState();
}

class _FavouriteButtonState extends State<FavouriteButton> {

  void _toggleFavourite() {
    setState(() {
      widget.isFavourite = !widget.isFavourite; // Toggle the state
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 40,
      height: 40,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.black26),
        borderRadius: BorderRadius.circular(4),
        boxShadow: [
          BoxShadow(
            blurRadius: 8,
            color: Colors.black26,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: IconButton(
        icon: Icon(
          widget.isFavourite ? Icons.favorite : Icons.favorite_border,
          color: widget.isFavourite ? Colors.red : Colors.black,
          size: 24,
        ),
        onPressed: _toggleFavourite, // Call the toggle function
        splashRadius: 24, // Adjust splash radius if needed
      ),
    );
  }
}

class TargetList extends StatelessWidget {
  final List<String> targets;

  const TargetList({Key? key, required this.targets}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView( // Make it scrollable
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: List.generate(targets.length, (index) {
              if (index == targets.length - 1) {
                return TargetItem(text: targets[index]);
              }
              return Padding(
                padding: const EdgeInsets.only(bottom: 12.0),
                child: TargetItem(text: targets[index]),
              );
            }),
          ),
        ),
    );
  }
}

class TargetItem extends StatelessWidget {
  final String text;  

  TargetItem({required this.text});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(
          Icons.check,
          color: AppColors.primary700,
          size: 24, 
        ),
        const SizedBox(width: 12), 
        Expanded(
          child: Text(
            text,
            style: TextStyle(
              fontSize: 16, 
              color: Colors.black, 
            ),
          ),
        ),
      ],
    );
  }
}

class PropertyItem extends StatelessWidget {
  
  final IconData iconData;
  final String propertyName;
  final String propertyValue;

  PropertyItem(
    this.iconData,
    this.propertyName,
    this.propertyValue,
  );
  
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(
          iconData, 
          size: 20,
          color: Colors.black,
        ),
        const SizedBox(width: 10), 
        Expanded(
          child: RichText(
            text: TextSpan(
              children: [
                TextSpan(
                  text: propertyName,
                  style: const TextStyle(
                    color: Colors.black, 
                    fontSize: 16,
                  ),
                ),
                TextSpan(
                  text: propertyValue,
                  style: const TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}