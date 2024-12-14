import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:intl/intl.dart';

class AccountUpdateScreen extends StatefulWidget {
  const AccountUpdateScreen({super.key});

  @override
  _AccountUpdateScreenState createState() => _AccountUpdateScreenState();
}

class _AccountUpdateScreenState extends State<AccountUpdateScreen> {
  String _name = 'Nguyễn Hình Di Híu';
  String _address = 'Thủ Đức';
  String _email = 'nguyenduyh@gmail.com';
  String _phone = '+84123456789';
  String _dob = '25-10-2024';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.white,
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
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
                    const SizedBox(height: 8,),
                    _buildNavigationField(
                        context, Icons.account_circle, 'Họ và tên', _name,
                        onTap: () {
                      _showEditDialog('Họ và tên', _name, (value) {
                        setState(() {
                          _name = value;
                        });
                      });
                    }),
                    
                    Container(
                      height: 1,
                      color: AppColors.gray500,
                    ),
                    
                    _buildNavigationField(context, Icons.email, 'Email', _email,
                        onTap: () {
                      Navigator.pushNamed(
                        context,
                        'UpdateEmailScreen',
                      );
                    }),
                    
                    Container(
                      height: 1,
                      color: AppColors.gray500,
                    ),
                    
                    _buildNavigationField(
                        context, Icons.phone, 'Số điện thoại', _phone,
                        onTap: () {
                      Navigator.pushNamed(
                        context,
                        'UpdatePhoneScreen'
                      );
                    }),
                    
                    Container(
                      height: 1,
                      color: AppColors.gray500,
                    ),
                    
                    _buildNavigationField(
                        context, Icons.calendar_month, 'Ngày sinh', _dob,
                        onTap: () {
                      _showDatePicker(context, _dob);
                    }),
                    
                    Container(
                      height: 1,
                      color: AppColors.gray500,
                    ),
                    
                    _buildNavigationField(
                        context, Icons.location_on, 'Địa chỉ', _address,
                        onTap: () {
                      _showEditDialog('Địa chỉ', _address, (value) {
                        setState(() {
                          _address = value;
                        });
                      });
                    }),
                  ],
                ),
              ),
            ),
            ElevatedButton(
              onPressed: () {
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
                Navigator.pop(context);
              },
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
            child: Text('Hủy'),
          ),
          TextButton(
            onPressed: () {
              onSave(controller.text);
              Navigator.of(context).pop();
            },
            child: Text('Lưu'),
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
        _dob = DateFormat('dd-MM-yyyy').format(picked);
      });
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
