import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/widgets/BorderTag.dart';
import 'package:online_course_system/widgets/CourseCategoryTag.dart';
import 'package:online_course_system/widgets/SearchBar.dart';

class SearchScreen extends StatelessWidget {
  const SearchScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          titleSpacing: 0,
          elevation: 0,
          automaticallyImplyLeading: false,
          backgroundColor: Colors.white,
          title: const Padding(
            padding: EdgeInsets.all(20.0),
            child: CustomSearchBar(),
          ),
        ),
        body: SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Top tìm kiếm',
                  style: TextStyle(
                    color: AppColors.black,
                    fontSize: 18,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                SizedBox(height: 12),
                Wrap(
                  spacing: 12,
                  runSpacing: 12,
                  children: [
                    BorderTag(text: 'Python'),
                    BorderTag(text: 'Java'),
                    BorderTag(text: "Excel"),
                    BorderTag(text: 'React'),
                    BorderTag(text: 'Photoshop'),
                    BorderTag(text: 'Digital Marketing'),
                    BorderTag(text: 'Javascript'),
                  ],
                ),
                SizedBox(height: 20),
                Text(
                  'Danh mục khóa học',
                  style: TextStyle(
                    color: AppColors.black,
                    fontSize: 18,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                SizedBox(height: 12),
                CourseCategoryTag(text: "Phát triển"),
                CourseCategoryTag(text: "CNTT & Phần mềm"),
                CourseCategoryTag(text: "Kinh doanh"),
                CourseCategoryTag(text: "Năng suất văn phòng"),
                CourseCategoryTag(text: "Tài chính & Kế toán"),
                CourseCategoryTag(text: "Thiết kế"),
                CourseCategoryTag(text: "Marketing"),
                CourseCategoryTag(text: "Sức khỏe & Thể dục"),
                CourseCategoryTag(text: "Nhiếp ảnh & Video"),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
