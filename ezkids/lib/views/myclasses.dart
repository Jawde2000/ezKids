import 'package:ezkids/classes/studentaffairs.dart';
import 'package:ezkids/stl_reusable/title.dart';
import 'package:flutter/material.dart';

class MyClasses extends StatefulWidget {
  const MyClasses({super.key});

  @override
  State<MyClasses> createState() => _MyClassesState();
}

class _MyClassesState extends State<MyClasses> {
  // TODO: Retrieve list of classes (Ko Ee)
  List<Session> sessionList = [
    Session("S001", "Introduction to Python", "T101"),
    Session("S002", "Data Science Fundamentals", "T101"),
    Session("S003", "Web Development with Django", "T101"),
    Session("S004", "Machine Learning with TensorFlow", "T101"),
    Session("S005", "Database Management with SQL", "T101"),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(children: [
      const MainTitle(route: "My Classes"),
      Expanded(
          child: ListView.builder(
              scrollDirection: Axis.vertical,
              itemCount: sessionList.length,
              itemBuilder: (context, index) {
                return Card(
                  clipBehavior: Clip.hardEdge,
                  child: InkWell(
                      onTap: () {}, //TODO: Tap logic per card
                      child: SizedBox(
                        height: 100,
                        child: Container(
                            alignment: Alignment.center,
                            child: Text(
                              sessionList[index].sessionName,
                              style: const TextStyle(
                                  fontSize: 25, fontWeight: FontWeight.w600),
                              overflow: TextOverflow.ellipsis,
                            )),
                      )),
                );
              })),
    ]));
  }
}
