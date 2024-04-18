import 'package:flutter/material.dart';
import '../widgets/auth_form.dart';
import '../services/auth_service.dart';
import '../providers/app_provider.dart';
import 'package:provider/provider.dart';

class RegisterScreen extends StatelessWidget {
  const RegisterScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final authService = AuthService();

    return Scaffold(
      appBar: AppBar(title: const Text('Register')),
      body: AuthForm(
        onSubmit: (email, password) async {
          try {
            final user = await authService.register(email, password);
            Provider.of<AppProvider>(context, listen: false).setUser(user);
            // ignore: use_build_context_synchronously
            context.go('/');
          } catch (e) {
            // Handle error
          }
        },
      ),
    );
  }
}