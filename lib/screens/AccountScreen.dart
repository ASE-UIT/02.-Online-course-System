import 'package:flutter/material.dart';
import 'package:online_course_system/ViewModels/profile_view_model.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/models/ProfileModel.dart';
import 'package:online_course_system/widgets/CustomListTitle.dart';
import 'package:provider/provider.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class AccountScreen extends StatefulWidget {
  const AccountScreen({super.key});

  @override
  State<AccountScreen> createState() => _AccountScreenState();
}

class _AccountScreenState extends State<AccountScreen> {
  late ProfileViewModel _profileViewModel;
  ProfileData? _myProfile;
  bool _isLoading = true;
  bool _hasToken = false;
  final _secureStorage = const FlutterSecureStorage();

  @override
  void initState() {
    super.initState();
    _profileViewModel = Provider.of<ProfileViewModel>(context, listen: false);
    _checkToken();
    debugPrint(_hasToken.toString());
    _loadData();
  }

  Future<void> _checkToken() async {
    // Logic để kiểm tra token
    final token = await _secureStorage.read(key: 'token');
    debugPrint(token);
    setState(() {
      _hasToken = token != null;
    });
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

  void _handleLogout() async {
    final shouldLogout = await showDialog<bool>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Đăng xuất'),
          content: const Text('Bạn có chắc chắn muốn đăng xuất không?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('HỦY'),
            ),
            TextButton(
              onPressed: () => Navigator.of(context).pop(true),
              child: const Text('ĐĂNG XUẤT'),
            ),
          ],
        );
      },
    );

    if (shouldLogout == true) {
      _profileViewModel.clearProfileCache();
      await _secureStorage.delete(key: 'token');
      Navigator.pushReplacementNamed(context, 'SignInScreen');
    }
  }

  Widget _buildAccountScreen() {
    return Consumer<ProfileViewModel>(
      builder: (context, profileViewModel, child) {
        if (profileViewModel.isLoading || _isLoading) {
          return const Center(child: CircularProgressIndicator());
        }

        final myProfile = profileViewModel.cachedProfileData;
        if (myProfile == null) {
          return const Center(child: Text('Không tải được thông tin'));
        }

        return Center(
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              children: [
                Container(
                  height: 1.5,
                  color: Colors.black,
                ),
                const SizedBox(height: 24),
                CircleAvatar(
                  radius: 70,
                  backgroundImage: _myProfile?.avatar != null
                      ? NetworkImage(_myProfile!.avatar as String)
                      : const AssetImage('assets/avatar_example.png')
                          as ImageProvider,
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
                        _myProfile = updatedProfile;
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
                InkWell(
                  onTap: () {
                    _handleLogout();
                  },
                  child: Row(
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
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildAboutScreen() {
    return Center(
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          children: [
            Container(
              height: 1.5,
              color: Colors.black, // Thanh màu đen ở trên cùng
            ),
            Expanded(
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      'Chào mừng đến với EduHub!',
                      style:
                          TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'Đăng nhập để sử dụng nhiều tính năng hơn!.',
                      style: TextStyle(fontSize: 16),
                    ),
                    const SizedBox(height: 24),
                    ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary500,
                        minimumSize: const Size(150, 60),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      onPressed: () {
                        Navigator.pushNamed(context, 'SignInScreen');
                      },
                      child: Text(
                        'Đăng nhập',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

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
      body: _hasToken ? _buildAccountScreen() : _buildAboutScreen(),
    );
  }
}
