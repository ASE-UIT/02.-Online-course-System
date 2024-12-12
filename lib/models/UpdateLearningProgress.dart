class UpdateLearningProgress {
  final String lessonId;
  final int progress;

  UpdateLearningProgress({required this.lessonId, required this.progress});
  Map<String, dynamic> toJson() {
    return {
      'lessonId': lessonId,
      'progress': progress,
    };
  }
}
