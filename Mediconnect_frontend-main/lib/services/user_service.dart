import 'dart:convert';
import 'package:http/http.dart' as http;
import '../providers/user.dart';

class UserService {
  final _baseUrl = 'http://your-backend-url.com/api/users';

  Future<User> getUserById(String userId) async {
    final response = await http.get(
      Uri.parse('$_baseUrl/$userId'),
    );

    if (response.statusCode == 200) {
      final userData = jsonDecode(response.body);
      return User.fromJson(userData);
    } else {
      throw Exception('Failed to fetch user');
    }
  }
}