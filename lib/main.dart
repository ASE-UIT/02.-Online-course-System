import 'package:flutter/material.dart';
import 'package:online_course_system/screens/AccountUpdateScreen.dart';
import 'package:online_course_system/screens/EmailVerificationScreen.dart';
import 'package:online_course_system/screens/HomeScreen.dart';
import 'package:online_course_system/screens/PhoneVerificationScreen.dart';
import 'package:online_course_system/screens/UpdateEmailScreen.dart';
import 'package:online_course_system/screens/UpdatePhoneScreen.dart';
import 'package:online_course_system/screens/course_detail/course_detail.dart';
import 'package:online_course_system/screens/SignInScreen.dart';

import 'Views/login_screen.dart';

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
