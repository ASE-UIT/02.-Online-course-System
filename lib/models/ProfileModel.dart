class ProfileModel {
  final String? status;
  final int? code;
  final bool? success;
  final String? message;
  final ProfileData? data;
  final dynamic errors;

  ProfileModel({
    this.status,
    this.code,
    this.success,
    this.message,
    this.data,
    this.errors,
  });

  ProfileModel.fromJson(Map<String, dynamic> json)
    : status = json['status'] as String?,
      code = json['code'] as int?,
      success = json['success'] as bool?,
      message = json['message'] as String?,
      data = (json['data'] as Map<String,dynamic>?) != null ? ProfileData.fromJson(json['data'] as Map<String,dynamic>) : null,
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

class ProfileData {
  final String? createAt;
  final String? updateAt;
  final dynamic createBy;
  final dynamic updateBy;
  final dynamic deleteAt;
  final String? id;
  final String? name;
  final String? email;
  final dynamic avatar;
  final dynamic phoneNumber;
  final String? roleId;

  ProfileData({
    this.createAt,
    this.updateAt,
    this.createBy,
    this.updateBy,
    this.deleteAt,
    this.id,
    this.name,
    this.email,
    this.avatar,
    this.phoneNumber,
    this.roleId,
  });

  ProfileData.fromJson(Map<String, dynamic> json)
    : createAt = json['createAt'] as String?,
      updateAt = json['updateAt'] as String?,
      createBy = json['createBy'],
      updateBy = json['updateBy'],
      deleteAt = json['deleteAt'],
      id = json['id'] as String?,
      name = json['name'] as String?,
      email = json['email'] as String?,
      avatar = json['avatar'],
      phoneNumber = json['phoneNumber'],
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
    'avatar' : avatar,
    'phoneNumber' : phoneNumber,
    'roleId' : roleId
  };
}