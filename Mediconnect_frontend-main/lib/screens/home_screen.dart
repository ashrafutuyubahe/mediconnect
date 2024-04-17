// home_screen.dart
import 'package:flutter/material.dart';
import '../providers/app_provider.dart';
import '../services/medical_service.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String? _medicalInfo;

  @override
  void initState() {
    super.initState();
    _fetchMedicalInfo();
  }

  Future<void> _fetchMedicalInfo() async {
    final medicalService = MedicalService();
    final user = Provider.of<AppProvider>(context, listen: false).user;
    final medicalInfo = await medicalService.getMedicalInfo(user?.id);
    setState(() {
      _medicalInfo = medicalInfo;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Welcome back!'),
            SizedBox(height: 16.0),
            if (_medicalInfo != null)
              Text('Your medical information: $_medicalInfo'),
          ],
        ),
      ),
    );
  }
}