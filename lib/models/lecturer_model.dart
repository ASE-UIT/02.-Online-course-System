class Lecturer {
  final String? status;
  final int? code;
  final bool? success;
  final String? message;
  final LecturerData? data;
  final dynamic errors;

  Lecturer({
    this.status,
    this.code,
    this.success,
    this.message,
    this.data,
    this.errors,
  });

  Lecturer.fromJson(Map<String, dynamic> json)
      : status = json['status'] as String?,
        code = json['code'] as int?,
        success = json['success'] as bool?,
        message = json['message'] as String?,
        data = (json['data'] as Map<String,dynamic>?) != null ? LecturerData.fromJson(json['data'] as Map<String,dynamic>) : null,
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

class LecturerData {
  final String? id;
  final String? name;
  final String? email;
  final String? phoneNumber;
  final String? address;
  final String? bio;
  final bool? isApproved;

  LecturerData({
    this.id,
    this.name,
    this.email,
    this.phoneNumber,
    this.address,
    this.bio,
    this.isApproved,
  });

  LecturerData.fromJson(Map<String, dynamic> json)
      : id = json['id'] as String?,
        name = json['name'] as String?,
        email = json['email'] as String?,
        phoneNumber = json['phoneNumber'] as String?,
        address = json['address'] as String?,
        bio = json['bio'] as String?,
        isApproved = json['isApproved'] as bool?;

  Map<String, dynamic> toJson() => {
    'id' : id,
    'name' : name,
    'email' : email,
    'phoneNumber' : phoneNumber,
    'address' : address,
    'bio' : bio,
    'isApproved' : isApproved
  };
}