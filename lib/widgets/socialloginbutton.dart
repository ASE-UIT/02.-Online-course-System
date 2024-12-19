import 'package:flutter/material.dart';

class SocialLoginButton extends StatelessWidget {
  final String title;
  final String imagePath;
  final VoidCallback onPressed;

  const SocialLoginButton({
    Key? key,
    required this.title,
    required this.imagePath,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: () {},
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.white,
          foregroundColor: Colors.black,
          padding: const EdgeInsets.symmetric(vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12.0),
          ),
          side: const BorderSide(width: 1, color: Color(0xFF060606)),
        ),
        child: Stack(
          alignment: Alignment.center,
          children: [
            Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                padding: const EdgeInsets.only(
                    left: 16.0),
                child: Image.asset(imagePath, height: 24),
              ),
            ),
            Text(title),
          ],
        ),
      ),
    );
  }
}
