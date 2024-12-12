import 'package:flutter/material.dart';

import '../../SignInScreen.dart';

class CourseHeader extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 20.0),
      child: Row(
        children: [
          Image.asset(
            'assets/eduhublogo.png',
            height: 31,
            width: 133,
          ),
          const Spacer(),
          TextButton(
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => SignInScreen()),
              );
            },
            child: const Text(
              'Đăng nhập',
              style: TextStyle(color: Colors.black, fontSize: 16),
            ),
          ),
        ],
      ),
    );
  }
}