import 'package:flutter/material.dart';
import 'package:online_course_system/widgets/FavoriteCard.dart';

class FavoriteScreen extends StatelessWidget {
  const FavoriteScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.white,

        title: const Center(
          child: Text(
            'Khóa học yêu thích',
            style: TextStyle(
              color: Colors.black,
              fontSize: 20,
              fontWeight: FontWeight.w400,
            ),
          ),
        ),
      ),
      body:
        Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              children: [
                FavoriteCard(
                  id: "",
                  courseName: 'Tên khóa học',
                  authorName: 'Tên tác giả',
                  rating: 5.0,
                  numberOfRatings: 100,
                  price: 1000000,
                  originalPrice: 2000000,
                  discountPercentage: 50,
                  imageUrl: 'assets/coursecard.png',
                  isBestSeller: false,
                ),
                FavoriteCard(
                  id: "",
                  courseName: 'Tên khóa học',
                  authorName: 'Tên tác giả',
                  rating: 5.0,
                  numberOfRatings: 100,
                  price: 100000,
                  originalPrice: 10000000,
                  discountPercentage: 50,
                  imageUrl: 'assets/coursecard.png',
                  isBestSeller: true,
                ),
              ],
            ),
          ),
        ),

    );
  }
}
