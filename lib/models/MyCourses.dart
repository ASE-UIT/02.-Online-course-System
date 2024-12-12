class MyCourses {
  final String? status;
  final int? code;
  final bool? success;
  final String? message;
  final List<MyCoursesData>? data;
  final dynamic errors;

  MyCourses({
    this.status,
    this.code,
    this.success,
    this.message,
    this.data,
    this.errors,
  });

  MyCourses.fromJson(Map<String, dynamic> json)
      : status = json['status'] as String?,
        code = json['code'] as int?,
        success = json['success'] as bool?,
        message = json['message'] as String?,
        data = (json['data'] as List?)?.map((dynamic e) => MyCoursesData.fromJson(e as Map<String,dynamic>)).toList(),
        errors = json['errors'];

  Map<String, dynamic> toJson() => {
    'status' : status,
    'code' : code,
    'success' : success,
    'message' : message,
    'data' : data?.map((e) => e.toJson()).toList(),
    'errors' : errors
  };
}

class MyCoursesData {
  final String? studentId;
  final String? courseId;
  final String? enrolledDate;
  final String? status;
  final int? completionPercentage;
  final dynamic completionDate;
  final Course? course;

  MyCoursesData({
    this.studentId,
    this.courseId,
    this.enrolledDate,
    this.status,
    this.completionPercentage,
    this.completionDate,
    this.course,
  });

  MyCoursesData.fromJson(Map<String, dynamic> json)
      : studentId = json['studentId'] as String?,
        courseId = json['courseId'] as String?,
        enrolledDate = json['enrolledDate'] as String?,
        status = json['status'] as String?,
        completionPercentage = json['completionPercentage'] as int?,
        completionDate = json['completionDate'],
        course = (json['course'] as Map<String,dynamic>?) != null ? Course.fromJson(json['course'] as Map<String,dynamic>) : null;

  Map<String, dynamic> toJson() => {
    'studentId' : studentId,
    'courseId' : courseId,
    'enrolledDate' : enrolledDate,
    'status' : status,
    'completionPercentage' : completionPercentage,
    'completionDate' : completionDate,
    'course' : course?.toJson()
  };
}

class Course {
  final String? name;
  final String? nameEn;
  final String? shortDescription;
  final String? thumbnail;
  final Lecturer? lecturer;

  Course({
    this.name,
    this.nameEn,
    this.shortDescription,
    this.thumbnail,
    this.lecturer,
  });

  Course.fromJson(Map<String, dynamic> json)
      : name = json['name'] as String?,
        nameEn = json['nameEn'] as String?,
        shortDescription = json['shortDescription'] as String?,
        thumbnail = json['thumbnail'] as String?,
        lecturer = (json['lecturer'] as Map<String,dynamic>?) != null ? Lecturer.fromJson(json['lecturer'] as Map<String,dynamic>) : null;

  Map<String, dynamic> toJson() => {
    'name' : name,
    'nameEn' : nameEn,
    'shortDescription' : shortDescription,
    'thumbnail' : thumbnail,
    'lecturer' : lecturer?.toJson()
  };
}

class Lecturer {
  final String? name;

  Lecturer({
    this.name,
  });

  Lecturer.fromJson(Map<String, dynamic> json)
      : name = json['name'] as String?;

  Map<String, dynamic> toJson() => {
    'name' : name
  };
}