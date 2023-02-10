import 'package:flutter/material.dart';

class MainTitle extends StatelessWidget {
  final String route;

  const MainTitle({super.key, required this.route});

  @override
  Widget build(BuildContext context) {
    return Container(
        alignment: Alignment.bottomCenter,
        padding: const EdgeInsets.symmetric(vertical: 30),
        child: Column(children: [
          const Text(
            "ezKids",
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 40),
          ),
          Text(route)
        ]));
  }
}
