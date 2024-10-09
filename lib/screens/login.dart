import 'package:flutter/material.dart';
import 'package:online_course_system/widgets/custombutton.dart';

class LoginScreen extends StatefulWidget {
  LoginScreen({super.key});

  @override
  State<StatefulWidget> createState() => _LoginScreen();
}

class _LoginScreen extends State<LoginScreen> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Center(
            child: Padding(
          padding: const EdgeInsets.all(32.0),
          child: Column(
            children: [
              CustomButton(
                text: "Login",
                onPressed: () {},
                width: double.infinity,
                height: 50,

              ),
            ],
          ),
        )),
      ),
    );
  }
}
