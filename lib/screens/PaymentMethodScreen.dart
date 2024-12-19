import 'package:flutter/material.dart';
import 'package:online_course_system/constants/colors.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../../ViewModels/payment_view_model.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:url_launcher/url_launcher.dart';

class PaymentMethodScreen extends StatefulWidget {
  final String courseId;
  final String courseName;
  final String lecturerName;
  final String sellPrice;
  final String originalPrice;
  final String customerName;
  final String customerEmail;
  final String customerPhone;

  const PaymentMethodScreen({
    Key? key,
    required this.courseId,
    required this.courseName,
    required this.lecturerName,
    required this.sellPrice,
    required this.originalPrice,
    required this.customerName,
    required this.customerEmail,
    required this.customerPhone,
  }) : super(key: key);

  @override
  _PaymentMethodScreenState createState() => _PaymentMethodScreenState();
}

class _PaymentMethodScreenState extends State<PaymentMethodScreen> {
  String? _selectedPaymentMethod;

  final List<String> paymentMethods = [
    'Thẻ ATM/Internet Banking VNPay',
    'Ví điện tử Momo',
    'Ví điện tử Shopee Pay',
    'Ví điện tử Zalo Pay',
    'Chuyển khoản ngân hàng',
    'Thẻ quốc tế Visa/Master',
  ];

  String _formatCurrency(String price) {
    final formatter = NumberFormat("#,###", "vi_VN");
    try {
      return formatter.format(int.parse(price)) + 'đ';
    } catch (e) {
      return '0đ';
    }
  }

  @override
  void initState() {
    super.initState();
    _selectedPaymentMethod = paymentMethods[0];
  }

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<PaymentViewModel>(
      create: (context) => PaymentViewModel(),
      child: Scaffold(
        backgroundColor: AppColors.white,
        appBar: AppBar(
          backgroundColor: AppColors.white,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back, color: AppColors.black),
            onPressed: () {
              Navigator.pop(context);
            },
          ),
          title: const Text(
            'Thông Tin Thanh Toán',
            style: TextStyle(
                color: AppColors.black,
                fontSize: 20,
                fontWeight: FontWeight.w600
            ),
          ),
          centerTitle: true,
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              //Course Info
              const Text(
                'Thông tin khóa học',
                style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w700
                ),
              ),
              const SizedBox(height: 10),
              Text(
                widget.courseName,
                style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600
                ),
              ),
              const SizedBox(height: 10),
              Text(
                widget.lecturerName,
                style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w400
                ),
              ),
              const SizedBox(height: 10),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Text(
                    _formatCurrency(widget.sellPrice),
                    style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700
                    ),
                  ),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Text(
                    _formatCurrency(widget.originalPrice),
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.gray600,
                      fontWeight: FontWeight.w400,
                      decoration: TextDecoration.lineThrough,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),
              const Text(
                'Hình thức thanh toán',
                style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w700
                ),
              ),
              const SizedBox(height: 20),
              ...paymentMethods.map((method) {
                return Column (
                    children: [
                      _buildPaymentMethodTile(method),
                      const SizedBox(height: 20)
                    ]
                );
              }).toList(),
              SizedBox(
                width: 430,
                height: 48,
                child: Consumer<PaymentViewModel>(
                  builder: (context, paymentViewModel, child) {
                    return ElevatedButton(
                      onPressed: () async {
                        if (_selectedPaymentMethod == 'Thẻ ATM/Internet Banking VNPay') {
                          try {
                            await paymentViewModel.createOrder(
                              widget.courseId,
                              widget.customerName,
                              widget.customerEmail,
                              widget.customerPhone,
                            );

                            if (paymentViewModel.paymentUrl != null) {
                              // ignore: use_build_context_synchronously
                              final Uri url = Uri.parse(paymentViewModel.paymentUrl!);
                              if (!await launchUrl(url)) {
                                throw Exception('Could not launch $url');
                              }
                            } else {
                              // Xử lý trường hợp không nhận được URL thanh toán
                              Fluttertoast.showToast(msg: "Không nhận được URL thanh toán");
                            }
                          } catch (e) {
                            // Xử lý lỗi khi tạo đơn hàng
                            Fluttertoast.showToast(msg: "Lỗi khi tạo đơn hàng: $e");
                          }
                        } else {
                          Fluttertoast.showToast(
                            msg: "Chỉ hỗ trợ VNPay",
                            toastLength: Toast.LENGTH_SHORT,
                            gravity: ToastGravity.CENTER,
                          );
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.primary500,
                        padding: const EdgeInsets.all(12),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      child: const Text(
                        'Tiếp tục',
                        style: TextStyle(
                          fontSize: 16,
                          color: AppColors.white,
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPaymentMethodTile(String method) {
    return InkWell(
        onTap: () {
          setState(() {
            _selectedPaymentMethod = method;
          });
        },
        child: Container(
          width: 390,
          height: 40,
          padding: const EdgeInsets.symmetric(horizontal: 12),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: AppColors.gray600,
              width: 1,
            ),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                method,
                style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w500
                ),
              ),
              Container(
                width: 20,
                height: 20,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: AppColors.gray600,
                    width: 1.5,
                  ),
                ),
                child: Center(
                  child: Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: _selectedPaymentMethod == method
                          ? AppColors.primary500
                          : Colors.transparent,
                    ),
                  ),
                ),
              ),
            ],
          ),
        )
    );
  }
}