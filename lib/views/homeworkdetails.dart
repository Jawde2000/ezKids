import 'package:ezkids/stl_reusable/title.dart';
import 'package:ezkids/classes/studentaffairs.dart';
import 'package:flutter/material.dart';
import 'package:reactive_forms/reactive_forms.dart';

class HomeworkDetails extends StatefulWidget {
  const HomeworkDetails({super.key});

  @override
  State<HomeworkDetails> createState() => _HomeworkDetailsState();
}

class _HomeworkDetailsState extends State<HomeworkDetails> {
  String homeworkID = "-1";
  String classID = "-1";
  bool add = false;

  List<Subject> subjectList = [
    Subject("1", "English"),
    Subject("2", "Biology"),
    Subject("3", "Geography"),
    Subject("4", "Malay"),
    Subject("5", "Maths"),
  ];

  FormGroup initializeForm(Homework h) {
    return FormGroup({
      'homeworkTitle': FormControl<String>(value: !add ? h.homeworkTitle : ""),
      'homeworkDesc': FormControl<String>(value: !add ? h.homeworkDesc : ""),
      'subjectName': FormControl<String>(value: !add ? h.subjectID : ""),
    });
  }

  @override
  Widget build(BuildContext context) {
    Homework sampleHomework = Homework("1", "Algebraic Expressions",
        "Solving and Simplifying Algebraic Expressions", "5", "201");

    final form = initializeForm(sampleHomework);

    return Scaffold(
      body: Column(children: [
        const MainTitle(route: "Homework Details"),
        ReactiveForm(
            formGroup: form,
            child: Column(
              children: [
                Row(
                  children: [
                    const SizedBox(width: 25),
                    Expanded(
                        child: ReactiveTextField(
                      formControlName: 'homeworkTitle',
                      decoration:
                          const InputDecoration(labelText: "Homework Title"),
                    )),
                    const SizedBox(width: 25),
                  ],
                ),
                Row(
                  children: [
                    const SizedBox(width: 25),
                    Expanded(
                        child: ReactiveTextField(
                      maxLines: 6,
                      formControlName: 'homeworkDesc',
                      decoration: const InputDecoration(
                          labelText: "Homework Description"),
                    )),
                    const SizedBox(width: 25),
                  ],
                ),
                Row(
                  children: [
                    const SizedBox(width: 25),
                    Expanded(
                        child: ReactiveDropdownField(
                      formControlName: "subjectName",
                      items: List<DropdownMenuItem<String>>.generate(
                          subjectList.length, (int index) {
                        return DropdownMenuItem<String>(
                            value: subjectList[index].subjectID,
                            child: Text(subjectList[index].subjectName));
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
      ]),
    );
  }
}
