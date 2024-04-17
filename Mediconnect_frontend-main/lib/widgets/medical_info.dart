import 'package:flutter/material.dart';

class MedicalInfo extends StatelessWidget {
  final String medicalInfo;

  const MedicalInfo({
    Key? key,
    required this.medicalInfo,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(medicalInfo);
  }
}