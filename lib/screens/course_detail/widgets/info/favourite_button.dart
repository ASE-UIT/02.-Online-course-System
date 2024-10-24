import 'package:flutter/material.dart';

class FavouriteButton extends StatefulWidget {
  bool isFavourite;

  FavouriteButton({super.key, required this.isFavourite});

  @override
  _FavouriteButtonState createState() => _FavouriteButtonState();
}

class _FavouriteButtonState extends State<FavouriteButton> {

  void _toggleFavourite() {
    setState(() {
      widget.isFavourite = !widget.isFavourite; // Toggle the state
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 40,
      height: 40,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.black26),
        borderRadius: BorderRadius.circular(4),
        boxShadow: [
          BoxShadow(
            blurRadius: 8,
            color: Colors.black26,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: IconButton(
        icon: Icon(
          widget.isFavourite ? Icons.favorite : Icons.favorite_border,
          color: widget.isFavourite ? Colors.red : Colors.black,
          size: 24,
        ),
        onPressed: _toggleFavourite, // Call the toggle function
        splashRadius: 24, // Adjust splash radius if needed
      ),
    );
  }
}
