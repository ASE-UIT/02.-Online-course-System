import 'dart:developer';

import 'package:chewie/chewie.dart';
import 'package:flutter/material.dart';
import 'package:online_course_system/ViewModels/learning_view_model.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/models/learning_model.dart';
import 'package:provider/provider.dart';
import 'package:video_player/video_player.dart';

class CourseScreen extends StatefulWidget {
  @override
  State<CourseScreen> createState() => _CourseScreenState();
}

class _CourseScreenState extends State<CourseScreen> {
  late LearningViewModel _learningVM;
  late VideoPlayerController _videoPlayerController;
  late ChewieController _chewieController;
  LearningData? _learningModel;
  List<LessonParts>? lessonParts;
  Lessons? currentSelect; // Add this variable to track the selected lesson

  @override
  void initState() {
    super.initState();
    // Khởi tạo VideoPlayerController
    _videoPlayerController = VideoPlayerController.networkUrl(
      Uri.parse(
          "https://csairs.website/media/eduhub-video/efefbba7-a081-4ab2-9903-dafe420aee46"), // Link video của bạn
    )..initialize().then((_) {
        setState(() {});
      });

    // Khởi tạo ChewieController
    _chewieController = ChewieController(
        videoPlayerController: _videoPlayerController,
        autoPlay: true,
        looping: true,
        startAt: Duration(seconds: 0),
        aspectRatio: 16 / 9);

    _learningVM = Provider.of<LearningViewModel>(context, listen: false);
    _loadData();
  }

  Future<void> _loadData() async {
    try {
      final r =
          await _learningVM.getLearning("30d2b059-716e-445e-ad20-bd7341d7adda");
      _learningModel = r?.data ?? LearningData();
      lessonParts = r?.data?.lessonParts;
    } catch (e) {
      debugPrint('Error loading courses 2: $e');
    }
  }

  @override
  void dispose() {
    _videoPlayerController.dispose();
    _chewieController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.primary950,
        title: Text(_learningModel?.name ?? "Tên khóa học"),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: Center(
        child: Column(
          children: [
            _videoPlayerController.value.isInitialized
                ? AspectRatio(
                    aspectRatio: _videoPlayerController.value.aspectRatio,
                    child: Chewie(controller: _chewieController),
                  )
                : CircularProgressIndicator(),
            Expanded(
              child: ListView.builder(
                itemCount: lessonParts?.length,
                itemBuilder: (context, sectionIndex) {
                  final lessonPart = lessonParts?[sectionIndex];
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Text(
                          lessonPart?.partName ?? "",
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Colors.grey,
                          ),
                        ),
                      ),
                      ...lessonPart?.lessons?.map((lesson) {
                            return InkWell(
                              child: ListTile(
                                leading: Icon(
                                  Icons.play_circle_fill,
                                  color: currentSelect == lesson
                                      ? Colors.blue
                                      : Colors.grey.shade700,
                                ),
                                title: Text(
                                  lesson.title ?? "",
                                  style: TextStyle(
                                    fontWeight: FontWeight.normal,
                                    color: currentSelect == lesson
                                        ? Colors.blue // Highlight selected
                                        : Colors.grey.shade700,
                                  ),
                                ),
                                subtitle: Text(lesson.duration ?? ""),
                                trailing: SizedBox(
                                  height: 20.0,
                                  width: 20.0,
                                  child: CircularProgressIndicator(
                                    value: lesson.progress != null ? (lesson.progress!.toDouble()/100.0) : 0.0, // Convert 'int' or 'num' to 'double'
                                    color: AppColors.success400,
                                  ),
                                ),
                                tileColor: currentSelect == lesson
                                    ? AppColors.primary100
                                    : Colors.white,
                                onTap: () {
                                  setState(() {
                                    currentSelect =
                                        lesson; // Update current selection
                                  });
                                  log(lesson.videoUrl ?? "");
                                },
                              ),
                            );
                          }).toList() ??
                          [],
                      lessonPart?.lessons?.isNotEmpty ?? false
                          ? ListTile(
                              leading: Icon(
                                Icons.question_mark_outlined,
                                color: Colors.grey.shade700,
                              ),
                              title: Text(
                                "Câu hỏi",
                                style: TextStyle(
                                  fontWeight: FontWeight.normal,
                                  color: Colors.grey.shade700,
                                ),
                              ),
                              subtitle: Text(
                                  "${lessonPart?.lessons?.length} câu hỏi"),
                              trailing: Icon(
                                Icons.check_circle,
                                color: Colors.green,
                              ),
                              tileColor: Colors.white,
                              onTap: () {},
                            )
                          : Container(),
                    ],
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
