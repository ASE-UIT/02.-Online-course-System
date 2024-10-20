import 'package:flutter/material.dart';

class PropertyItem extends StatelessWidget {
  
  final IconData iconData;
  final String propertyName;
  final String propertyValue;

  PropertyItem(
    this.iconData,
    this.propertyName,
    this.propertyValue,
  );
  
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(
          iconData, 
          size: 20,
          color: Colors.black,
        ),
        const SizedBox(width: 10), 
        Expanded(
          child: RichText(
            text: TextSpan(
              children: [
                TextSpan(
                  text: propertyName,
                  style: const TextStyle(
                    color: Colors.black, 
                    fontSize: 16,
                  ),
                ),
                TextSpan(
                  text: propertyValue,
                  style: const TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}