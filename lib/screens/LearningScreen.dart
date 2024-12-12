import 'dart:developer';

import 'package:chewie/chewie.dart';
import 'package:flutter/material.dart';
import 'package:online_course_system/ViewModels/learning_view_model.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/models/UpdateLearningProgress.dart';
import 'package:online_course_system/models/learning_model.dart';
import 'package:provider/provider.dart';
import 'package:video_player/video_player.dart';

class CourseScreen extends StatefulWidget {
  @override
  State<CourseScreen> createState() => _CourseScreenState();
}

enum ContentType { video, quiz } // Loại nội dung (Video hoặc Quiz)

class SelectedContent {
  final ContentType type;
  final dynamic data;

  SelectedContent({required this.type, this.data});
}

class _CourseScreenState extends State<CourseScreen> {
  late LearningViewModel _learningVM;
  late VideoPlayerController _videoPlayerController;
  late ChewieController _chewieController;
  LearningData? _learningModel;
  List<LessonParts>? lessonParts;
  Lessons? currentSelect; // Add this variable to track the selected lesson
  SelectedContent? currentItem; // Biến chung để lưu trạng thái
  bool isLoading = true;

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
      setState(() {
        isLoading =
            true; // Set loading state to true when starting the data fetch
      });

      final r =
          await _learningVM.getLearning("30d2b059-716e-445e-ad20-bd7341d7adda");
      _learningModel = r?.data ?? LearningData();
      lessonParts = r?.data?.lessonParts;
    } catch (e) {
      debugPrint('Error loading courses: $e');
    } finally {
      setState(() {
        isLoading = false; // Set loading state to false after data is fetched
      });
    }
  }

  @override
  void dispose() {
    _videoPlayerController.dispose();
    _chewieController.dispose();
    super.dispose();
  }

  bool isQuestionSelected = false; // Thêm biến trạng thái để kiểm tra

  double _getVideoProgress() {
    final position = _videoPlayerController.value.position;
    final duration = _videoPlayerController.value.duration;

    if (duration != null && position != null) {
      return position.inMilliseconds / duration.inMilliseconds;
    }
    return 0.0;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.primary950,
        title: Text(_learningModel?.name ?? "Tên khóa học"),
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () async {
            log("currentSelect: ${currentSelect?.title}");
            double progress =
                _getVideoProgress() * 100; // Progress as percentage
            await _learningVM.updateLearningProgress(UpdateLearningProgress(
                lessonId: currentSelect?.id ?? "", progress: progress.toInt()));

            Navigator.pop(context);
          },
        ),
      ),
      body: isLoading
          ? Center(
              child: CircularProgressIndicator(),
            ) // Show loading indicator when fetching data
          : Center(
              child: Column(
                children: [
                  // Hiển thị nội dung động (Video hoặc Quiz)
                  if (currentItem?.type == ContentType.video)
                    _videoPlayerController.value.isInitialized
                        ? AspectRatio(
                            aspectRatio:
                                _videoPlayerController.value.aspectRatio,
                            child: Chewie(controller: _chewieController),
                          )
                        : AspectRatio(
                            child: Center(child: CircularProgressIndicator()),
                            aspectRatio: 16 / 9,
                          )
                  else if (currentItem?.type == ContentType.quiz)
                    Expanded(
                      child: Column(
                        children: [
                          Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: Text(
                              "Câu hỏi:",
                              style: TextStyle(
                                  fontSize: 20, fontWeight: FontWeight.bold),
                            ),
                          ),
                          // Giao diện câu hỏi
                          Text("Giao diện câu hỏi sẽ hiển thị ở đây."),
                        ],
                      ),
                    )
                  else
                    AspectRatio(
                      aspectRatio: 16 / 9,
                      child: Center(
                        child: Text("Chọn một nội dung để bắt đầu."),
                      ),
                    ),
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
                            ...lessonPart?.lessons?.map(
                                  (lesson) {
                                    return InkWell(
                                      child: ListTile(
                                        leading: Icon(
                                          Icons.play_circle_fill,
                                          color: currentItem?.data == lesson
                                              ? Colors.blue
                                              : Colors.grey.shade700,
                                        ),
                                        title: Text(
                                          lesson.title ?? "",
                                          style: TextStyle(
                                            fontWeight: FontWeight.normal,
                                            color: currentItem?.data == lesson
                                                ? Colors.blue
                                                : Colors.grey.shade700,
                                          ),
                                        ),
                                        subtitle: Text(lesson.duration ?? ""),
                                        trailing: SizedBox(
                                          height: 20.0,
                                          width: 20.0,
                                          child: CircularProgressIndicator(
                                            value: lesson.progress != null
                                                ? (lesson.progress!.toDouble() /
                                                    100.0)
                                                : 0.0,
                                            color: AppColors.success400,
                                          ),
                                        ),
                                        tileColor: currentItem?.data == lesson
                                            ? AppColors.primary100
                                            : Colors.white,
                                        onTap: () {
                                          setState(
                                            () {
                                              if (currentItem?.type ==
                                                  ContentType.video) {
                                                final currentLesson = lesson;
                                                double progress =
                                                    _getVideoProgress() *
                                                        100; // Progress as percentage
                                                _learningVM
                                                    .updateLearningProgress(
                                                  UpdateLearningProgress(
                                                    lessonId:
                                                        currentLesson.id ?? "",
                                                    progress: progress.toInt(),
                                                  ),
                                                );
                                              }
                                              currentSelect = lesson;
                                              currentItem = SelectedContent(
                                                type: ContentType.video,
                                                data: lesson,
                                              );

                                              // Cập nhật VideoPlayerController với URL mới
                                              _videoPlayerController
                                                  .pause(); // Dừng video hiện tại (nếu có)
                                              _videoPlayerController
                                                  .dispose(); // Giải phóng bộ nhớ cho controller cũ
                                              _videoPlayerController =
                                                  VideoPlayerController
                                                      .networkUrl(
                                                Uri.parse(lesson.videoUrl ??
                                                    ""), // URL mới
                                              )..initialize().then(
                                                      (_) {
                                                        // Tự động phát video mới sau khi khởi tạo xong
                                                        setState(
                                                          () {
                                                            _chewieController =
                                                                ChewieController(
                                                              videoPlayerController:
                                                                  _videoPlayerController,
                                                              autoPlay: true,
                                                              looping: true,
                                                            );
                                                          },
                                                        );
                                                      },
                                                    );
                                            },
                                          );
                                          log(lesson.videoUrl ?? "");
                                        },
                                      ),
                                    );
                                  },
                                ).toList() ??
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
                                    onTap: () {
                                      setState(
                                        () {
                                          currentItem = SelectedContent(
                                            type: ContentType.quiz,
                                            data: lessonPart
                                                ?.lessons, // Dữ liệu quiz
                                          );
                                        },
                                      );
                                    },
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
