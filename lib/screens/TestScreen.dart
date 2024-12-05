import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:online_course_system/ViewModels/course_view_model.dart';
import 'package:provider/provider.dart';

class TestScreen extends StatefulWidget {
  @override
  State<TestScreen> createState() => _TestScreenState();
}

class _TestScreenState extends State<TestScreen> {
  late CourseViewModel _courseVM;

  @override
  void initState() {
    super.initState();
    // Fetch courses asynchronously when the screen initializes
    _courseVM = Provider.of<CourseViewModel>(context, listen: false);
    _loadData();

  }
  Future<void> _loadData() async {
    try {
      await _courseVM.getAllCourses();
    } catch (e) {
      debugPrint('Error loading courses: $e');
    }
  }
  @override
  Widget build(BuildContext context) {
    final vm = Provider.of<CourseViewModel>(context);

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Test Screen'),
        ),
        body: Center(
          child: ElevatedButton(
            onPressed: () {
              debugPrint('Number of courses: ${vm.courses.length}');
              if (vm.courses.isNotEmpty) {
                for (var course in vm.courses) {
                  debugPrint('Course: ${course.name}, ID: ${course.id}');
                }
              } else {
                debugPrint('No courses available');
              }
            },
            child: Text('Print courses length'),
          ),
        ),
      ),
    );
  }
}
