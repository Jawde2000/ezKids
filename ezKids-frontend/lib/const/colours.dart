import 'package:flutter/material.dart';

class ColourConstants {
  static const Color mainColour = Color.fromARGB(255, 54, 69, 79);
  static const Color secondaryColour = Color.fromARGB(255, 253, 184, 19);
  static const Color secondaryColourVariant = Color.fromARGB(255, 249, 160, 27);
  static const LinearGradient secondaryColourGradient = LinearGradient(
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
      colors: [secondaryColour, secondaryColourVariant]);
}
