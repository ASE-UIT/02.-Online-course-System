// payment_model.dart
class PaymentResponse {
  final String status;
  final int code;
  final bool success;
  final String message;
  final PaymentData? data;
  final dynamic errors;

  PaymentResponse({
    required this.status,
    required this.code,
    required this.success,
    required this.message,
    this.data,
    this.errors,
  });

  factory PaymentResponse.fromJson(Map<String, dynamic> json) {
    return PaymentResponse(
      status: json['status'],
      code: json['code'],
      success: json['success'],
      message: json['message'],
      data: json['data'] != null ? PaymentData.fromJson(json['data']) : null,
      errors: json['errors'],
    );
  }
}

class PaymentData {
  final String id;
  final String totalPrice;
  final String paymentId;
  final Payment payment;
  final List<OrderItem> items;
  final String studentId;
  final String status;

  PaymentData({
    required this.id,
    required this.totalPrice,
    required this.paymentId,
    required this.payment,
    required this.items,
    required this.studentId,
    required this.status,
  });

  factory PaymentData.fromJson(Map<String, dynamic> json) {
    return PaymentData(
      id: json['id'],
      totalPrice: json['totalPrice'],
      paymentId: json['paymentId'],
      payment: Payment.fromJson(json['payment']),
      items: List<OrderItem>.from(json['items'].map((item) => OrderItem.fromJson(item))),
      studentId: json['studentId'],
      status: json['status'],
    );
  }
}

class Payment {
  final String id;
  final String payType;
  final bool paymentStatus;
  final String amount;
  final dynamic payInfo;

  Payment({
    required this.id,
    required this.payType,
    required this.paymentStatus,
    required this.amount,
    this.payInfo,
  });

  factory Payment.fromJson(Map<String, dynamic> json) {
    return Payment(
      id: json['id'],
      payType: json['payType'],
      paymentStatus: json['paymentStatus'],
      amount: json['amount'],
      payInfo: json['payInfo'],
    );
  }
}

class OrderItem {
  final String id;
  final String price;
  final String courseId;
  final Course course;

  OrderItem({
    required this.id,
    required this.price,
    required this.courseId,
    required this.course,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      id: json['id'],
      price: json['price'],
      courseId: json['courseId'],
      course: Course.fromJson(json['course']),
    );
  }
}

class Course {
  final String id;
  final String? name;
  final String? nameEn;
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
    required this.id,
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

  factory Course.fromJson(Map<String, dynamic> json) {
    return Course(
      id: json['id'],
      name: json['name'],
      nameEn: json['nameEn'],
      shortDescription: json['shortDescription'],
      introduction: json['introduction'],
      participants: json['participants'],
      courseTargets: json['courseTargets'],
      welcomeJoin: json['welcomeJoin'],
      videoSale: json['videoSale'],
      courseMaterials: json['courseMaterials'],
      thumbnail: json['thumbnail'],
      originalPrice: json['originalPrice'],
      sellPrice: json['sellPrice'],
      lowestPrice: json['lowestPrice'],
      socialGroupLink: json['socialGroupLink'],
      courseLink: json['courseLink'],
      tags: json['tags'],
      duration: json['duration'],
      difficultyLevel: json['difficultyLevel'],
      isFreeCourse: json['isFreeCourse'],
      startFreeDate: json['startFreeDate'],
      endFreeDate: json['endFreeDate'],
      startDate: json['startDate'],
      endDate: json['endDate'],
      isApproved: json['isApproved'],
      status: json['status'],
      totalStudents: json['totalStudents'],
      totalReviews: json['totalReviews'],
      averageRating: json['averageRating'],
      categoryId: json['categoryId'],
      lecturerId: json['lecturerId'],
    );
  }
}