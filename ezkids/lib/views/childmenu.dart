import 'package:flutter/material.dart';
import 'package:ezkids/stl_reusable/title.dart';
import 'package:ezkids/classes/studentaffairs.dart';

class ChildMenu extends StatefulWidget {
  const ChildMenu({super.key});

  @override
  State<ChildMenu> createState() => _ChildMenuState();
}

class _ChildMenuState extends State<ChildMenu> {
  String studentID = "-1";

  int _selectedIndex = 0;
  final List<Widget> _widgetOptions = <Widget>[
    const ChildHomeworkList(),
    const ResultsTab()
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
          BottomNavigationBarItem(
              icon: Icon(Icons.bookmark), label: "Homework"),
          BottomNavigationBarItem(
              icon: Icon(Icons.gavel_sharp), label: "Results"),
        ], currentIndex: _selectedIndex, onTap: _onItemTapped),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            // TODO: Tap edit logic
          },
          child: const Icon(Icons.edit),
        ));
  }
}

class ChildHomeworkList extends StatefulWidget {
  const ChildHomeworkList({super.key});

  @override
  State<ChildHomeworkList> createState() => _ChildHomeworkListState();
}

class _ChildHomeworkListState extends State<ChildHomeworkList> {
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
                      child: SizedBox(
                          child: ListTile(
                              title: ExpansionTile(
                    leading: const Icon(Icons.shopping_bag),
                    title: Text(
                      homeworkList[index].homeworkTitle,
                    ),
                    childrenPadding:
                        const EdgeInsets.symmetric(vertical: 15, horizontal: 5),
                    children: [Text(homeworkList[index].homeworkDesc)],
                  ))));
                },
              ),
            )
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

class ResultsTab extends StatefulWidget {
  const ResultsTab({super.key});

  @override
  State<ResultsTab> createState() => _ResultsTabState();
}

class _ResultsTabState extends State<ResultsTab> {
  List<Grade> gradeList = [
    Grade("gradeID", "childID", "grade", "parentID", "teacherID", "subjectID")
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
          children: [
            const MainTitle(route: "Results"),
            Expanded(
              child: ListView.builder(
                scrollDirection: Axis.vertical,
                itemCount: gradeList.length,
                itemBuilder: (context, index) {
                  return Card(
                      child: SizedBox(
                          child: ListTile(
                              title: ExpansionTile(
                    leading: const Icon(Icons.shopping_bag),
                    title: Text(
                      gradeList[index]
                          .subjectID, // TODO: Get subject name from ID
                    ),
                    childrenPadding:
                        const EdgeInsets.symmetric(vertical: 15, horizontal: 5),
                    children: [Text(gradeList[index].grade)],
                  ))));
                },
              ),
            )
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
