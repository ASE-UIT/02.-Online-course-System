import 'package:flutter/material.dart';
import 'package:online_course_system/ViewModels/learning_view_model.dart';
import 'package:online_course_system/ViewModels/login_view_model.dart';
import 'package:online_course_system/screens/AccountUpdateScreen.dart';
import 'package:online_course_system/screens/EmailVerificationScreen.dart';
import 'package:online_course_system/screens/HomeScreen.dart';
import 'package:online_course_system/screens/PhoneVerificationScreen.dart';
import 'package:online_course_system/screens/UpdateEmailScreen.dart';
import 'package:online_course_system/screens/UpdatePhoneScreen.dart';
import 'package:provider/provider.dart';

import 'ViewModels/course_view_model.dart';
import 'Views/login_screen.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => CourseViewModel(),
        ),
        ChangeNotifierProvider(
          create: (_) => LearningViewModel(),
        ),
        ChangeNotifierProvider(
          create: (_) => LoginViewModel(),
        ),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(fontFamily: 'WorkSans'),
      home: HomeScreen(),
      routes: {
        'HomeScreen': (context) => const HomeScreen(),
        'AccountUpdateScreen': (context) => const AccountUpdateScreen(),
        'UpdateEmailScreen': (context) => const UpdateEmailScreen(),
        'UpdatePhoneScreen': (context) => const UpdatePhoneScreen(),
        'PhoneVerificationScreen': (context) => const PhoneVerificationScreen(),
        'EmailVerificationScreen': (context) => const EmailVerificationScreen(),
      },
    );
  }
}
