class MaskProfileData {
  String name;
  String address;
  String email;
  String phone;
  String dob;

  MaskProfileData({
    this.name = '',
    this.address = '',
    this.email = '',
    this.phone = '',
    this.dob = '',
  });

  // Optionally, create a method to update the data if needed
  void update({
    String? name,
    String? address,
    String? email,
    String? phone,
    String? dob,
  }) {
    if (name != null) this.name = name;
    if (address != null) this.address = address;
    if (email != null) this.email = email;
    if (phone != null) this.phone = phone;
    if (dob != null) this.dob = dob;
  }
}