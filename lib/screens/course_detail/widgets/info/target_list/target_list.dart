import 'package:flutter/material.dart';
import 'target_item.dart';

class TargetList extends StatelessWidget {
  final List<String> targets;

  const TargetList({Key? key, required this.targets}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView( // Make it scrollable
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: List.generate(targets.length, (index) {
              if (index == targets.length - 1) {
                return TargetItem(text: targets[index]);
              }
              return Padding(
                padding: const EdgeInsets.only(bottom: 12.0),
                child: TargetItem(text: targets[index]),
              );
            }),
          ),
        ),
    );
  }
}
