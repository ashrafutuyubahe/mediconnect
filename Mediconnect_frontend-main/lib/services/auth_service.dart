import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/user.dart';

class AuthService {
  final _baseUrl = 'http://your-backend-url.com/api/auth';

  Future<User> signIn(String email, String password) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/sign-in'),
      body: jsonEncode({'email': email, 'password': password}),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      final userData = jsonDecode(response.body);
      return User.fromJson(userData);
    } else {
      throw Exception('Failed to sign in');
    }
  }

  Future<User> register(String email, String password) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/register'),
      body: jsonEncode({'email': email, 'password': password}),
      headers: {'Content-Type': 'application/json'},
    );

    if (response.statusCode == 200) {
      final userData = jsonDecode(response.body);
      return User.fromJson(userData);
    } else {
      throw Exception('Failed to register');
    }
  }
}