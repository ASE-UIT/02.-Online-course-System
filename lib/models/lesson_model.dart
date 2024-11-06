class Lesson {
  String title;
  String duration;

  Lesson({required this.title, required this.duration});

  factory Lesson.fromJson(Map<String, dynamic> json) {
    return Lesson(
      title: json['title'],
      duration: json['duration']
    );
  }
}