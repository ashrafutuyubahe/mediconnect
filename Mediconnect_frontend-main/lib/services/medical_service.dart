import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/medical_info.dart';

class MedicalService {
  final _baseUrl = 'http://your-backend-url.com/api/medical';

  Future<String> getMedicalInfo(String? userId) async {
    final response = await http.get(
      Uri.parse('$_baseUrl/$userId'),
    );

    if (response.statusCode == 200) {
      final medicalInfo = jsonDecode(response.body);
      return MedicalInfo.fromJson(medicalInfo).info;
    } else {
      throw Exception('Failed to fetch medical information');
    }
  }
}