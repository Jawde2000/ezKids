import 'package:flutter/material.dart';
import 'package:ezkids/const/strings.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();

  String _email = '';
  String _password = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Form(
        key: _formKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              child: Text(
                StringConstants.logIn,
                style: TextStyle(
                  fontSize: 30,
                  color: Colors.black, // TODO: Colour
                  fontWeight: FontWeight.bold,
                ),
                textAlign: TextAlign.center,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: TextFormField(
                validator: (value) {},
                onSaved: (value) => _email = value as String,
                decoration: const InputDecoration(
                  labelText: StringConstants.email,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: TextFormField(
                validator: (value) {},
                onSaved: (value) => _password = value as String,
                obscureText: true,
                decoration: const InputDecoration(
                  labelText: StringConstants.password,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ElevatedButton(
                onPressed: () {},
                child: Text(StringConstants.logIn),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
