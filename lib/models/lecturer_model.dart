class Lecturer {
  final String id;
  final String name;
  final String email;
  final String phoneNumber;
  final String address;
  final String bio;
  final bool isApproved;

  Lecturer({
    required this.id,
    required this.name,
    required this.email,
    required this.phoneNumber,
    required this.address,
    required this.bio,
    required this.isApproved
  });

  factory Lecturer.fromJson(Map<String, dynamic> json) {
    return Lecturer(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      phoneNumber: json['phoneNumber'] ?? '',
      address: json['address'] ?? '',
      bio: json['bio'] ?? '',
      isApproved: json['isApproved'] ?? false
    );
  }
}