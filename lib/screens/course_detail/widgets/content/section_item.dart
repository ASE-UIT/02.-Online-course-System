// section_item.dart
import 'package:flutter/material.dart';
import 'lesson_item.dart';

class SectionItem extends StatefulWidget {
  final Map<String, dynamic> section;

  SectionItem({required this.section});

  @override
  _SectionItemState createState() => _SectionItemState();
}

class _SectionItemState extends State<SectionItem> {
  bool isExpanded = false;

  @override
  Widget build(BuildContext context) {
    final lessons = widget.section['lessons'] as List;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ListTile(
          leading: Icon(isExpanded ? Icons.remove : Icons.add),
          title: Text(
            widget.section['title'],
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          onTap: () {
            setState(() {
              isExpanded = !isExpanded;
            });
          },
        ),
        // Only render the Column if there are lessons to display
        if (isExpanded && lessons.isNotEmpty)
          Column(
            children: lessons
                .map((lesson) => LessonItem(lesson: lesson))
                .toList(),
          ),
      ],
    );
  }
}
