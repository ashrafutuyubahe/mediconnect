// profile_screen.dart
import 'package:flutter/material.dart';
import '../widgets/user_profile.dart';
import '../providers/app_provider.dart';
import 'package:provider/provider.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<AppProvider>(context).user;

    return Scaffold(
      appBar: AppBar(title: const Text('Profile')),
      body: UserProfile(user: user),
    );
  }
}