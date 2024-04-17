import 'package:flutter/material.dart';
import '../components/button.dart';
import '../components/text_field.dart';

class AuthForm extends StatefulWidget {
  final Future<void> Function(String email, String password) onSubmit;

  const AuthForm({
    Key? key,
    required this.onSubmit,
  }) : super(key: key);

  @override
  _AuthFormState createState() => _AuthFormState();
}

class _AuthFormState extends State<AuthForm> {
  final _formKey = GlobalKey<FormState>();
  String _email = '';
  String _password = '';

  void _submit() {
    if (_formKey.currentState?.validate() ?? false) {
      widget.onSubmit(_email, _password);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Form(
        key: _formKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomTextField(
              label: 'Email',
              onChanged: (value) => _email = value,
              validator: (value) {
                if (value?.isEmpty ?? true) {
                  return 'Please enter your email';
                }
                return null;
              },
            ),
            SizedBox(height: 16.0),
            CustomTextField(
              label: 'Password',
              obscureText: true,
              onChanged: (value) => _password = value,
              validator: (value) {
                if (value?.isEmpty ?? true) {
                  return 'Please enter your password';
                }
                return null;
              },
            ),
            SizedBox(height: 32.0),
            CustomButton(
              text: 'Submit',
              onPressed: _submit,
            ),
          ],
        ),
      ),
    );
  }
}