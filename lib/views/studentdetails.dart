import 'package:ezkids/classes/people.dart';
import 'package:ezkids/stl_reusable/title.dart';
import 'package:flutter/material.dart';
import 'package:reactive_forms/reactive_forms.dart';

class StudentDetails extends StatefulWidget {
  const StudentDetails({super.key});

  @override
  State<StudentDetails> createState() => _StudentDetailsState();
}

class _StudentDetailsState extends State<StudentDetails> {
  String childID = "1";

  FormGroup initializeForm(Child c, Parent p) {
    return FormGroup({
      'childFirstName': FormControl<String>(value: c.childFirstName),
      'childLastName': FormControl<String>(value: c.childLastName),
      'childGender': FormControl<String>(value: c.childGender),
      'childDOB': FormControl<DateTime>(value: c.childDOB),
      'childParentFirstName': FormControl<String>(value: p.parentFirstName),
      'childParentLastName': FormControl<String>(value: p.parentLastName),
      'childParentContactNumber':
          FormControl<String>(value: p.parentContactNumber),
      'childParentEmail': FormControl<String>(value: p.parentEmail)
    });
  }

  @override
  Widget build(BuildContext context) {
    // TODO: Get student details and parent details using the ID in line 14 (Ko Ee)
    Child sampleChild = Child("1", "Emma", "Johnson", "Female", "101",
        "Kindergarten", DateTime(2015, 07, 20));
    Parent sampleParent = Parent(
        "101",
        "Sarah",
        "Jones",
        "sarahjones@email.com",
        "(555) 555-5555",
        "Mother",
        DateTime(1980, 01, 15),
        "1001",
        "sjones",
        "password123",
        "sarahjones@email.com",
        true);

    final form = initializeForm(sampleChild, sampleParent);

    return Scaffold(
      body: Column(children: [
        MainTitle(route: "Student Details - ID: $childID"),
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
                      decoration:
                          const InputDecoration(labelText: "Student Last Name"),
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
                          DropdownMenuItem(value: "Male", child: Text("Male")),
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
                const SizedBox(height: 15),
                const Center(
                  child: Text(
                    "Parent Details",
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
                  ),
                ),
                const Center(
                  child: Text(
                    "Details are read-only",
                    style: TextStyle(fontWeight: FontWeight.w300, fontSize: 15),
                  ),
                ),
                const SizedBox(height: 15),
                Row(
                  children: [
                    const SizedBox(width: 25),
                    Expanded(
                        child: ReactiveTextField(
                      readOnly: true,
                      formControlName: 'childParentFirstName',
                      decoration: const InputDecoration(
                          labelText: "Parent's First Name"),
                    )),
                    const SizedBox(width: 25),
                    Expanded(
                        child: ReactiveTextField(
                      readOnly: true,
                      formControlName: 'childParentLastName',
                      decoration: const InputDecoration(
                          labelText: "Parent's Last Name"),
                    )),
                    const SizedBox(width: 25),
                  ],
                ),
                Row(
                  children: [
                    const SizedBox(width: 25),
                    Expanded(
                        child: ReactiveTextField(
                      readOnly: true,
                      formControlName: 'childParentContactNumber',
                      decoration: const InputDecoration(
                          labelText: "Parent's Contact Number"),
                    )),
                    const SizedBox(width: 25),
                  ],
                ),
                Row(
                  children: [
                    const SizedBox(width: 25),
                    Expanded(
                        child: ReactiveTextField(
                      readOnly: true,
                      formControlName: 'childParentEmail',
                      decoration:
                          const InputDecoration(labelText: "Parent's Email"),
                    )),
                    const SizedBox(width: 25),
                  ],
                ),
                const SizedBox(height: 30),
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
      ]),
    );
  }
}
