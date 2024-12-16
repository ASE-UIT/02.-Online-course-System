import 'package:flutter/material.dart';

import '../constants/colors.dart';

class CustomSearchBar extends StatefulWidget {
  final ValueChanged<String>? onSearch; // Callback để truyền dữ liệu truy vấn ra ngoài
  final TextEditingController controller;

  const CustomSearchBar({super.key, this.onSearch, required this.controller});

  @override
  _CustomSearchBarState createState() => _CustomSearchBarState();
}

class _CustomSearchBarState extends State<CustomSearchBar> {
  String query = '';

  void onQueryChanged(String newQuery) {
    setState(() {
      query = newQuery;
    });

    if (widget.onSearch != null) {
      widget.onSearch!(newQuery); // Gọi callback để truyền dữ liệu ra ngoài
    }
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
        controller: widget.controller,
        decoration: const InputDecoration(
          hintText: 'Tìm kiếm khóa học',
          hintStyle: TextStyle(
            color: AppColors.gray600,
            fontSize: 16,
          ),
          prefixIcon: Icon(
            Icons.search,
            color: AppColors.black,
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