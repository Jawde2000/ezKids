import 'package:flutter/material.dart';
import 'package:reactive_forms/reactive_forms.dart';
import 'package:ezkids/stl_reusable/title.dart';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final form = FormGroup({
    'email': FormControl<String>(),
    'password': FormControl<String>(),
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(children: [
        const MainTitle(route: "Login"),
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
                  ],
                ),
                Row(
                  children: [
                    const SizedBox(width: 25),
                    Expanded(
                        child: ReactiveTextField(
                      formControlName: 'password',
                      decoration: const InputDecoration(labelText: "Password"),
                    )),
                    const SizedBox(width: 25),
                  ],
                ),
                ElevatedButton(
                    onPressed: () {
                      //TODO: Login onpressed
                    },
                    child: const Text("Login"))
              ],
            ))
      ]),
    );
  }
}
