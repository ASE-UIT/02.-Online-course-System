class CategoryModel {
  final String? status;
  final int? code;
  final bool? success;
  final String? message;
  final List<CategoryData>? data;
  final dynamic errors;

  CategoryModel({
    this.status,
    this.code,
    this.success,
    this.message,
    this.data,
    this.errors,
  });

  CategoryModel.fromJson(Map<String, dynamic> json)
      : status = json['status'] as String?,
        code = json['code'] as int?,
        success = json['success'] as bool?,
        message = json['message'] as String?,
        data = (json['data'] as List?)?.map((dynamic e) => CategoryData.fromJson(e as Map<String,dynamic>)).toList(),
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

class CategoryData {
  final String? id;
  final String? name;
  final dynamic thumbnail;

  CategoryData({
    this.id,
    this.name,
    this.thumbnail,
  });

  CategoryData.fromJson(Map<String, dynamic> json)
      : id = json['id'] as String?,
        name = json['name'] as String?,
        thumbnail = json['thumbnail'];

  Map<String, dynamic> toJson() => {
    'id' : id,
    'name' : name,
    'thumbnail' : thumbnail
  };
}