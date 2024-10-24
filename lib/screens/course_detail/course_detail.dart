import 'package:flutter/material.dart';
import 'widgets/content/content.dart';
import 'widgets/header.dart';
import 'widgets/info/info.dart';
import 'widgets/review/review.dart';
import 'widgets/intro.dart';
import 'widgets/lecturer_info.dart';
import 'widgets/add_to_cart_button.dart';

class CourseDetailPage extends StatefulWidget {
  CourseDetailPage({Key? key}) : super(key: key);

  @override
  _CourseDetailPageState createState() => _CourseDetailPageState();
}

class _CourseDetailPageState extends State<CourseDetailPage> {
  final ScrollController _scrollController = ScrollController();
  bool _isButtonVisible = true;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(() {
      setState(() {
        // Khi vị trí cuộn vượt qua một ngưỡng nhất định, ẩn nút "Thêm vào giỏ hàng" ở dưới cùng
        _isButtonVisible = _scrollController.offset < 500;  // 500 là giá trị ngưỡng
      });
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    const String courseIntroText = '...';  // Nội dung text của khoá học

    return Scaffold(
      body: Stack(
        children: [
          SingleChildScrollView(
            controller: _scrollController,
            padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                CourseHeader(),
                const Image(
                  image: AssetImage('assets/course_image.png'),
                  width: double.infinity,
                ),
                const SizedBox(height: 20),
                CourseInfo(),
                const SizedBox(height: 16),
                CourseIntro(text: courseIntroText),
                const SizedBox(height: 16),
                CourseContent(),
                const SizedBox(height: 16),
                CourseLecturerInfo(),
                const SizedBox(height: 16),
                CourseReviews(),
                const SizedBox(height: 16),
                // Các widget khác
              ],
            ),
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,

            child: Visibility(
              visible: !_isButtonVisible,
              child: Padding( 
                padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
                child: AddToCartButton(),                                         
              ),
            ),
          ),
        ],
      ),
    );
  }
}

