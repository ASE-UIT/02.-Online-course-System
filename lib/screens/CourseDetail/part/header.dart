import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import '../../SignInScreen.dart';

class CourseHeader extends StatefulWidget {
  @override
  State<CourseHeader> createState() => _CourseHeaderState();
}

class _CourseHeaderState extends State<CourseHeader> {
  final storage = FlutterSecureStorage();

  bool _hasToken = false;

  Future<void> _checkToken() async {
    final token = await storage.read(key: 'token');
    debugPrint("token: $token");
    setState(() {
      _hasToken = token != null;
    });
    debugPrint("_hasToken: $_hasToken");
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _checkToken();
  }

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
          _hasToken
              ? Container()
              : TextButton(
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
