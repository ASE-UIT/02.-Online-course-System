import 'lesson.dart';

class Section {
  String title;
  List<Lesson> lessons;
  bool isExpanded;

  Section({required this.title, required this.lessons, this.isExpanded = false});
}