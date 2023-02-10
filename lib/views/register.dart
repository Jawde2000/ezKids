import 'package:flutter/material.dart';
import 'package:reactive_forms/reactive_forms.dart';
import 'package:ezkids/stl_reusable/title.dart';

class Register extends StatefulWidget {
  const Register({super.key});

  @override
  State<Register> createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  final form = FormGroup({
    'email': FormControl<String>(),
    'password': FormControl<String>(),
    'firstName': FormControl<String>(),
    'lastName': FormControl<String>(),
    'contactNumber': FormControl<String>(),
    'type': FormControl<String>(),
    'DOB': FormControl<DateTime>()
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(children: [
        const MainTitle(route: "Register"),
        ReactiveForm(
            formGroup: form,
            child: Column(
              children: [
                Row(
                  children: [
                    const SizedBox(width: 25),
                    Expanded(
                        child: ReactiveTextField(
                      formControlName: 'email',
                      decoration: const InputDecoration(labelText: "Email"),
                    )),
                    const SizedBox(width: 25),
                    Expanded(
                        child: ReactiveTextField(
                      formControlName: 'password',
                      decoration: const InputDecoration(labelText: "Password"),
                    )),
                    const SizedBox(width: 25),
                  ],
                ),
                Row(
                  children: [
                    const SizedBox(width: 25),
                    Expanded(
                        child: ReactiveTextField(
                      formControlName: 'firstName',
                      decoration:
                          const InputDecoration(labelText: "First Name"),
                    )),
                    const SizedBox(width: 25),
                    Expanded(
                        child: ReactiveTextField(
                      formControlName: 'lastName',
                      decoration: const InputDecoration(labelText: "Last Name"),
                    )),
                    const SizedBox(width: 25),
                  ],
                ),
                Row(
                  children: [
                    const SizedBox(width: 25),
                    Expanded(
                        child: ReactiveTextField(
                      formControlName: 'contactNumber',
                      decoration:
                          const InputDecoration(labelText: "Contact Number"),
                    )),
                    const SizedBox(width: 25),
                  ],
                ),
                Row(
                  children: [
                    const SizedBox(width: 25),
                    Expanded(
                        child: ReactiveDropdownField(
                            formControlName: 'type',
                            decoration:
                                const InputDecoration(labelText: "Parent Type"),
                            items: const [
                          DropdownMenuItem(
                              value: "Mother", child: Text("Mother")),
                          DropdownMenuItem(
                              value: "Father", child: Text("Father")),
                          DropdownMenuItem(
                              value: "Guardian", child: Text("Guardian")),
                        ])),
                    const SizedBox(width: 90),
                    const Text("Birth Date"),
                    Expanded(
                        child: ReactiveDatePicker(
                      formControlName: "DOB",
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
                ElevatedButton(
                    onPressed: () {
                      //TODO: Login onpressed
                    },
                    child: const Text("Register"))
              ],
            ))
      ]),
    );
  }
}
