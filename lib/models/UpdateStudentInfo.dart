class UpdateStudentInfo {
  final String? name;
  final String? avatar;
  final String? birthday;
  final String? address;

  UpdateStudentInfo({
    this.name,
    this.avatar,
    this.birthday,
    this.address,
  });

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = {};
    if (name != null) data['name'] = name;
    if (avatar != null) data['avatar'] = avatar;
    if (birthday != null) data['birthday'] = birthday;
    if (address != null) data['address'] = address;
    return data;
  }
}