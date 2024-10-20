import 'package:flutter/material.dart';
import 'target_item.dart';

class TargetList extends StatelessWidget {
  final List<String> targets = [
    'Nắm vững được công cụ thiết kế của phần mềm Adobe Illustrator.',
    'Thực hành theo các dự án thực tế để nhanh chóng áp dụng vào công việc.',
    'Tự tin và chủ động trong thiết kế để nâng cao tay nghề cũng như tiếp xúc làm việc nhiều hơn với công việc thiết kế của bạn.',
    'Biết cách dựng hình 2D các vật thể đơn giản đến phức tạp theo thiết kế.',
    'Nền tảng kiến thức cơ bản để tạo ra các sản phẩm nâng cao bằng công cụ Adobe Illustrator.',
    'Học mọi lúc mọi nơi, hỗ trợ trực tuyến 24/7 cho học viên.'
  ];

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView( // Make it scrollable
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: List.generate(targets.length, (index) {
              if (index == targets.length - 1) {
                return TargetItem(text: targets[index]);
              }
              return Padding(
                padding: const EdgeInsets.only(bottom: 12.0),
                child: TargetItem(text: targets[index]),
              );
            }),
          ),
        ),
    );
  }
}
