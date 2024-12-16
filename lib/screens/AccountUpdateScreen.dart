import 'package:flutter/material.dart';
import 'package:online_course_system/ViewModels/profile_view_model.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:intl/intl.dart';
import 'package:online_course_system/models/MaskProfileData.dart';
import 'package:online_course_system/models/ProfileModel.dart';
import 'package:online_course_system/models/UpdateStudentInfo.dart';
import 'package:provider/provider.dart';

class AccountUpdateScreen extends StatefulWidget {
  const AccountUpdateScreen({super.key});

  @override
  _AccountUpdateScreenState createState() => _AccountUpdateScreenState();
}

class _AccountUpdateScreenState extends State<AccountUpdateScreen> {
  late ProfileViewModel _profileViewModel;
  MaskProfileData? _maskProfileData;
  late ProfileData profileData;

  @override
  void initState() {
    super.initState();
    _profileViewModel = Provider.of<ProfileViewModel>(context, listen: false);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_maskProfileData == null) {
      profileData = ModalRoute.of(context)?.settings.arguments as ProfileData;
      setState(() {
        _maskProfileData = MaskProfileData(
          name: profileData.name ?? 'None',
          address: profileData.address ?? 'None',
          email: profileData.email ?? 'None',
          phone: profileData.phoneNumber ?? 'None',
          dob: profileData.birthday ?? 'None',
        );
      });
    }
  }

  bool _isDataChanged() {
    if (_maskProfileData == null) {
      return false;
    }
    return _maskProfileData!.name != profileData.name ||
        _maskProfileData!.address != profileData.address ||
        _maskProfileData!.dob != profileData.birthday;
  }

  @override
  Widget build(BuildContext context) {
    if (_maskProfileData == null) {
      return const Center(child: CircularProgressIndicator());
    }

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.white,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          color: Colors.black,
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: const Text(
          'Cập nhật tài khoản',
          style: TextStyle(
            color: Colors.black,
            fontSize: 20,
            fontWeight: FontWeight.w400,
          ),
        ),
        centerTitle: true,
      ),
      body: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      height: 1.5,
                      color: Colors.black,
                    ),
                    const SizedBox(height: 18),
                    const Text(
                      'THÔNG TIN CÁ NHÂN',
                      style: TextStyle(
                          fontWeight: FontWeight.w400,
                          color: AppColors.gray700,
                          fontSize: 16),
                    ),
                    const SizedBox(height: 8),
                    _buildNavigationField(context, Icons.account_circle,
                        'Họ và tên', _maskProfileData!.name, onTap: () {
                      _showEditDialog('Họ và tên', _maskProfileData!.name,
                          (value) {
                        setState(() {
                          _maskProfileData!.name = value; // Update name
                        });
                      });
                    }),
                    const Divider(color: AppColors.gray500),
                    _buildNavigationField(
                        context, Icons.email, 'Email', _maskProfileData!.email,
                        onTap: () {
                      // Email update functionality goes here
                    }),
                    const Divider(color: AppColors.gray500),
                    _buildNavigationField(context, Icons.phone, 'Số điện thoại',
                        _maskProfileData!.phone, onTap: () {
                      // Phone update functionality goes here
                    }),
                    const Divider(color: AppColors.gray500),
                    _buildNavigationField(context, Icons.calendar_month,
                        'Ngày sinh', _formatDate(_maskProfileData!.dob), onTap: () {
                      _showDatePicker(context, _maskProfileData!.dob);
                    }),
                    const Divider(color: AppColors.gray500),
                    _buildNavigationField(context, Icons.location_on, 'Địa chỉ',
                        _maskProfileData!.address, onTap: () {
                      _showEditDialog('Địa chỉ', _maskProfileData!.address,
                          (value) {
                        setState(() {
                          _maskProfileData!.address = value;
                        });
                      });
                    }),
                  ],
                ),
              ),
            ),
            ElevatedButton(
              onPressed: _isDataChanged()
                  ? () async {
                      final updateRequest = UpdateStudentInfo(
                        name: _maskProfileData!.name,
                        birthday: _maskProfileData!.dob,
                        address: _maskProfileData!.address,
                      );

                      var info = updateRequest.toJson().toString();
                      debugPrint('Info: $info');
                      await _profileViewModel.updateMyProfile(updateRequest);

                      // Xử lý thành công hoặc lỗi
                      if (_profileViewModel.errorMessage != null) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                              content: Text(_profileViewModel.errorMessage!)),
                        );
                      } else {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            content: Row(
                              children: [
                                Icon(Icons.check_circle, color: Colors.green),
                                SizedBox(width: 10),
                                Text("Cập nhật thông tin thành công!"),
                              ],
                            ),
                            backgroundColor: Colors.black87,
                            behavior: SnackBarBehavior.floating,
                            duration: Duration(seconds: 1),
                          ),
                        );
                       Navigator.pop(context, _profileViewModel.cachedProfileData);
                      }
                    }
                  : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary500,
                minimumSize: const Size(double.infinity, 60),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: const Text(
                "CẬP NHẬT TÀI KHOẢN",
                style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: Colors.white),
              ),
            ),
            const SizedBox(height: 30)
          ],
        ),
      ),
    );
  }

  void _showEditDialog(
      String title, String initialValue, ValueChanged<String> onSave) {
    final controller = TextEditingController(text: initialValue);
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: TextField(
          controller: controller,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Hủy'),
          ),
          TextButton(
            onPressed: () {
              onSave(controller.text);
              Navigator.of(context).pop();
            },
            child: const Text('Lưu'),
          ),
        ],
      ),
    );
  }

  void _showDatePicker(BuildContext context, String initialDate) async {
    DateTime initial = DateTime.tryParse(initialDate) ?? DateTime.now();

    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: initial,
      firstDate: DateTime(1900),
      lastDate: DateTime(2100),
    );

    if (picked != null) {
      setState(() {
        _maskProfileData!.dob = DateFormat('yyyy-MM-dd').format(picked);
      });
    }
  }

  String _formatDate(String? date) {
    if (date == null || date.isEmpty) return 'Chưa cập nhật';
    try {
      DateTime parsedDate = DateTime.parse(date);
      return DateFormat('dd-MM-yyyy').format(parsedDate);
    } catch (e) {
      return 'Ngày không hợp lệ';
    }
  }

  Widget _buildNavigationField(
      BuildContext context, IconData icon, String label, String value,
      {VoidCallback? onTap}) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 22.0),
        child: Row(
          children: [
            Icon(icon, size: 24, color: Colors.black),
            const SizedBox(width: 16),
            Expanded(
              child: Text.rich(
                TextSpan(
                  children: [
                    TextSpan(
                      text: label,
                      style: const TextStyle(fontSize: 16),
                    ),
                    const TextSpan(
                      text: ' *',
                      style: TextStyle(fontSize: 16, color: Colors.red),
                    ),
                  ],
                ),
              ),
            ),
            Text(
              value,
              style: const TextStyle(
                fontSize: 16,
                color: AppColors.primary500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
