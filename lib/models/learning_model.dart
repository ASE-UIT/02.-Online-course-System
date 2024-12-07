class LearningModel {
  final String? status;
  final int? code;
  final bool? success;
  final String? message;
  final LearningData? data;
  final dynamic errors;

  LearningModel({
    this.status,
    this.code,
    this.success,
    this.message,
    this.data,
    this.errors,
  });

  LearningModel.fromJson(Map<String, dynamic> json)
      : status = json['status'] as String?,
        code = json['code'] as int?,
        success = json['success'] as bool?,
        message = json['message'] as String?,
        data = (json['data'] as Map<String,dynamic>?) != null ? LearningData.fromJson(json['data'] as Map<String,dynamic>) : null,
        errors = json['errors'];

  Map<String, dynamic> toJson() => {
    'status' : status,
    'code' : code,
    'success' : success,
    'message' : message,
    'data' : data?.toJson(),
    'errors' : errors
  };
}

class LearningData {
  final String? createAt;
  final String? updateAt;
  final dynamic createBy;
  final dynamic updateBy;
  final dynamic deleteAt;
  final String? id;
  final String? name;
  final String? nameEn;
  final String? shortDescription;
  final String? introduction;
  final String? participants;
  final List<String>? courseTargets;
  final String? welcomeJoin;
  final String? videoSale;
  final List<String>? courseMaterials;
  final String? thumbnail;
  final String? originalPrice;
  final String? sellPrice;
  final String? lowestPrice;
  final String? socialGroupLink;
  final String? courseLink;
  final List<String>? tags;
  final String? duration;
  final String? difficultyLevel;
  final bool? isFreeCourse;
  final dynamic startFreeDate;
  final dynamic endFreeDate;
  final dynamic startDate;
  final dynamic endDate;
  final bool? isApproved;
  final String? status;
  final int? totalStudents;
  final int? totalReviews;
  final int? averageRating;
  final String? categoryId;
  final String? lecturerId;
  final Category? category;
  final Lecturer? lecturer;
  final List<LessonParts>? lessonParts;
  final LearningProgress? learningProgress;

  LearningData({
    this.createAt,
    this.updateAt,
    this.createBy,
    this.updateBy,
    this.deleteAt,
    this.id,
    this.name,
    this.nameEn,
    this.shortDescription,
    this.introduction,
    this.participants,
    this.courseTargets,
    this.welcomeJoin,
    this.videoSale,
    this.courseMaterials,
    this.thumbnail,
    this.originalPrice,
    this.sellPrice,
    this.lowestPrice,
    this.socialGroupLink,
    this.courseLink,
    this.tags,
    this.duration,
    this.difficultyLevel,
    this.isFreeCourse,
    this.startFreeDate,
    this.endFreeDate,
    this.startDate,
    this.endDate,
    this.isApproved,
    this.status,
    this.totalStudents,
    this.totalReviews,
    this.averageRating,
    this.categoryId,
    this.lecturerId,
    this.category,
    this.lecturer,
    this.lessonParts,
    this.learningProgress,
  });

  LearningData.fromJson(Map<String, dynamic> json)
      : createAt = json['createAt'] as String?,
        updateAt = json['updateAt'] as String?,
        createBy = json['createBy'],
        updateBy = json['updateBy'],
        deleteAt = json['deleteAt'],
        id = json['id'] as String?,
        name = json['name'] as String?,
        nameEn = json['nameEn'] as String?,
        shortDescription = json['shortDescription'] as String?,
        introduction = json['introduction'] as String?,
        participants = json['participants'] as String?,
        courseTargets = (json['courseTargets'] as List?)?.map((dynamic e) => e as String).toList(),
        welcomeJoin = json['welcomeJoin'] as String?,
        videoSale = json['videoSale'] as String?,
        courseMaterials = (json['courseMaterials'] as List?)?.map((dynamic e) => e as String).toList(),
        thumbnail = json['thumbnail'] as String?,
        originalPrice = json['originalPrice'] as String?,
        sellPrice = json['sellPrice'] as String?,
        lowestPrice = json['lowestPrice'] as String?,
        socialGroupLink = json['socialGroupLink'] as String?,
        courseLink = json['courseLink'] as String?,
        tags = (json['tags'] as List?)?.map((dynamic e) => e as String).toList(),
        duration = json['duration'] as String?,
        difficultyLevel = json['difficultyLevel'] as String?,
        isFreeCourse = json['isFreeCourse'] as bool?,
        startFreeDate = json['startFreeDate'],
        endFreeDate = json['endFreeDate'],
        startDate = json['startDate'],
        endDate = json['endDate'],
        isApproved = json['isApproved'] as bool?,
        status = json['status'] as String?,
        totalStudents = json['totalStudents'] as int?,
        totalReviews = json['totalReviews'] as int?,
        averageRating = json['averageRating'] as int?,
        categoryId = json['categoryId'] as String?,
        lecturerId = json['lecturerId'] as String?,
        category = (json['category'] as Map<String,dynamic>?) != null ? Category.fromJson(json['category'] as Map<String,dynamic>) : null,
        lecturer = (json['lecturer'] as Map<String,dynamic>?) != null ? Lecturer.fromJson(json['lecturer'] as Map<String,dynamic>) : null,
        lessonParts = (json['lessonParts'] as List?)?.map((dynamic e) => LessonParts.fromJson(e as Map<String,dynamic>)).toList(),
        learningProgress = (json['learningProgress'] as Map<String,dynamic>?) != null ? LearningProgress.fromJson(json['learningProgress'] as Map<String,dynamic>) : null;

  Map<String, dynamic> toJson() => {
    'createAt' : createAt,
    'updateAt' : updateAt,
    'createBy' : createBy,
    'updateBy' : updateBy,
    'deleteAt' : deleteAt,
    'id' : id,
    'name' : name,
    'nameEn' : nameEn,
    'shortDescription' : shortDescription,
    'introduction' : introduction,
    'participants' : participants,
    'courseTargets' : courseTargets,
    'welcomeJoin' : welcomeJoin,
    'videoSale' : videoSale,
    'courseMaterials' : courseMaterials,
    'thumbnail' : thumbnail,
    'originalPrice' : originalPrice,
    'sellPrice' : sellPrice,
    'lowestPrice' : lowestPrice,
    'socialGroupLink' : socialGroupLink,
    'courseLink' : courseLink,
    'tags' : tags,
    'duration' : duration,
    'difficultyLevel' : difficultyLevel,
    'isFreeCourse' : isFreeCourse,
    'startFreeDate' : startFreeDate,
    'endFreeDate' : endFreeDate,
    'startDate' : startDate,
    'endDate' : endDate,
    'isApproved' : isApproved,
    'status' : status,
    'totalStudents' : totalStudents,
    'totalReviews' : totalReviews,
    'averageRating' : averageRating,
    'categoryId' : categoryId,
    'lecturerId' : lecturerId,
    'category' : category?.toJson(),
    'lecturer' : lecturer?.toJson(),
    'lessonParts' : lessonParts?.map((e) => e.toJson()).toList(),
    'learningProgress' : learningProgress?.toJson()
  };
}

class Category {
  final String? createAt;
  final String? updateAt;
  final dynamic createBy;
  final dynamic updateBy;
  final dynamic deleteAt;
  final String? id;
  final String? name;
  final dynamic description;
  final dynamic thumbnail;

  Category({
    this.createAt,
    this.updateAt,
    this.createBy,
    this.updateBy,
    this.deleteAt,
    this.id,
    this.name,
    this.description,
    this.thumbnail,
  });

  Category.fromJson(Map<String, dynamic> json)
      : createAt = json['createAt'] as String?,
        updateAt = json['updateAt'] as String?,
        createBy = json['createBy'],
        updateBy = json['updateBy'],
        deleteAt = json['deleteAt'],
        id = json['id'] as String?,
        name = json['name'] as String?,
        description = json['description'],
        thumbnail = json['thumbnail'];

  Map<String, dynamic> toJson() => {
    'createAt' : createAt,
    'updateAt' : updateAt,
    'createBy' : createBy,
    'updateBy' : updateBy,
    'deleteAt' : deleteAt,
    'id' : id,
    'name' : name,
    'description' : description,
    'thumbnail' : thumbnail
  };
}

class Lecturer {
  final String? createAt;
  final String? updateAt;
  final dynamic createBy;
  final String? updateBy;
  final dynamic deleteAt;
  final String? id;
  final String? name;
  final String? email;
  final bool? emailVerified;
  final String? phoneNumber;
  final String? address;
  final String? bio;
  final String? password;
  final bool? isApproved;
  final String? roleId;

  Lecturer({
    this.createAt,
    this.updateAt,
    this.createBy,
    this.updateBy,
    this.deleteAt,
    this.id,
    this.name,
    this.email,
    this.emailVerified,
    this.phoneNumber,
    this.address,
    this.bio,
    this.password,
    this.isApproved,
    this.roleId,
  });

  Lecturer.fromJson(Map<String, dynamic> json)
      : createAt = json['createAt'] as String?,
        updateAt = json['updateAt'] as String?,
        createBy = json['createBy'],
        updateBy = json['updateBy'] as String?,
        deleteAt = json['deleteAt'],
        id = json['id'] as String?,
        name = json['name'] as String?,
        email = json['email'] as String?,
        emailVerified = json['emailVerified'] as bool?,
        phoneNumber = json['phoneNumber'] as String?,
        address = json['address'] as String?,
        bio = json['bio'] as String?,
        password = json['password'] as String?,
        isApproved = json['isApproved'] as bool?,
        roleId = json['roleId'] as String?;

  Map<String, dynamic> toJson() => {
    'createAt' : createAt,
    'updateAt' : updateAt,
    'createBy' : createBy,
    'updateBy' : updateBy,
    'deleteAt' : deleteAt,
    'id' : id,
    'name' : name,
    'email' : email,
    'emailVerified' : emailVerified,
    'phoneNumber' : phoneNumber,
    'address' : address,
    'bio' : bio,
    'password' : password,
    'isApproved' : isApproved,
    'roleId' : roleId
  };
}

class LessonParts {
  final String? id;
  final int? partNo;
  final String? partName;
  final String? courseId;
  final List<Lessons>? lessons;
  final List<Quizzes>? quizzes;

  LessonParts({
    this.id,
    this.partNo,
    this.partName,
    this.courseId,
    this.lessons,
    this.quizzes,
  });

  LessonParts.fromJson(Map<String, dynamic> json)
      : id = json['id'] as String?,
        partNo = json['partNo'] as int?,
        partName = json['partName'] as String?,
        courseId = json['courseId'] as String?,
        lessons = (json['lessons'] as List?)?.map((dynamic e) => Lessons.fromJson(e as Map<String,dynamic>)).toList(),
        quizzes = (json['quizzes'] as List?)?.map((dynamic e) => Quizzes.fromJson(e as Map<String,dynamic>)).toList();

  Map<String, dynamic> toJson() => {
    'id' : id,
    'partNo' : partNo,
    'partName' : partName,
    'courseId' : courseId,
    'lessons' : lessons?.map((e) => e.toJson()).toList(),
    'quizzes' : quizzes?.map((e) => e.toJson()).toList()
  };
}

class Lessons {
  final String? createAt;
  final String? updateAt;
  final dynamic createBy;
  final dynamic updateBy;
  final dynamic deleteAt;
  final String? id;
  final String? description;
  final String? title;
  final String? introduction;
  final String? duration;
  final int? order;
  final String? videoUrl;
  final List<String>? resourceLink;
  final bool? isFreeTrial;
  final String? lessonPartId;
  final bool? isComplete;
  final int? progress;
  final String? completeAt;

  Lessons({
    this.createAt,
    this.updateAt,
    this.createBy,
    this.updateBy,
    this.deleteAt,
    this.id,
    this.description,
    this.title,
    this.introduction,
    this.duration,
    this.order,
    this.videoUrl,
    this.resourceLink,
    this.isFreeTrial,
    this.lessonPartId,
    this.isComplete,
    this.progress,
    this.completeAt,
  });

  Lessons.fromJson(Map<String, dynamic> json)
      : createAt = json['createAt'] as String?,
        updateAt = json['updateAt'] as String?,
        createBy = json['createBy'],
        updateBy = json['updateBy'],
        deleteAt = json['deleteAt'],
        id = json['id'] as String?,
        description = json['description'] as String?,
        title = json['title'] as String?,
        introduction = json['introduction'] as String?,
        duration = json['duration'] as String?,
        order = json['order'] as int?,
        videoUrl = json['videoUrl'] as String?,
        resourceLink = (json['resourceLink'] as List?)?.map((dynamic e) => e as String).toList(),
        isFreeTrial = json['isFreeTrial'] as bool?,
        lessonPartId = json['lessonPartId'] as String?,
        isComplete = json['isComplete'] as bool?,
        progress = json['progress'] as int?,
        completeAt = json['completeAt'] as String?;

  Map<String, dynamic> toJson() => {
    'createAt' : createAt,
    'updateAt' : updateAt,
    'createBy' : createBy,
    'updateBy' : updateBy,
    'deleteAt' : deleteAt,
    'id' : id,
    'description' : description,
    'title' : title,
    'introduction' : introduction,
    'duration' : duration,
    'order' : order,
    'videoUrl' : videoUrl,
    'resourceLink' : resourceLink,
    'isFreeTrial' : isFreeTrial,
    'lessonPartId' : lessonPartId,
    'isComplete' : isComplete,
    'progress' : progress,
    'completeAt' : completeAt
  };
}

class Quizzes {
  final String? createAt;
  final String? updateAt;
  final dynamic createBy;
  final dynamic updateBy;
  final dynamic deleteAt;
  final String? id;
  final int? order;
  final String? content;
  final String? explanation;
  final String? choiceA;
  final String? choiceB;
  final String? choiceC;
  final String? choiceD;
  final List<String>? correctChoices;
  final String? lessonPartId;
  final bool? isComplete;

  Quizzes({
    this.createAt,
    this.updateAt,
    this.createBy,
    this.updateBy,
    this.deleteAt,
    this.id,
    this.order,
    this.content,
    this.explanation,
    this.choiceA,
    this.choiceB,
    this.choiceC,
    this.choiceD,
    this.correctChoices,
    this.lessonPartId,
    this.isComplete,
  });

  Quizzes.fromJson(Map<String, dynamic> json)
      : createAt = json['createAt'] as String?,
        updateAt = json['updateAt'] as String?,
        createBy = json['createBy'],
        updateBy = json['updateBy'],
        deleteAt = json['deleteAt'],
        id = json['id'] as String?,
        order = json['order'] as int?,
        content = json['content'] as String?,
        explanation = json['explanation'] as String?,
        choiceA = json['choiceA'] as String?,
        choiceB = json['choiceB'] as String?,
        choiceC = json['choiceC'] as String?,
        choiceD = json['choiceD'] as String?,
        correctChoices = (json['correctChoices'] as List?)?.map((dynamic e) => e as String).toList(),
        lessonPartId = json['lessonPartId'] as String?,
        isComplete = json['isComplete'] as bool?;

  Map<String, dynamic> toJson() => {
    'createAt' : createAt,
    'updateAt' : updateAt,
    'createBy' : createBy,
    'updateBy' : updateBy,
    'deleteAt' : deleteAt,
    'id' : id,
    'order' : order,
    'content' : content,
    'explanation' : explanation,
    'choiceA' : choiceA,
    'choiceB' : choiceB,
    'choiceC' : choiceC,
    'choiceD' : choiceD,
    'correctChoices' : correctChoices,
    'lessonPartId' : lessonPartId,
    'isComplete' : isComplete
  };
}

class LearningProgress {
  final int? totalCompleteLesson;
  final int? totalLesson;
  final int? courseProgress;

  LearningProgress({
    this.totalCompleteLesson,
    this.totalLesson,
    this.courseProgress,
  });

  LearningProgress.fromJson(Map<String, dynamic> json)
      : totalCompleteLesson = json['totalCompleteLesson'] as int?,
        totalLesson = json['totalLesson'] as int?,
        courseProgress = json['courseProgress'] as int?;

  Map<String, dynamic> toJson() => {
    'totalCompleteLesson' : totalCompleteLesson,
    'totalLesson' : totalLesson,
    'courseProgress' : courseProgress
  };
}