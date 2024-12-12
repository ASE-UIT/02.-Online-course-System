import 'package:flutter/material.dart';
import 'package:online_course_system/models/lesson_model.dart';
import 'package:online_course_system/models/section.dart';
import 'package:online_course_system/constants/colors.dart';

class CourseContent extends StatefulWidget {
  @override
  _CourseContentState createState() => _CourseContentState();
}

class _CourseContentState extends State<CourseContent> {
  List<Section> sections = [
    Section(
      title: "Phần 1: Giới thiệu và hướng dẫn tạo các hình khối",
      lessons: [
        Lesson(title: "Bài 1: Work Area", duration: "Học thử"),
        Lesson(title: "Bài 2: Cách tạo một thư mục mới", duration: "00:00:00"),
        Lesson(title: "Bài 3: Work spaces", duration: "00:02:16"),
      ],
    ),
    Section(
      title: "Phần 2: Các tính năng của Shapes và bài tập thực hành",
      lessons: [],
    ),
    Section(
      title: "Phần 3: Hướng dẫn các công cụ Drawing Tools",
      lessons: [],
    ),
    Section(
      title: "Phần 4: Hướng dẫn các công cụ nâng cao trong Drawing Tools",
      lessons: [],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Material(  // Thêm widget Material ở đây
      child: Container (
        color: Colors.white,
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Nội dung khoá học',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                  color: AppColors.error700,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                '4 phần - 41 bài giảng - 05 giờ 30 phút',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 16,
                ),
              ),
              const SizedBox(height: 20),
              ListView.separated(
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                itemCount: sections.length,
                separatorBuilder: (context, index) => const SizedBox(height: 8),
                itemBuilder: (context, index) {
                  return Column(
                    children: [
                      Container(
                        padding: const EdgeInsets.fromLTRB(0, 8, 0, 8),                     
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(4),
                          color: AppColors.gray300,
                        ),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            IconButton(
                              padding: EdgeInsets.all(5), 
                              constraints: BoxConstraints(),
                              iconSize: 24,
                              icon: Icon(
                                sections[index].isExpanded ? Icons.remove : Icons.add,
                                color: AppColors.error500,
                              ),
                              onPressed: () {
                                setState(() {
                                  sections[index].isExpanded = !sections[index].isExpanded;
                                });
                              },
                            ),
                            const SizedBox(width: 8),
                            Expanded(
                              child: Text(
                                sections[index].title,
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      if (sections[index].isExpanded)
                        Column(
                          children: sections[index].lessons.map((lesson) => Container(
                            padding: const EdgeInsets.fromLTRB(5, 10, 0, 10),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.start,
                              children: [
                                IconButton(
                                  padding: EdgeInsets.zero, 
                                  constraints: BoxConstraints(),
                                  iconSize: 24,
                                  icon: Icon(
                                    Icons.play_circle_outline,
                                    color: AppColors.error500,
                                  ),
                                  onPressed: () {},
                                ),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: Text(lesson.title),
                                ),
                                Text(
                                  lesson.duration,
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: lesson.duration == "Học thử" ? AppColors.primary500 : Colors.black,
                                  ),
                                ),
                              ],
                            ),
                          )).toList(),
                        ),
                    ],
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}



