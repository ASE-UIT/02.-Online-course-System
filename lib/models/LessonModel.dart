class LessonsModel {
  final String? status;
  final int? code;
  final bool? success;
  final String? message;
  final List< LessonsData>? data;
  final dynamic errors;

  LessonsModel({
    this.status,
    this.code,
    this.success,
    this.message,
    this.data,
    this.errors,
  });

  LessonsModel.fromJson(Map<String, dynamic> json)
      : status = json['status'] as String?,
        code = json['code'] as int?,
        success = json['success'] as bool?,
        message = json['message'] as String?,
        data = (json['data'] as List?)?.map((dynamic e) =>  LessonsData.fromJson(e as Map<String,dynamic>)).toList(),
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

class  LessonsData {
  final String? createAt;
  final String? updateAt;
  final dynamic createBy;
  final dynamic updateBy;
  final dynamic deleteAt;
  final String? id;
  final String? description;
  final String? title;
  final String? duration;
  final int? order;
  final String? videoUrl;
  final List<String>? resourceLink;
  final int? partNo;
  final String? partName;
  final List<Quizzes>? quizzes;

  LessonsData({
    this.createAt,
    this.updateAt,
    this.createBy,
    this.updateBy,
    this.deleteAt,
    this.id,
    this.description,
    this.title,
    this.duration,
    this.order,
    this.videoUrl,
    this.resourceLink,
    this.partNo,
    this.partName,
    this.quizzes,
  });

  LessonsData.fromJson(Map<String, dynamic> json)
      : createAt = json['createAt'] as String?,
        updateAt = json['updateAt'] as String?,
        createBy = json['createBy'],
        updateBy = json['updateBy'],
        deleteAt = json['deleteAt'],
        id = json['id'] as String?,
        description = json['description'] as String?,
        title = json['title'] as String?,
        duration = json['duration'] as String?,
        order = json['order'] as int?,
        videoUrl = json['videoUrl'] as String?,
        resourceLink = (json['resourceLink'] as List?)?.map((dynamic e) => e as String).toList(),
        partNo = json['partNo'] as int?,
        partName = json['partName'] as String?,
        quizzes = (json['quizzes'] as List?)?.map((dynamic e) => Quizzes.fromJson(e as Map<String,dynamic>)).toList();

  Map<String, dynamic> toJson() => {
    'createAt' : createAt,
    'updateAt' : updateAt,
    'createBy' : createBy,
    'updateBy' : updateBy,
    'deleteAt' : deleteAt,
    'id' : id,
    'description' : description,
    'title' : title,
    'duration' : duration,
    'order' : order,
    'videoUrl' : videoUrl,
    'resourceLink' : resourceLink,
    'partNo' : partNo,
    'partName' : partName,
    'quizzes' : quizzes?.map((e) => e.toJson()).toList()
  };
}

class Quizzes {
  final String? createAt;
  final String? updateAt;
  final dynamic createBy;
  final dynamic updateBy;
  final dynamic deleteAt;
  final String? id;
  final String? content;
  final String? choiceA;
  final String? choiceB;
  final String? choiceC;
  final String? choiceD;
  final String? correctChoice;

  Quizzes({
    this.createAt,
    this.updateAt,
    this.createBy,
    this.updateBy,
    this.deleteAt,
    this.id,
    this.content,
    this.choiceA,
    this.choiceB,
    this.choiceC,
    this.choiceD,
    this.correctChoice,
  });

  Quizzes.fromJson(Map<String, dynamic> json)
      : createAt = json['createAt'] as String?,
        updateAt = json['updateAt'] as String?,
        createBy = json['createBy'],
        updateBy = json['updateBy'],
        deleteAt = json['deleteAt'],
        id = json['id'] as String?,
        content = json['content'] as String?,
        choiceA = json['choiceA'] as String?,
        choiceB = json['choiceB'] as String?,
        choiceC = json['choiceC'] as String?,
        choiceD = json['choiceD'] as String?,
        correctChoice = json['correctChoice'] as String?;

  Map<String, dynamic> toJson() => {
    'createAt' : createAt,
    'updateAt' : updateAt,
    'createBy' : createBy,
    'updateBy' : updateBy,
    'deleteAt' : deleteAt,
    'id' : id,
    'content' : content,
    'choiceA' : choiceA,
    'choiceB' : choiceB,
    'choiceC' : choiceC,
    'choiceD' : choiceD,
    'correctChoice' : correctChoice
  };
}