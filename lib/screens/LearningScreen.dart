import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';

class LearningScreen extends StatelessWidget {
  const LearningScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        backgroundColor: AppColors.white,
        automaticallyImplyLeading: false,
        centerTitle: true,
        title: const Text(
          'Học tập',
          style: TextStyle(
              color: AppColors.black,
              fontSize: 20,
              fontWeight: FontWeight.w400),
        ),
      ),
      body: Center(
        child: Text('Learning Screen 123'),
      ),
    );
  }
}
