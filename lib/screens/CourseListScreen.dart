import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/constants/mockdata/courses.dart';
import 'package:online_course_system/widgets/CourseListCategory.dart';

class CourseListScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          appBar: AppBar(
            backgroundColor: Colors.white,
            title: Row(
              children: [
                Expanded(
                  child: Padding(
                    padding: EdgeInsets.all(20),
                    child: SizedBox(
                        height: 31,
                        child: Image.asset("assets/eduhublogo.png")),
                  ),
                ),
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
                CourseListCategory(
                  CategoryTitle: 'Lịch học trực tiếp',
                  courses: homeCourses,
                ),
                CourseListCategory(
                  CategoryTitle: 'Top bán chạy',
                  courses: homeCourses,
                ),
                CourseListCategory(
                  CategoryTitle: 'Khóa học mới ra mắt',
                  courses: homeCourses,
                ),
              ],
            ),
          )),
    );
  }
}
