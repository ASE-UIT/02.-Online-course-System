class PaymentResponse {
  final String? status;
  final int? code;
  final bool? success;
  final String? message;
  final PaymentResponseData? data;
  final dynamic errors;

  PaymentResponse({
    this.status,
    this.code,
    this.success,
    this.message,
    this.data,
    this.errors,
  });

  PaymentResponse.fromJson(Map<String, dynamic> json)
      : status = json['status'] as String?,
        code = json['code'] as int?,
        success = json['success'] as bool?,
        message = json['message'] as String?,
        data = (json['data'] as Map<String,dynamic>?) != null ? PaymentResponseData.fromJson(json['data'] as Map<String,dynamic>) : null,
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

class PaymentResponseData {
  final String? id;
  final int? totalPrice;
  final String? paymentId;
  final Payment? payment;
  final List<Items>? items;
  final String? studentId;
  final String? status;

  PaymentResponseData({
    this.id,
    this.totalPrice,
    this.paymentId,
    this.payment,
    this.items,
    this.studentId,
    this.status,
  });

  PaymentResponseData.fromJson(Map<String, dynamic> json)
      : id = json['id'] as String?,
        totalPrice = json['totalPrice'] as int?,
        paymentId = json['paymentId'] as String?,
        payment = (json['payment'] as Map<String,dynamic>?) != null ? Payment.fromJson(json['payment'] as Map<String,dynamic>) : null,
        items = (json['items'] as List?)?.map((dynamic e) => Items.fromJson(e as Map<String,dynamic>)).toList(),
        studentId = json['studentId'] as String?,
        status = json['status'] as String?;

  Map<String, dynamic> toJson() => {
    'id' : id,
    'totalPrice' : totalPrice,
    'paymentId' : paymentId,
    'payment' : payment?.toJson(),
    'items' : items?.map((e) => e.toJson()).toList(),
    'studentId' : studentId,
    'status' : status
  };
}

class Payment {
  final String? id;
  final String? payType;
  final bool? paymentStatus;
  final int? amount;
  final dynamic payInfo;

  Payment({
    this.id,
    this.payType,
    this.paymentStatus,
    this.amount,
    this.payInfo,
  });

  Payment.fromJson(Map<String, dynamic> json)
      : id = json['id'] as String?,
        payType = json['payType'] as String?,
        paymentStatus = json['paymentStatus'] as bool?,
        amount = json['amount'] as int?,
        payInfo = json['payInfo'];

  Map<String, dynamic> toJson() => {
    'id' : id,
    'payType' : payType,
    'paymentStatus' : paymentStatus,
    'amount' : amount,
    'payInfo' : payInfo
  };
}

class Items {
  final String? id;
  final String? price;
  final String? courseId;
  final Course? course;

  Items({
    this.id,
    this.price,
    this.courseId,
    this.course,
  });

  Items.fromJson(Map<String, dynamic> json)
      : id = json['id'] as String?,
        price = json['price'] as String?,
        courseId = json['courseId'] as String?,
        course = (json['course'] as Map<String,dynamic>?) != null ? Course.fromJson(json['course'] as Map<String,dynamic>) : null;

  Map<String, dynamic> toJson() => {
    'id' : id,
    'price' : price,
    'courseId' : courseId,
    'course' : course?.toJson()
  };
}

class Course {
  final String? id;
  final String? name;
  final dynamic nameEn;
  final String? shortDescription;
  final dynamic introduction;
  final String? participants;
  final dynamic courseTargets;
  final dynamic welcomeJoin;
  final dynamic videoSale;
  final dynamic courseMaterials;
  final String? thumbnail;
  final String? originalPrice;
  final String? sellPrice;
  final dynamic lowestPrice;
  final dynamic socialGroupLink;
  final dynamic courseLink;
  final dynamic tags;
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

  Course({
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
  });

  Course.fromJson(Map<String, dynamic> json)
      : id = json['id'] as String?,
        name = json['name'] as String?,
        nameEn = json['nameEn'],
        shortDescription = json['shortDescription'] as String?,
        introduction = json['introduction'],
        participants = json['participants'] as String?,
        courseTargets = json['courseTargets'],
        welcomeJoin = json['welcomeJoin'],
        videoSale = json['videoSale'],
        courseMaterials = json['courseMaterials'],
        thumbnail = json['thumbnail'] as String?,
        originalPrice = json['originalPrice'] as String?,
        sellPrice = json['sellPrice'] as String?,
        lowestPrice = json['lowestPrice'],
        socialGroupLink = json['socialGroupLink'],
        courseLink = json['courseLink'],
        tags = json['tags'],
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
        lecturerId = json['lecturerId'] as String?;

  Map<String, dynamic> toJson() => {
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
    'lecturerId' : lecturerId
  };
}