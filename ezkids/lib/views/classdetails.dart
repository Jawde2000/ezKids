import 'package:ezkids/classes/people.dart';
import 'package:ezkids/classes/studentaffairs.dart';
import 'package:ezkids/stl_reusable/title.dart';
import 'package:flutter/material.dart';

class ClassDetails extends StatefulWidget {
  const ClassDetails({super.key});

  @override
  State<ClassDetails> createState() => _ClassDetailsState();
}

class _ClassDetailsState extends State<ClassDetails> {
  String classID = "C0101";
  // TODO: Get class details using this ID (Ko Ee)

  int _selectedIndex = 0;
  final List<Widget> _widgetOptions = <Widget>[
    const StudentList(),
    const HomeworkList()
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _widgetOptions.elementAt(_selectedIndex),
      bottomNavigationBar:
          BottomNavigationBar(items: const <BottomNavigationBarItem>[
        BottomNavigationBarItem(icon: Icon(Icons.person), label: "Students"),
        BottomNavigationBarItem(icon: Icon(Icons.bookmark), label: "Homework"),
      ], currentIndex: _selectedIndex, onTap: _onItemTapped),
    );
  }
}

class StudentList extends StatefulWidget {
  const StudentList({super.key});

  @override
  State<StudentList> createState() => _StudentListState();
}

class _StudentListState extends State<StudentList> {
  //TODO: Retrieve list of students in this class (Ko Ee)
  List<Child> classMembers = [
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
    return Column(
      children: [
        const MainTitle(route: "Students"),
        Expanded(
            child: ListView.builder(
                scrollDirection: Axis.vertical,
                itemCount: classMembers.length,
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
                                "${classMembers[index].childLastName}, ${classMembers[index].childFirstName}",
                                style: const TextStyle(
                                    fontSize: 20, fontWeight: FontWeight.w500),
                                overflow: TextOverflow.ellipsis,
                              )),
                        )),
                  );
                })),
      ],
    );
  }
}

class HomeworkList extends StatefulWidget {
  const HomeworkList({super.key});

  @override
  State<HomeworkList> createState() => _HomeworkListState();
}

class _HomeworkListState extends State<HomeworkList> {
  List<Homework> homeworkList = [
    Homework("1", "Algebraic Expressions",
        "Solving and Simplifying Algebraic Expressions", "101", "201"),
    Homework("2", "History of World War II",
        "Essay on causes, events, and aftermath of World War II", "102", "202"),
    Homework("3", "The Great Gatsby",
        "Book Report on The Great Gatsby by F. Scott Fitzgerald", "103", "203"),
    Homework("4", "Introduction to Programming",
        "Creating a simple program in Python", "104", "204"),
    Homework("5", "Cell Biology",
        "Study of the structure and function of cells", "105", "205")
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
          children: [
            const MainTitle(route: "Homework"),
            Expanded(
                child: ListView.builder(
                    scrollDirection: Axis.vertical,
                    itemCount: homeworkList.length,
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
                                    homeworkList[index].homeworkTitle,
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
