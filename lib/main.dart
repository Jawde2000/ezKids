import 'package:ezkids/views/childdetails.dart';
import 'package:ezkids/views/childmenu.dart';
import 'package:ezkids/views/classdetails.dart';
import 'package:ezkids/views/homeworkdetails.dart';
import 'package:ezkids/views/login.dart';
import 'package:ezkids/views/mainmenu.dart';
import 'package:ezkids/views/myclasses.dart';
import 'package:ezkids/views/mychildren.dart';
import 'package:ezkids/views/onboarding.dart';
import 'package:ezkids/views/register.dart';
import 'package:ezkids/views/studentdetails.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      // TODO: Theme adjustment
      theme: ThemeData(
        brightness: Brightness.dark,
      ),
      home: const OnboardingPage(),
    );
  }
}
