import 'package:flutter/material.dart';

class LessonItem extends StatelessWidget {
  final Map<String, dynamic> lesson;

  LessonItem({required this.lesson});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(Icons.play_circle_fill, color: Colors.red),
      title: Text(lesson['title']),
      trailing: lesson['isPreview']
          ? Text(
              "Học thử",
              style: TextStyle(color: Colors.blue),
            )
          : Text(lesson['duration']),
    );
  }
}
