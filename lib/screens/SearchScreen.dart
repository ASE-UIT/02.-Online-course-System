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
  bool isQueryEmpty = true;
  final TextEditingController searchController = TextEditingController();

  Future<void> performSearch(String queryText) async {
    if (queryText.isEmpty) {
      setState(() {
        searchResults = [];
        isQueryEmpty = true;
        hasError = false;
      });
      return;
    }

    setState(() {
      isLoading = true;
      hasError = false;
      isQueryEmpty = false;
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
      // debugPrint("Results:" + results.toString());

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

    debounceTimer = Timer(const Duration(milliseconds: 500), () {
      performSearch(query);
    });
  }

  double _calculateDiscount(double sellPrice, double originalPrice) {
    if (originalPrice <= 0 || sellPrice >= originalPrice) return 0.0;
    return ((originalPrice - sellPrice) / originalPrice) * 100;
  }

  void updateSearchBar(String text) {
    setState(() {
      searchController.text = text; // Update search bar text
      searchController.selection = TextSelection.fromPosition(
        TextPosition(offset: searchController.text.length),
      );
    });
    performSearch(text); // Perform search immediately
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          titleSpacing: 0,
          elevation: 0,
          automaticallyImplyLeading: false,
          backgroundColor: Colors.white,
          title: Padding(
            padding: const EdgeInsets.all(20.0),
            child: CustomSearchBar(
              onSearch: onSearchQueryChanged,
              controller: searchController,
            ),
          ),
        ),
        body: AnimatedSwitcher(
          duration: const Duration(milliseconds: 300),
          child: isLoading
              ? const Center(
                  key: Key('loading'), child: CircularProgressIndicator())
              : hasError
                  ? Center(
                      key: const Key('error'),
                      child: Text(
                        'Đã xảy ra lỗi khi tìm kiếm. Vui lòng thử lại.',
                        style: TextStyle(color: Colors.red, fontSize: 16),
                      ),
                    )
                  : isQueryEmpty
                      ? _EmptySearchResults(
                          key: Key('emptySearchResults'),
                          onTagSelected: (String query) {
                            updateSearchBar(query);
                          },
                        )
                      : searchResults.isEmpty
                          ? Center(
                              key: const Key('noResults'),
                              child: Text(
                                'Không tìm thấy khóa học nào.',
                                style: TextStyle(
                                  color: AppColors.black,
                                  fontSize: 16,
                                ),
                              ),
                            )
                          : _SearchResultsList(
                              key: const Key('searchResults'),
                              searchResults: searchResults,
                              calculateDiscount: _calculateDiscount,
                            ),
        ),
      ),
    );
  }
}

class _EmptySearchResults extends StatelessWidget {
  final Function(String) onTagSelected;

  const _EmptySearchResults({required Key key, required this.onTagSelected});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      key: key,
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
              children: [
                BorderTag(
                  text: 'Python',
                  onSelected: (bool value) {
                    if (value) onTagSelected('Python');
                  },
                ),
                BorderTag(
                  text: 'Java',
                  onSelected: (bool value) {
                    if (value) onTagSelected('Java');
                  },
                ),
                BorderTag(
                  text: "Excel",
                  onSelected: (bool value) {
                    if (value) onTagSelected('Excel');
                  },
                ),
                BorderTag(
                  text: 'React',
                  onSelected: (bool value) {
                    if (value) onTagSelected('React');
                  },
                ),
                BorderTag(
                    text: 'Photoshop',
                    onSelected: (bool value) {
                      if (value) onTagSelected('Photoshop');
                    }),
                BorderTag(
                    text: 'Digital Marketing',
                    onSelected: (bool value) {
                      if (value) onTagSelected('Digital Marketing');
                    }),
                BorderTag(
                    text: 'Javascript',
                    onSelected: (bool value) {
                      if (value) onTagSelected('Javascript');
                    }),
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
            CourseCategoryTag(
              text: "Phát triển",
              onSelected: (query) => onTagSelected(query),
            ),
            CourseCategoryTag(
                text: "CNTT & Phần mềm",
                onSelected: (query) => onTagSelected(query)),
            CourseCategoryTag(
                text: "Kinh doanh",
                onSelected: (query) => onTagSelected(query)),
            CourseCategoryTag(
                text: "Năng suất văn phòng",
                onSelected: (query) => onTagSelected(query)),
            CourseCategoryTag(
                text: "Tài chính & Kế toán",
                onSelected: (query) => onTagSelected(query)),
            CourseCategoryTag(
                text: "Thiết kế",
                onSelected: (query) => onTagSelected(query)),
            CourseCategoryTag(
                text: "Marketing",
                onSelected: (query) => onTagSelected(query)),
            CourseCategoryTag(
                text: "Sức khỏe & Thể dục",
                onSelected: (query) => onTagSelected(query)),
            CourseCategoryTag(
                text: "Nhiếp ảnh & Video",
                onSelected: (query) => onTagSelected(query)),
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
    required Key key,
  });

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      key: key,
      padding: const EdgeInsets.all(20.0),
      itemCount: searchResults.length,
      itemBuilder: (context, index) {
        final item = searchResults[index]['_source'];
        debugPrint("Results:" + item['thumbnail']);

        return Padding(
          padding: const EdgeInsets.only(bottom: 16.0),
          child: FavoriteCard(
            id: item['id'] ?? '',
            courseName: item['name'] ?? 'Không có tên',
            authorName: item['lecturer_name'] ?? 'Không rõ giảng viên',
            rating: item['average_rating']?.toDouble() ?? 0.0,
            numberOfRatings: item['total_reviews'] ?? 0,
            price: item['sell_price']?.toDouble() ?? 0.0,
            originalPrice: item['original_price']?.toDouble() ?? 0.0,
            discountPercentage: calculateDiscount(
              item['sell_price']?.toDouble() ?? 0.0,
              item['original_price']?.toDouble() ?? 0.0,
            ),
            imageUrl: item['thumbnail'],
            isBestSeller: item['is_free_course'] == true,
          ),
        );
      },
    );
  }
}
