import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:online_course_system/constants/colors.dart';

class CourseIntro extends StatefulWidget {
  final String text;

  CourseIntro({required this.text});

  @override
  _CourseIntroState createState() => _CourseIntroState();
}


class _CourseIntroState extends State<CourseIntro>
    with TickerProviderStateMixin {
  bool isExpanded = false;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Tiêu đề
          const Text(
            'Giới thiệu khoá học',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: AppColors.success700,
            ),
          ),
          const SizedBox(height: 8),
          // Phần văn bản có thể mở rộng
          AnimatedSize(
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeInOut,
            child: ConstrainedBox(
                constraints: isExpanded
                    ? const BoxConstraints()
                    : const BoxConstraints(maxHeight: 200),
                child: Html(
                    data: widget
                        .text) /*Text(
                widget.text,
                softWrap: true,
                style: const TextStyle(
                  fontSize: 16,
                  color: Colors.black,
                ),
              ),*/
                ),
          ),
          const SizedBox(height: 16),
          // Nút "Hiện thêm"
          GestureDetector(
            onTap: () {
              setState(() {
                isExpanded = !isExpanded; // Thay đổi trạng thái khi bấm nút
              });
            },
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  isExpanded ? 'Thu gọn' : 'Hiện thêm',
                  style: TextStyle(color: Colors.black, fontSize: 16),
                ),
                const SizedBox(width: 8),
                Icon(
                  isExpanded
                      ? Icons.keyboard_arrow_up
                      : Icons.keyboard_arrow_down,
                  color: Colors.black,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
