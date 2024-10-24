import 'package:flutter/material.dart';
import 'package:online_course_system/screens/HomeScreen.dart';
import 'package:online_course_system/screens/course_detail/course_detail.dart';
import 'package:online_course_system/screens/SignInScreen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(fontFamily: 'WorkSans'),
      home: SignInScreen(),
    );
  }
}
