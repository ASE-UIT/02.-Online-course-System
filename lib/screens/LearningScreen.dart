import 'package:flutter/material.dart';
import 'package:online_course_system/ViewModels/learning_view_model.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:provider/provider.dart';

class CourseScreen extends StatefulWidget {
  @override
  State<CourseScreen> createState() => _CourseScreenState();
}

class _CourseScreenState extends State<CourseScreen> {
  late LearningViewModel _learningVM;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _learningVM = Provider.of<LearningViewModel>(context, listen: false);
    _loadData();
  }
  Future<void> _loadData() async {
    try {
      await _learningVM.getLearning("95eabf10-5a9a-45db-ab13-9c37c390b4c2");
    } catch (e) {
      debugPrint('Error loading courses 2: $e');
    }
  }


  final List<Section> sections = [
    Section(
      title: "Phần 1: MỞ ĐẦU",
      lectures: [
        Lecture(title: "Giới thiệu", duration: "00:00", isCompleted: true),
        Lecture(title: "Giới thiệu", duration: "00:00", isCompleted: true),
        Lecture(title: "Giới thiệu", duration: "00:00", isCompleted: true),
        Lecture(
          title: "Câu hỏi",
          duration: "3 câu hỏi",
          isCompleted: false,
          isQuiz: true,
        ),
      ],
    ),
    Section(
      title: "Phần 2: MỞ ĐẦU",
      lectures: [
        Lecture(title: "Giới thiệu", duration: "00:00", isCompleted: true),
        Lecture(title: "Giới thiệu", duration: "00:00", isCompleted: true),
        Lecture(title: "Giới thiệu", duration: "00:00", isCompleted: false, isCurrent: true),
        Lecture(
          title: "Câu hỏi",
          duration: "3 câu hỏi",
          isCompleted: false,
          isQuiz: true,
        ),
      ],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.primary950,
        title: Text("Tên khóa học"),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: Column(
        children: [
          Container(
            height: 200,
            color: Colors.black, // Phần video hoặc hình ảnh
          ),
          Expanded(
            child: ListView.builder(
              itemCount: sections.length,
              itemBuilder: (context, sectionIndex) {
                final section = sections[sectionIndex];
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text(
                        section.title,
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          color: Colors.grey,
                        ),
                      ),
                    ),
                    ...section.lectures.map((lecture) {
                      return ListTile(
                        leading: lecture.isQuiz
                            ? Icon(Icons.help_outline)
                            : Icon(
                          Icons.play_circle_fill,
                          color: lecture.isCurrent ? Colors.red : Colors.black,
                        ),
                        title: Text(
                          lecture.title,
                          style: TextStyle(
                            fontWeight: lecture.isCurrent ? FontWeight.bold : FontWeight.normal,
                            color: lecture.isCurrent ? Colors.black : Colors.grey.shade700,
                          ),
                        ),
                        subtitle: Text(lecture.duration),
                        trailing: lecture.isCompleted
                            ? Icon(Icons.check_circle, color: Colors.green)
                            : Icon(Icons.keyboard_arrow_down),
                        tileColor: lecture.isCurrent ? Colors.blue.shade100 : null,
                        onTap: () {
                          // Xử lý khi nhấn vào
                        },
                      );
                    }).toList(),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class Section {
  final String title;
  final List<Lecture> lectures;

  Section({required this.title, required this.lectures});
}

class Lecture {
  final String title;
  final String duration;
  final bool isCompleted;
  final bool isQuiz;
  final bool isCurrent;

  Lecture({
    required this.title,
    required this.duration,
    this.isCompleted = false,
    this.isQuiz = false,
    this.isCurrent = false,
  });
}
