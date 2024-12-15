import 'dart:async';

import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:online_course_system/widgets/BorderTag.dart';
import 'package:online_course_system/widgets/CourseCategoryTag.dart';
import 'package:online_course_system/widgets/FavoriteCard.dart';
import 'package:online_course_system/widgets/SearchBar.dart';
import '../services/HttpConfig.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  _SearchScreenState createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  List<dynamic> searchResults = [];
  bool isLoading = false;
  bool hasError = false;
  Timer? debounceTimer;

  Future<void> performSearch(String queryText) async {
    if (queryText.isEmpty) {
      setState(() {
        searchResults = [];
        hasError = false;
      });
      return;
    }

    setState(() {
      isLoading = true;
      hasError = false;
    });

    final Map<String, dynamic> query = {
      "min_score": 0.5,
      "query": {
        "bool": {
          "must": [
            {
              "match": {"name": queryText}
            }
          ]
        }
      },
      "from": 0,
      "size": 10,
    };

    try {
      final results = await HttpService.searchElasticsearchEduhub(query);
      debugPrint("Results: $results");

      setState(() {
        searchResults = (results['hits']?['hits'] as List<dynamic>?) ?? [];
      });
    } catch (e) {
      debugPrint('Error performing search: $e');
      setState(() {
        hasError = true;
      });
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  void onSearchQueryChanged(String query) {
    if (debounceTimer?.isActive ?? false) {
      debounceTimer?.cancel();
    }

    debounceTimer = Timer(const Duration(milliseconds: 300), () {
      performSearch(query);
    });
  }

  double _calculateDiscount(double sellPrice, double originalPrice) {
    if (originalPrice <= 0 || sellPrice >= originalPrice) return 0.0;
    return ((originalPrice - sellPrice) / originalPrice) * 100;
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          titleSpacing: 0,
          elevation: 0,
          automaticallyImplyLeading: false,
          backgroundColor: Colors.white,
          title: Padding(
            padding: const EdgeInsets.all(20.0),
            child: CustomSearchBar(
              onSearch: onSearchQueryChanged,
            ),
          ),
        ),
        body: AnimatedSwitcher(
          duration: const Duration(milliseconds: 300),
          child: isLoading
              ? const Center(child: CircularProgressIndicator())
              : hasError
                  ? Center(
                      key: const Key('error'),
                      child: Text(
                        'Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại.',
                        style: TextStyle(color: Colors.red, fontSize: 16),
                      ),
                    )
                  : searchResults.isEmpty
                      ? const _EmptySearchResults()
                      : _SearchResultsList(
                          searchResults: searchResults,
                          calculateDiscount: _calculateDiscount,
                        ),
        ),
      ),
    );
  }
}

class _EmptySearchResults extends StatelessWidget {
  const _EmptySearchResults();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      key: const Key('empty'),
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Top tìm kiếm',
              style: TextStyle(
                color: AppColors.black,
                fontSize: 18,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 12,
              runSpacing: 12,
              children: const [
                BorderTag(text: 'Python'),
                BorderTag(text: 'Java'),
                BorderTag(text: "Excel"),
                BorderTag(text: 'React'),
                BorderTag(text: 'Photoshop'),
                BorderTag(text: 'Digital Marketing'),
                BorderTag(text: 'Javascript'),
              ],
            ),
            const SizedBox(height: 20),
            Text(
              'Danh mục khóa học',
              style: TextStyle(
                color: AppColors.black,
                fontSize: 18,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 12),
            const CourseCategoryTag(text: "Phát triển"),
            const CourseCategoryTag(text: "CNTT & Phần mềm"),
            const CourseCategoryTag(text: "Kinh doanh"),
            const CourseCategoryTag(text: "Năng suất văn phòng"),
            const CourseCategoryTag(text: "Tài chính & Kế toán"),
            const CourseCategoryTag(text: "Thiết kế"),
            const CourseCategoryTag(text: "Marketing"),
            const CourseCategoryTag(text: "Sức khỏe & Thể dục"),
            const CourseCategoryTag(text: "Nhiếp ảnh & Video"),
          ],
        ),
      ),
    );
  }
}

class _SearchResultsList extends StatelessWidget {
  final List<dynamic> searchResults;
  final double Function(double, double) calculateDiscount;

  const _SearchResultsList({
    required this.searchResults,
    required this.calculateDiscount,
  });

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      key: const Key('results'),
      padding: const EdgeInsets.all(20.0),
      itemCount: searchResults.length,
      itemBuilder: (context, index) {
        final item = searchResults[index]['_source'];

        return Padding(
          padding: const EdgeInsets.only(bottom: 16.0),
          child: FavoriteCard(
            id: item['id'] ?? '',
            courseName: item['name'] ?? 'Không có tên',
            authorName: item['create_by'] ?? 'Không rõ giảng viên',
            rating: item['average_rating']?.toDouble() ?? 0.0,
            numberOfRatings: item['total_reviews'] ?? 0,
            price: item['sell_price']?.toDouble() ?? 0.0,
            originalPrice: item['original_price']?.toDouble() ?? 0.0,
            discountPercentage: calculateDiscount(
              item['sell_price']?.toDouble() ?? 0.0,
              item['original_price']?.toDouble() ?? 0.0,
            ),
            imageUrl:
                item['thumbnail'] ?? 'https://example.com/default-image.jpg',
            isBestSeller: item['is_free_course'] == true,
          ),
        );
      },
    );
  }
}
