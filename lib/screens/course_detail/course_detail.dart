import 'package:flutter/material.dart';
import 'widgets/content/content.dart';
import 'widgets/header.dart';
import 'widgets/info/info.dart';
import 'widgets/review/review.dart';
import 'widgets/intro.dart';
import 'widgets/lecturer_info.dart';

class CourseDetailPage extends StatelessWidget {
  CourseDetailPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    const String courseIntroText = 'Bạn có biết: Khóa học "Cẩm nang A-Z Illustrator cho Designer" chính là dành cho bạn, người... Đam mê yêu thích đồ họa, nhiếp ảnh, thiết kế sản phẩm. Đang đi làm cần bổ sung, chuẩn hóa kiến thức, tăng khả năng hoàn thiện và thăng tiến trong nghề nghiệp Sinh viên chuyên ngành marketing, truyền thông, mỹ thuật, thiết đồ họa, thời trang, họa viên… cần kỹ năng sử dụng thành thạo phần mềm illustrator để phục vụ cho công việc và học thiết kế... Đang làm việc trong lĩnh vực marketing, truyền thông, kinh doanh,… Và bất cứ ai yêu thích công việc sáng tạo và thiết kế với phần mềm Adobe Illustrator! Hãy tham gia ngay khóa học "Cẩm nang A-Z Illustrator cho Designer" tại Unica!   ✔️ Khóa học do giảng viên Phạm Đức Huy trực tiếp hướng dẫn. Khóa học sẽ giúp bạn có được những kiến thức và kỹ năng nền tảng nhất để các bạn tiến gần hơn và trở thành một Graphic Designer, Web Designer, Game UI UX Designer hoặc Motion Graphic Designer ngay tại nhà!   ✔️ Khóa học là nền tảng để các bạn hiểu sâu hơn về bản chất công cụ của phần mềm Adobe Illustrator, từ đó các bạn dễ dàng xin được việc tại các công ty thiết kế lớn ở Việt Nam.   ✔️ Khóa học được soạn từ những dự án thực tế với nhiều khách hàng, vì vậy tính ứng dụng của khóa học luôn gắn liền với thị trường hiện tại. Học viên có thể ứng dụng ngay những kiến thức và kỹ năng mình học được vào trong công việc hiện tại của bản thân. Nội dung khóa học cụ thể: Phần 1: Giới thiệu và hướng dẫn tạo các hình khối Phần 2: Các tính năng của Shapes và bài tập thực hành Phần 3: Hướng dẫn các công cụ Drawing Tools, Pen Tool và Brushes Phần 4: Hướng dẫn các công cụ nâng cao trong thiết kế đồ họa Trở thành nhà thiết kế chuyên nghiệp với phần mềm Ai ngay hôm nay với khóa học "Cẩm nang A-Z Illustrator cho Designer" tại EduHub thôi nào!';

    return SingleChildScrollView(
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
          CourseLecturerInfo(), // Ensure this widget has a const constructor
          const SizedBox(height: 16),
          CourseReviews(),
          const SizedBox(height: 16),
          // cần thêm widget phần các course liên quan
        ],
      ),
    );
  }
}
