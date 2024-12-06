import 'package:flutter/material.dart';
import 'package:online_course_system/widgets/FavoriteCard.dart';

import '../widgets/StudyCard.dart';

class StudyCourseListScreen extends StatelessWidget {
  const StudyCourseListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.white,

        title: const Center(
          child: Text(
            "Học tập",
            style: TextStyle(
              color: Colors.black,
              fontSize: 20,
              fontWeight: FontWeight.w400,
            ),
          ),
        ),
      ),
      body:
      Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              StudyCard(
                courseName: 'Tên khóa học',
                authorName: 'Tên tác giả',
                imageUrl: 'assets/coursecard.png',
                progress: 0.5,
              ),
              StudyCard(
                courseName: 'Tên khóa học',
                authorName: 'Tên tác giả',
                imageUrl: 'assets/coursecard.png',
                progress: 1,
              ),
              StudyCard(
                courseName: 'Tên khóa học',
                authorName: 'Tên tác giả',
                imageUrl: 'assets/coursecard.png',
                progress: 0,
              ),
            ],
          ),
        ),
      ),

    );
  }
}
