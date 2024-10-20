import 'package:flutter/material.dart';
import 'star_bar.dart';
import 'favourite_button.dart';
import 'property_item.dart';
import 'target_list/target_list.dart';

class CourseInfo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Cẩm nang A-Z Illustrator cho Designer',
            style: TextStyle(
              fontSize: 30, 
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Giúp bạn nhanh chóng làm chủ phần mềm Adobe Illustrator, cung cấp nền tảng kiến thức cơ bản để tạo ra các sản phẩm thiết kế nâng cao và chủ động trong thiết kế',
            style: TextStyle(
              fontSize: 16, 
              color: Colors.black87,
            ),
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Text(
                '4.5',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
              const SizedBox(width: 8),
              StarBar(rating: 4.25),
              const SizedBox(width: 8),
              Text('(n đánh giá)', style: TextStyle(fontSize: 16)),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Text(
                'Giảng viên:',
                style: TextStyle(fontSize: 16),
              ),
              const SizedBox(width: 8),
              Text(
                'Nguyễn Văn A',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.blue,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(
                '000,000đ',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.blue,
                ),
              ),
              SizedBox(width: 20),
              Text(
                '000,000đ',
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.grey,
                  decoration: TextDecoration.lineThrough,
                ),
              ),
              Spacer(),
              Text(
                'Giảm xx%',
                style: TextStyle(
                  fontSize: 16,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          Row(
            children: [
              Expanded(
                child: ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFFFFFAD1),
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    elevation: 8,  // Controls the intensity of the shadow
                    shadowColor: Colors.black.withOpacity(0.25),  // Adjust the opacity to fine-tune the shadow
                  ),
                  child: const Text(
                    'Thêm vào giỏ hàng',
                    style: TextStyle(
                      fontSize: 16,
                      color: Color(0xFF562600),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 16),
              FavouriteButton(isFavourite: false),
            ],
          ),
          const SizedBox(height: 20),
          PropertyItem(Icons.videocam_outlined, "Thời lượng: ", "05 giờ 30 phút"),
          const SizedBox(height: 8),
          PropertyItem(Icons.menu_book_outlined, "Giáo trình: ", "41 bài giảng"),
          const SizedBox(height: 8),
          PropertyItem(Icons.access_time_outlined, "Sở hữu khóa học trọn đời", ""),
          const SizedBox(height: 8),
          PropertyItem(Icons.assignment_turned_in_outlined, "Cấp chứng nhận hoàn thành", ""),
          const SizedBox(height: 16),
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              border: Border.all(color: Colors.grey[300]!),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Bạn sẽ học được',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.blue,
                  ),
                ),
                const SizedBox(height: 8),
                TargetList(),
              ],
            ),
          ),
        ],
      ),
    );
  }
}