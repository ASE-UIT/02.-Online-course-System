import 'package:flutter/material.dart';
import 'package:online_course_system/ViewModels/learning_view_model.dart';
import 'package:online_course_system/ViewModels/login_view_model.dart';
import 'package:online_course_system/ViewModels/profile_view_model.dart';
import 'package:online_course_system/ViewModels/signup_view_model.dart';
import 'package:online_course_system/ViewModels/verifyOTP_view_model.dart';
import 'package:online_course_system/screens/AccountUpdateScreen.dart';
import 'package:online_course_system/screens/EmailVerificationScreen.dart';
import 'package:online_course_system/screens/HomeScreen.dart';
import 'package:online_course_system/screens/PhoneSignUpScreen.dart';
import 'package:online_course_system/screens/PhoneVerificationScreen.dart';
import 'package:online_course_system/screens/EmailSignUpScreen.dart';
import 'package:online_course_system/screens/UpdateEmailScreen.dart';
import 'package:online_course_system/screens/UpdatePhoneScreen.dart';
import 'package:online_course_system/screens/SignInScreen.dart';
import 'package:provider/provider.dart';

import 'ViewModels/course_view_model.dart';

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
        ChangeNotifierProvider(
          create: (_) => SignupViewModel(),
        ),
        ChangeNotifierProvider(
          create: (_) => VerifyOTPViewModel(),
        ),
        ChangeNotifierProvider(
          create: (context) => ProfileViewModel(),
        )
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
        'EmailSignUpScreen': (context) => const EmailSignUpScreen(),
        'PhoneSignUpScreen': (context) => const PhoneSignUpScreen(),
        'SignInScreen': (context) => const SignInScreen(),
        'AccountUpdateScreen': (context) => const AccountUpdateScreen(),
        'UpdateEmailScreen': (context) => const UpdateEmailScreen(),
        'UpdatePhoneScreen': (context) => const UpdatePhoneScreen(),
        'PhoneVerificationScreen': (context) => const PhoneVerificationScreen(),
        'EmailVerificationScreen': (context) => const EmailVerificationScreen(),
      },
    );
  }
}
