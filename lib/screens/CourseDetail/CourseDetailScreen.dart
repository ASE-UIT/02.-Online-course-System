import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../ViewModels/course_view_model.dart';
import 'part/content.dart';
import 'part/header.dart';
import 'part/info.dart';
import 'part/review.dart';
import 'part/intro.dart';
import 'part/lecturer_info.dart';
import '../../widgets/BuyNowButton.dart';

class CourseDetailPage extends StatefulWidget {
  final String courseId;

  const CourseDetailPage({Key? key, required this.courseId}) : super(key: key);

  @override
  _CourseDetailPageState createState() => _CourseDetailPageState();
}

class _CourseDetailPageState extends State<CourseDetailPage> {
  final ScrollController _scrollController = ScrollController();
  bool _isButtonVisible = true;
  bool _isLoading = true; // Add isLoading variable

  late CourseViewModel _courseDetailVM;

  Future<void> _loadData() async {
    try {
      debugPrint('CourseId: ${widget.courseId}');
      await _courseDetailVM.getCourseDetail(widget.courseId);
      debugPrint(
          'length: ${_courseDetailVM.courseDetail.courseTargets?.length}');
    } catch (e) {
      debugPrint('Error loading courses 2: $e');
    } finally {
      setState(() {
        _isLoading = false; // Set to false once loading is complete
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(() {
      setState(() {
        _isButtonVisible = _scrollController.offset < 500;
      });
    });
    // Fetch courses asynchronously when the screen initializes
    _courseDetailVM = Provider.of<CourseViewModel>(context, listen: false);
    _loadData();
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    const String courseIntroText = '...'; // Nội dung text của khoá học

    return SafeArea(
      child: Scaffold(
        body: _isLoading
            ? Center(
                child:
                    CircularProgressIndicator()) // Show loading indicator when isLoading is true
            : Stack(
                children: [
                  SingleChildScrollView(
                    controller: _scrollController,
                    padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        CourseHeader(),
                        Image.network(
                          _courseDetailVM.courseDetail.thumbnail ?? "",
                          height: 215,
                          width: double.infinity,
                          fit: BoxFit.fill,
                          errorBuilder: (context, error, stackTrace) {
                            return Center(child: Text('Failed to load image'));
                          },
                        ),
                        const SizedBox(height: 20),
                        CourseInfo(courseDetail: _courseDetailVM.courseDetail),
                        const SizedBox(height: 16),
                        CourseIntro(
                            text: _courseDetailVM.courseDetail.introduction ??
                                courseIntroText),
                        const SizedBox(height: 16),
                        CourseContent(),
                        const SizedBox(height: 16),
                        CourseLecturerInfo(
                            courseDetail: _courseDetailVM.courseDetail),
                        const SizedBox(height: 16),
                        CourseReviews(),
                        const SizedBox(height: 100),
                      ],
                    ),
                  ),
                  Positioned(
                    bottom: 0,
                    left: 0,
                    right: 0,
                    child: Visibility(
                      visible: !_isButtonVisible,
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
                        child: Consumer<CourseViewModel>(
                          builder: (context, courseViewModel, child) {
                            final courseDetail = courseViewModel.courseDetail;
                            return BuyNowButton(
                              courseId: courseDetail.id ?? '',
                              courseName: courseDetail.name ?? '',
                              lecturerName: courseDetail.lecturer?.name ?? '',
                              sellPrice: courseDetail.sellPrice ?? '0',
                              originalPrice: courseDetail.originalPrice ?? '0',
                            );
                          },
                        ),
                      ),
                    ),
                  ),
                ],
              ),
      ),
    );
  }
}
