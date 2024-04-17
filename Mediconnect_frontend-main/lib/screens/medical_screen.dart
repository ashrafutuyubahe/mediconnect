// medical_screen.dart
import 'package:flutter/material.dart';
import '../widgets/medical_info.dart';
import '../providers/app_provider.dart';
import '../services/medical_service.dart';
import 'package:provider/provider.dart';

class MedicalScreen extends StatefulWidget {
  const MedicalScreen({Key? key}) : super(key: key);

  @override
  _MedicalScreenState createState() => _MedicalScreenState();
}

class _MedicalScreenState extends State<MedicalScreen> {
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
      appBar: AppBar(title: const Text('Medical')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: _medicalInfo != null ? MedicalInfo(medicalInfo: _medicalInfo!) : const CircularProgressIndicator(),
      ),
    );
  }
}