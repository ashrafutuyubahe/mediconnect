// sign_in_screen.dart
import 'package:flutter/material.dart';
import '../widgets/auth_form.dart';
import '../services/auth_service.dart';
import '../providers/app_provider.dart';
import 'package:provider/provider.dart';

class SignInScreen extends StatelessWidget {
  const SignInScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final authService = AuthService();

    return Scaffold(
      appBar: AppBar(title: const Text('Sign In')),
      body: AuthForm(
        onSubmit: (email, password) async {
          try {
            final user = await authService.signIn(email, password);
            Provider.of<AppProvider>(context, listen: false).setUser(user);
            context.go('/');
          } catch (e) {
            // Handle error
          }
        },
      ),
    );
  }
}