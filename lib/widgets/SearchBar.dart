import 'package:flutter/material.dart';

import '../constants/colors.dart';

class CustomSearchBar extends StatefulWidget {
  const CustomSearchBar({super.key});

  @override
  _CustomSearchBarState createState() => _CustomSearchBarState();
}

class _CustomSearchBarState extends State<CustomSearchBar> {
  String query = '';

  void onQueryChanged(String newQuery) {
    setState(() {
      query = newQuery;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.gray400,
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            spreadRadius: 0,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: TextField(
        onChanged: onQueryChanged,
        decoration: const InputDecoration(
          hintText: 'Tìm kiếm khóa học',
          hintStyle: TextStyle(
            color: AppColors.gray600,
            fontSize: 16,
          ),
          prefixIcon: Icon(
            Icons.search,
            color: AppColors.black ,
          ),
          border: InputBorder.none,
          contentPadding: EdgeInsets.symmetric(
            horizontal: 16,
            vertical: 14,
          ),
        ),
      ),
    );
  }
}