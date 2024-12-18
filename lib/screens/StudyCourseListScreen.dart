import 'package:flutter/material.dart';
import 'package:online_course_system/ViewModels/course_view_model.dart';
import 'package:online_course_system/ViewModels/learning_view_model.dart';
import 'package:online_course_system/models/MyCourses.dart';
import 'package:online_course_system/widgets/FavoriteCard.dart';
import 'package:provider/provider.dart';

import '../widgets/StudyCard.dart';

class StudyCourseListScreen extends StatefulWidget {
  const StudyCourseListScreen({super.key});

  @override
  State<StudyCourseListScreen> createState() => _StudyCourseListScreenState();
}

class _StudyCourseListScreenState extends State<StudyCourseListScreen> {
  late CourseViewModel _courseVM;
  List<MyCoursesData?>? _myCourses = [];
  bool _isLoading = true; // To manage loading state

  @override
  void initState() {
    super.initState();
    _courseVM = Provider.of<CourseViewModel>(context, listen: false);
    _loadData();
  }

  Future<void> _loadData() async {
    try {
      var myCourses = await _courseVM.getMyCourses() ?? [];
      setState(() {
        _myCourses = myCourses;
        _isLoading = false; // Set loading state to false when data is fetched
      });
    } catch (e) {
      debugPrint('Error loading courses: $e');
      setState(() {
        _isLoading = false; // Stop loading even if there's an error
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
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
      body: _isLoading
          ? Center(
              child:
                  CircularProgressIndicator()) // Show a loading spinner while fetching data
          : _myCourses == null || _myCourses!.isEmpty
              ? Center(
                  child: Text("No courses available")) // Handle empty courses
              : Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: ListView.builder(
                    itemCount: _myCourses?.length ?? 0,
                    itemBuilder: (context, index) {
                      final course = _myCourses?[index];
                      return StudyCard(
                          course: course ??
                              MyCoursesData()
                          );
                    },
                  ),
                ),
    );
  }
}
