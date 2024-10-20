import 'package:flutter/material.dart';

class TargetItem extends StatelessWidget {
  final String text;  

  TargetItem({required this.text});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(
          Icons.check,
          color: Colors.blue,
          size: 24, 
        ),
        const SizedBox(width: 12), 
        Expanded(
          child: Text(
            text,
            style: TextStyle(
              fontSize: 16, 
              color: Colors.black, 
            ),
          ),
        ),
      ],
    );
  }
}
