import 'package:ezkids/stl_reusable/title.dart';
import 'package:flutter/material.dart';
import 'package:reactive_forms/reactive_forms.dart';
import 'package:ezkids/classes/studentaffairs.dart';
import 'package:ezkids/classes/people.dart';

class ChildDetails extends StatefulWidget {
  const ChildDetails({super.key});

  @override
  State<ChildDetails> createState() => _ChildDetailsState();
}

class _ChildDetailsState extends State<ChildDetails> {
  String childID = "-1";
  String parentID = "-1";
  bool add = true;

  List<Session> sessionList = [
    Session("S001", "Introduction to Python", "T101"),
    Session("S002", "Data Science Fundamentals", "T101"),
    Session("S003", "Web Development with Django", "T101"),
    Session("S004", "Machine Learning with TensorFlow", "T101"),
    Session("S005", "Database Management with SQL", "T101"),
  ];

  FormGroup initializeForm(Child c) {
    return FormGroup({
      'childFirstName': FormControl<String>(value: add ? '' : c.childFirstName),
      'childLastName': FormControl<String>(value: add ? '' : c.childLastName),
      'childGender': FormControl<String>(value: add ? '' : c.childGender),
      'childDOB':
          FormControl<DateTime>(value: add ? DateTime.now() : c.childDOB),
      'childClass': FormControl<String>(value: add ? '' : c.childClass),
    });
  }

  @override
  Widget build(BuildContext context) {
    Child sampleChild = Child("1", "Emma", "Johnson", "Female", "101", "S002",
        DateTime(2015, 07, 20));

    final form = initializeForm(sampleChild);

    return Scaffold(
      body: Column(
        children: [
          const MainTitle(route: "Child Details"),
          ReactiveForm(
              formGroup: form,
              child: Column(
                children: [
                  Row(
                    children: [
                      const SizedBox(width: 25),
                      Expanded(
                          child: ReactiveTextField(
                        formControlName: 'childFirstName',
                        decoration: const InputDecoration(
                            labelText: "Student First Name"),
                      )),
                      const SizedBox(width: 25),
                      Expanded(
                          child: ReactiveTextField(
                        formControlName: 'childLastName',
                        decoration: const InputDecoration(
                            labelText: "Student Last Name"),
                      )),
                      const SizedBox(width: 25),
                    ],
                  ),
                  Row(
                    children: [
                      const SizedBox(width: 25),
                      Expanded(
                          child: ReactiveDropdownField(
                              formControlName: 'childGender',
                              decoration:
                                  const InputDecoration(labelText: "Gender"),
                              items: const [
                            DropdownMenuItem(
                                value: "Male", child: Text("Male")),
                            DropdownMenuItem(
                                value: "Female", child: Text("Female"))
                          ])),
                      const SizedBox(width: 90),
                      const Text("Birth Date"),
                      Expanded(
                          child: ReactiveDatePicker(
                        formControlName: "childDOB",
                        firstDate: DateTime(1900),
                        lastDate: DateTime(2100),
                        builder: (context, picker, child) {
                          return IconButton(
                            onPressed: picker.showPicker,
                            icon: const Icon(Icons.date_range),
                          );
                        },
                      )),
                      const SizedBox(width: 25)
                    ],
                  ),
                  Row(
                    children: [
                      const SizedBox(width: 25),
                      Expanded(
                          child: ReactiveDropdownField(
                        formControlName: "childClass",
                        items: List<DropdownMenuItem<String>>.generate(
                            sessionList.length, (int index) {
                          return DropdownMenuItem<String>(
                              value: sessionList[index].sessionID,
                              child: Text(sessionList[index].sessionName));
                        }),
                      )),
                      const SizedBox(width: 25),
                    ],
                  ),
                  const SizedBox(height: 30),
                  if (add)
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        IconButton(
                            iconSize: 35,
                            onPressed: () {
                              // TODO: Add logic (Ko Ee)
                              // To get data from form, use this example to guide you
                              // String get childName() => this.form.control('childFirstName').value;
                              // To learn more, https://pub.dev/packages/reactive_forms#how-to-getset-form-data
                            },
                            icon: const Icon(Icons.add)),
                      ],
                    )
                  else
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        IconButton(
                            iconSize: 35,
                            onPressed: () {
                              // TODO: Edit logic (Ko Ee)
                              // To get data from form, use this example to guide you
                              // String get childName() => this.form.control('childFirstName').value;
                              // To learn more, https://pub.dev/packages/reactive_forms#how-to-getset-form-data
                            },
                            icon: const Icon(Icons.edit_outlined)),
                        const SizedBox(width: 30),
                        IconButton(
                            iconSize: 35,
                            onPressed: () {
                              // TODO: Delete logic (Ko Ee)
                            },
                            icon: const Icon(Icons.delete))
                      ],
                    )
                ],
              ))
        ],
      ),
    );
  }
}
