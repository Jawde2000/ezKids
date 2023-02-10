// ignore_for_file: library_private_types_in_public_api

import 'package:ezkids/classes/studentaffairs.dart';
import 'package:ezkids/stl_reusable/title.dart';
import 'package:ezkids/views/myclasses.dart';
import 'package:flutter/material.dart';

class MainMenuPage extends StatefulWidget {
  const MainMenuPage({super.key});

  @override
  _MainMenuPageState createState() => _MainMenuPageState();
}

class _MainMenuPageState extends State<MainMenuPage> {
  //TODO: Role and username/signin logic
  bool isTeacher = true;
  String username = "usr";

  // TODO: Retrieve list of announcements (Ko Ee)
  List<Announcement> announcementList = [
    Announcement(
        "1",
        "Book Drive for Our Library!",
        "We are collecting gently used books for our school library. Please send in any books you no longer need by the end of the week. Your generosity will help encourage a love of reading in our young students! Thank you in advance for your support.",
        DateTime.now().toString(),
        "5"),
    Announcement(
        "2",
        "Field Trip to the Zoo!",
        "Join us for a fun-filled day at the zoo on the 20th of February! We'll be learning about all sorts of animals and their habitats. Permission slips and payment must be turned in by the 14th of February. We can't wait to see you there!",
        DateTime.now().toString(),
        "5"),
    Announcement(
        "3",
        "Important Parent-Teacher Conferences",
        "Mark your calendars! Parent-teacher conferences will be held on March 5th and 6th. Sign-ups will be available in the front office starting next week. We look forward to discussing your child's progress with you!",
        DateTime.now().toString(),
        "5"),
    Announcement(
        "4",
        "Spring Cleaning Volunteer Day",
        "We're getting the school ready for spring and we need your help! Please join us for our spring cleaning volunteer day on April 10th. We'll be working on cleaning up the playground, painting classrooms, and more. Lunch and snacks will be provided. RSVP to the front office by April 5th.",
        DateTime.now().toString(),
        "5"),
    Announcement(
        "5",
        "Kindergarten Graduation Celebration",
        "It's hard to believe, but our kindergarten students will soon be graduating! Please join us for a special celebration on May 25th at 10:00 AM. Refreshments will be served afterwards. We can't wait to see you there to celebrate this amazing milestone with our graduates!",
        DateTime.now().toString(),
        "5"),
    Announcement(
        "1",
        "Book Drive for Our Library!",
        "We are collecting gently used books for our school library. Please send in any books you no longer need by the end of the week. Your generosity will help encourage a love of reading in our young students! Thank you in advance for your support.",
        DateTime.now().toString(),
        "5"),
    Announcement(
        "2",
        "Field Trip to the Zoo!",
        "Join us for a fun-filled day at the zoo on the 20th of February! We'll be learning about all sorts of animals and their habitats. Permission slips and payment must be turned in by the 14th of February. We can't wait to see you there!",
        DateTime.now().toString(),
        "5"),
    Announcement(
        "3",
        "Important Parent-Teacher Conferences",
        "Mark your calendars! Parent-teacher conferences will be held on March 5th and 6th. Sign-ups will be available in the front office starting next week. We look forward to discussing your child's progress with you!",
        DateTime.now().toString(),
        "5"),
    Announcement(
        "4",
        "Spring Cleaning Volunteer Day",
        "We're getting the school ready for spring and we need your help! Please join us for our spring cleaning volunteer day on April 10th. We'll be working on cleaning up the playground, painting classrooms, and more. Lunch and snacks will be provided. RSVP to the front office by April 5th.",
        DateTime.now().toString(),
        "5"),
    Announcement(
        "5",
        "Kindergarten Graduation Celebration",
        "It's hard to believe, but our kindergarten students will soon be graduating! Please join us for a special celebration on May 25th at 10:00 AM. Refreshments will be served afterwards. We can't wait to see you there to celebrate this amazing milestone with our graduates!",
        DateTime.now().toString(),
        "5"),
  ];

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
        onWillPop: () async {
          return Future.value(false);
        },
        child: Scaffold(
          body: Column(
            children: [
              const MainTitle(route: "Main Menu"),
              Container(
                alignment: Alignment.topLeft,
                padding: const EdgeInsetsDirectional.fromSTEB(15, 0, 0, 5),
                child: Text("Welcome, $username",
                    style: const TextStyle(
                        fontSize: 25, fontWeight: FontWeight.w500)),
              ),
              Container(
                height: 50,
                alignment: Alignment.topCenter,
                child: Expanded(
                    child: ListView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 17.5),
                  children: [
                    if (isTeacher)
                      ActionChip(
                          avatar: const CircleAvatar(
                            child: Icon(Icons.book),
                          ),
                          label: const Text('My Classes'),
                          onPressed: () {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => const MyClasses()));
                          }),
                    if (!isTeacher)
                      ActionChip(
                          avatar: const CircleAvatar(
                            child: Icon(Icons.person),
                          ),
                          label: const Text('Student Account'),
                          onPressed: () {}),
                    const SizedBox(width: 15),
                    if (isTeacher)
                      ActionChip(
                          avatar: const CircleAvatar(
                            child: Icon(Icons.qr_code),
                          ),
                          label: const Text('Scan'),
                          onPressed: () {}),
                  ],
                )),
              ),
              const SizedBox(height: 15),
              const Text(
                "Announcements",
                style: TextStyle(fontWeight: FontWeight.w500),
              ),
              const SizedBox(height: 7.5),
              Expanded(
                child: ListView.builder(
                  scrollDirection: Axis.vertical,
                  itemCount: announcementList.length,
                  itemBuilder: (context, index) {
                    return Card(
                        child: SizedBox(
                            child: ListTile(
                                title: ExpansionTile(
                      leading: const Icon(Icons.announcement),
                      title: Text(
                        announcementList[index].announcementTitle,
                      ),
                      childrenPadding: const EdgeInsets.symmetric(
                          vertical: 15, horizontal: 5),
                      children: [
                        Text(announcementList[index].announcementDesc),
                        const SizedBox(height: 15),
                        Text(
                          "Posted On: ${announcementList[index].announcementTime}",
                          style: const TextStyle(fontWeight: FontWeight.w300),
                        )
                      ],
                    ))));
                  },
                ),
              ),
            ],
          ),
        ));
  }
}
