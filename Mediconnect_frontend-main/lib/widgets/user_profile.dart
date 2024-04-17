import 'package:flutter/material.dart';
import '../models/user.dart';

class UserProfile extends StatelessWidget {
  final User? user;

  const UserProfile({
    Key? key,
    required this.user,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Name: ${user?.name ?? 'Unknown'}'),
          SizedBox(height: 8.0),
          Text('Email: ${user?.email ?? 'Unknown'}'),
          SizedBox(height: 8.0),
          Text('Role: ${user?.role ?? 'Unknown'}'),
        ],
      ),
    );
  }
}