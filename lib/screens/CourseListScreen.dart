import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/constants/mockdata/courses.dart';
import 'package:online_course_system/widgets/CourseListCategory.dart';
import 'package:online_course_system/widgets/HomeExploreCategory.dart';

class CourseListScreen extends StatelessWidget {
  const CourseListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          appBar: AppBar(
            backgroundColor: Colors.white,
            title: Row(
              children: [
                SizedBox(
                  height: 31,
                  child: Image.asset("assets/eduhublogo.png"),
                ),
                const Spacer(), // Thêm khoảng trống giữa logo và nút đăng nhập
                TextButton(
                  onPressed: () {},
                  child: const Text(
                    "Đăng nhập",
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
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
                    children:[
                      CourseListCategory(
                        categoryTitle: 'Lịch học trực tiếp',
                        courses: homeCourses,
                      ),
                      CourseListCategory(
                        categoryTitle: 'Top bán chạy',
                        courses: homeCourses,
                      ),
                      CourseListCategory(
                        categoryTitle: 'Khóa học mới ra mắt',
                        courses: homeCourses,
                      ),
                      HomeExploreCategory()
                    ]
                  ),
                )
              ],
            ),
          )),
    );
  }
}
