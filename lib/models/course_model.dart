class CourseModel {
  final String? status;
  final int? code;
  final bool? success;
  final String? message;
  final List<Data>? data;
  final dynamic errors;

  CourseModel({
    this.status,
    this.code,
    this.success,
    this.message,
    this.data,
    this.errors,
  });

  CourseModel.fromJson(Map<String, dynamic> json)
      : status = json['status'] as String?,
        code = json['code'] as int?,
        success = json['success'] as bool?,
        message = json['message'] as String?,
        data = (json['data'] as List?)?.map((dynamic e) => Data.fromJson(e as Map<String,dynamic>)).toList(),
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

class Data {
  final String? createAt;
  final String? updateAt;
  final dynamic createBy;
  final dynamic updateBy;
  final String? id;
  final String? name;
  final String? nameEn;
  final String? shortDescription;
  final dynamic thumbnail;
  final String? originalPrice;
  final String? sellPrice;
  final String? duration;
  final dynamic startDate;
  final dynamic endDate;
  final String? status;
  final int? totalStudents;
  final int? totalReviews;
  final int? averageRating;
  final Category? category;
  final Lecturer? lecturer;

  Data({
    this.createAt,
    this.updateAt,
    this.createBy,
    this.updateBy,
    this.id,
    this.name,
    this.nameEn,
    this.shortDescription,
    this.thumbnail,
    this.originalPrice,
    this.sellPrice,
    this.duration,
    this.startDate,
    this.endDate,
    this.status,
    this.totalStudents,
    this.totalReviews,
    this.averageRating,
    this.category,
    this.lecturer,
  });

  Data.fromJson(Map<String, dynamic> json)
      : createAt = json['createAt'] as String?,
        updateAt = json['updateAt'] as String?,
        createBy = json['createBy'],
        updateBy = json['updateBy'],
        id = json['id'] as String?,
        name = json['name'] as String?,
        nameEn = json['nameEn'] as String?,
        shortDescription = json['shortDescription'] as String?,
        thumbnail = json['thumbnail'],
        originalPrice = json['originalPrice'] as String?,
        sellPrice = json['sellPrice'] as String?,
        duration = json['duration'] as String?,
        startDate = json['startDate'],
        endDate = json['endDate'],
        status = json['status'] as String?,
        totalStudents = json['totalStudents'] as int?,
        totalReviews = json['totalReviews'] as int?,
        averageRating = json['averageRating'] as int?,
        category = (json['category'] as Map<String,dynamic>?) != null ? Category.fromJson(json['category'] as Map<String,dynamic>) : null,
        lecturer = (json['lecturer'] as Map<String,dynamic>?) != null ? Lecturer.fromJson(json['lecturer'] as Map<String,dynamic>) : null;

  Map<String, dynamic> toJson() => {
    'createAt' : createAt,
    'updateAt' : updateAt,
    'createBy' : createBy,
    'updateBy' : updateBy,
    'id' : id,
    'name' : name,
    'nameEn' : nameEn,
    'shortDescription' : shortDescription,
    'thumbnail' : thumbnail,
    'originalPrice' : originalPrice,
    'sellPrice' : sellPrice,
    'duration' : duration,
    'startDate' : startDate,
    'endDate' : endDate,
    'status' : status,
    'totalStudents' : totalStudents,
    'totalReviews' : totalReviews,
    'averageRating' : averageRating,
    'category' : category?.toJson(),
    'lecturer' : lecturer?.toJson()
  };
}

class Category {
  final String? id;
  final String? name;

  Category({
    this.id,
    this.name,
  });

  Category.fromJson(Map<String, dynamic> json)
      : id = json['id'] as String?,
        name = json['name'] as String?;

  Map<String, dynamic> toJson() => {
    'id' : id,
    'name' : name
  };
}

class Lecturer {
  final String? id;
  final String? name;

  Lecturer({
    this.id,
    this.name,
  });

  Lecturer.fromJson(Map<String, dynamic> json)
      : id = json['id'] as String?,
        name = json['name'] as String?;

  Map<String, dynamic> toJson() => {
    'id' : id,
    'name' : name
  };
}