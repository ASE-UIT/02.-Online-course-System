import 'package:flutter/material.dart';

class AddToCartButton extends StatelessWidget {
  //final VoidCallback onPressed;

  //const AddToCartButton({Key? key, required this.onPressed}) : super(key: key);

  const AddToCartButton({super.key});
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: (){},
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFFFFFAD1),
        padding: const EdgeInsets.symmetric(vertical: 16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        elevation: 8,  
        shadowColor: Colors.black.withOpacity(0.25),  
      ),
      child: const Text(
        'Thêm vào giỏ hàng',
        style: TextStyle(
          fontSize: 16,
          color: Color(0xFF562600),
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
