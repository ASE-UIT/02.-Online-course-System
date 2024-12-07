import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/constants/mockdata/courses.dart';
import 'package:online_course_system/screens/SignInScreen.dart';
import 'package:online_course_system/widgets/CourseListCategory.dart';
import 'package:online_course_system/widgets/HomeExploreCategory.dart';
import 'package:provider/provider.dart';

import '../ViewModels/course_view_model.dart';

class CourseListScreen extends StatefulWidget {
  const CourseListScreen({super.key});

  @override
  State<CourseListScreen> createState() => _CourseListScreenState();
}

class _CourseListScreenState extends State<CourseListScreen> {
  late CourseViewModel _courseVM;
  final storage = new FlutterSecureStorage();
  String? token;

  @override
  void initState() {
    super.initState();
    // Fetch courses asynchronously when the screen initializes
    _courseVM = Provider.of<CourseViewModel>(context, listen: false);
    _loadData();
    _loadToken();
  }
  Future<void> _loadToken() async {
    try {
      token = await storage.read(key: 'token');
    } catch (e) {
      debugPrint('Error loading token: $e');
    }
  }
  Future<void> _loadData() async {
    try {
      await _courseVM.getAllCourses();
    } catch (e) {
      debugPrint('Error loading courses 2: $e');
    }
  }
  @override
  Widget build(BuildContext context) {


    return SafeArea(
      child:
      Scaffold(
        appBar: AppBar(
          automaticallyImplyLeading: false,
          elevation: 0,
          backgroundColor: Colors.white,
          title: Row(
            children: [
              SizedBox(
                height: 31,
                child: Image.asset("assets/eduhublogo.png"),
              ),
              const Spacer(), // Thêm khoảng trống giữa logo và nút đăng nhập
              Container(
                height: 40,
                child:
                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => SignInScreen()),
                    );
                  },
                  style: TextButton.styleFrom(
                    padding: EdgeInsets.zero,
                    minimumSize: Size.zero,
                    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  ),
                  child: const Text(
                    "Đăng nhập",
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        body: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(
                height: 224,
                child: Image.asset(
                  "assets/homeimage.jpg",
                ),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Column(
                  children: [
                    CourseListCategory(
                      categoryTitle: 'Lịch học trực tiếp',
                      courses: _courseVM.courses,
                    ),
                    CourseListCategory(
                      categoryTitle: 'Lịch học trực tiếp',
                      courses: _courseVM.courses,
                    ),
                    /*CourseListCategory(
                      categoryTitle: 'Top bán chạy',
                      courses: homeCourses,
                    ),
                    CourseListCategory(
                      categoryTitle: 'Khóa học mới ra mắt',
                      courses: homeCourses,
                    ),*/
                    const HomeExploreCategory(),
                  ],
                ),
              ),
              const SizedBox(height: 24),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 24,
                ),
                decoration: const BoxDecoration(
                  color: AppColors.success50,
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      "Trở thành giảng viên của EduHub",
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                        color: AppColors.success500,
                      ),
                    ),
                    const SizedBox(height: 14),
                    _buildInstructorInfoSection(context),
                    const SizedBox(height: 14),
                    ElevatedButton(
                      onPressed: () {},
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.success700,
                        padding: const EdgeInsets.symmetric(
                          horizontal: 24,
                          vertical: 12,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      child: const Text(
                        "Bắt đầu giảng dạy",
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                          color: Colors.white
                        ),
                      ),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}

Widget _buildInstructorInfoSection(BuildContext context) {
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 16),
    child: SizedBox(
      width: double.infinity,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Expanded(
            child: Align(
              alignment: Alignment.center,
              child: SizedBox(
                width: 252,
                child: Text(
                  'Giảng viên trên toàn thế giới đã và đang dạy cho hàng triệu học viên trên EduHub. EduHub cung cấp công cụ và kỹ năng để giúp bạn hoàn thiện quá trình giảng dạy tốt hơn.',
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w400,
                  ),
                  maxLines: 10,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ),
          ),
          Image.asset(
            'assets/becomeTeacher.png',
            width: 86,
            height: 92,
          ),
        ],
      ),
    ),
  );
}
