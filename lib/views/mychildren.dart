import 'package:ezkids/classes/people.dart';
import 'package:ezkids/stl_reusable/title.dart';
import 'package:flutter/material.dart';

class MyChildren extends StatefulWidget {
  const MyChildren({super.key});

  @override
  State<MyChildren> createState() => _MyChildrenState();
}

class _MyChildrenState extends State<MyChildren> {
  List<Child> childList = [
    Child("1", "Emma", "Johnson", "Female", "101", "Kindergarten",
        DateTime(2015, 07, 20)),
    Child("2", "Liam", "Smith", "Male", "102", "1st Grade",
        DateTime(2014, 03, 15)),
    Child("3", "Ava", "Brown", "Female", "103", "2nd Grade",
        DateTime(2013, 12, 25)),
    Child("4", "Noah", "Davis", "Male", "104", "3rd Grade",
        DateTime(2012, 05, 10)),
    Child("5", "Isabella", "Wilson", "Female", "105", "4th Grade",
        DateTime(2011, 09, 01))
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
          children: [
            const MainTitle(route: "Your Children"),
            Expanded(
                child: ListView.builder(
                    scrollDirection: Axis.vertical,
                    itemCount: childList.length,
                    itemBuilder: (context, index) {
                      return Card(
                        clipBehavior: Clip.hardEdge,
                        child: InkWell(
                            onTap: () {}, //TODO: Tap logic per card
                            child: SizedBox(
                              height: 75,
                              child: Container(
                                  alignment: Alignment.center,
                                  child: Text(
                                    "${childList[index].childLastName}, ${childList[index].childFirstName}",
                                    style: const TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.w500),
                                    overflow: TextOverflow.ellipsis,
                                  )),
                            )),
                      );
                    })),
          ],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            // TODO: Tap add logic
          },
          child: const Icon(Icons.add),
        ));
  }
}
