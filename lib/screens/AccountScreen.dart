import 'package:flutter/material.dart';
import 'package:online_course_system/ViewModels/profile_view_model.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/models/ProfileModel.dart';
import 'package:online_course_system/widgets/CustomListTitle.dart';
import 'package:provider/provider.dart';

class AccountScreen extends StatefulWidget {
  const AccountScreen({super.key});

  @override
  State<AccountScreen> createState() => _AccountScreenState();
}

class _AccountScreenState extends State<AccountScreen> {
  late ProfileViewModel _profileViewModel;
  ProfileData? _myProfile;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _profileViewModel = Provider.of<ProfileViewModel>(context, listen: false);
    _loadData();
  }

  Future<void> _loadData() async {
    try {
      var myProfile = await _profileViewModel.getMyProfile();
      setState(() {
        _myProfile = myProfile;
        _isLoading = false; // Set loading state to false when data is fetched
      });
    } catch (e) {
      debugPrint('Error loading profule: $e');
      setState(() {
        _isLoading = false; // Stop loading even if there's an error
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        elevation: 0,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.white,
        title: const Center(
          child: Text(
            'Tài khoản',
            style: TextStyle(
              color: Colors.black,
              fontSize: 20,
              fontWeight: FontWeight.w400,
            ),
          ),
        ),
      ),
      body: Consumer<ProfileViewModel>(
        builder: (context, profileViewModel, child) {
          if (profileViewModel.isLoading || _isLoading) {
            return Center(child: CircularProgressIndicator());
          }

          final myProfile = profileViewModel.cachedProfileData;
          if (myProfile == null) {
            return Center(child: Text('Không tải được thông tin'));
          }

          return Center(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                children: [
                  Container(
                    height: 1.5, // Thickness of the separator
                    color: Colors.black, // Color of the separator
                  ),
                  const SizedBox(height: 24),
                  Container(
                    width: 140, // Fixed size
                    height: 140,
                    child: CircleAvatar(
                      backgroundImage: _myProfile?.avatar != null
                          ? NetworkImage(
                              _myProfile!.avatar as String) // Cast if necessary
                          : const AssetImage('assets/avatar_example.png')
                              as ImageProvider,
                    ),
                  ),
                  const SizedBox(height: 24),
                  Text(
                    _myProfile?.name ?? 'Unknown User',
                    style: const TextStyle(
                        fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 24),
                  CustomListTile(
                    title: 'Cập nhật thông tin',
                    onTap: () async {
                      final updatedProfile = await Navigator.pushNamed(
                        context,
                        'AccountUpdateScreen',
                        arguments: _myProfile,
                      ) as ProfileData?;

                      if (updatedProfile != null) {
                        setState(() {
                          _myProfile =
                              updatedProfile; // Cập nhật hồ sơ với dữ liệu mới
                        });
                      }
                    },
                  ),
                  CustomListTile(
                    title: 'Đổi mật khẩu',
                    onTap: () {},
                  ),
                  CustomListTile(
                    title: 'Xóa tài khoản',
                    onTap: () {},
                  ),
                  const SizedBox(height: 12),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.logout,
                        color: AppColors.error500,
                        size: 24,
                      ),
                      SizedBox(width: 8),
                      Text(
                        'ĐĂNG XUẤT',
                        style: TextStyle(
                          color: AppColors.error500,
                          fontSize: 16,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
