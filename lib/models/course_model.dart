import 'category_model.dart';
import 'lecturer_model.dart';
import 'lesson_model.dart';

class Course {
  final String id;
  final String name;
  final String description;
  final String thumbnail;
  final String price;
  final String duration;
  final String difficultyLevel;
  final String startDate;
  final String endDate;
  final Category category;
  final Lecturer lecturer;
  final List<Lesson> lessons;
  final String? discount;
  final String createAt;
  final String updateAt;
  final String createBy;
  final String? updateBy;

  Course({
    required this.id,
    required this.name,
    required this.description,
    required this.thumbnail,
    required this.price,
    required this.duration,
    required this.difficultyLevel,
    required this.startDate,
    required this.endDate,
    required this.category,
    required this.lecturer,
    required this.lessons,
    this.discount,
    required this.createAt,
    required this.updateAt,
    required this.createBy,
    this.updateBy,
  });

  factory Course.fromJson(Map<String, dynamic> json) {
    return Course(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      thumbnail: json['thumbnail'],
      price: json['price'],
      duration: json['duration'],
      difficultyLevel: json['difficultyLevel'],
      startDate: json['startDate'],
      endDate: json['endDate'],
      category: Category.fromJson(json['category']),
      lecturer: Lecturer.fromJson(json['lecturer']),
      lessons: (json['lessons'] as List)
          .map((lesson) => Lesson.fromJson(lesson))
          .toList(),
      discount: json['discount'],
      createAt: json['createAt'],
      updateAt: json['updateAt'],
      createBy: json['createBy'],
      updateBy: json['updateBy'],
    );
  }
}