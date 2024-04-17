import 'package:flutter/foundation.dart';
import '../models/user.dart';

class AppProvider with ChangeNotifier {
  User? _user;

  User? get user => _user;

  void setUser(User user) {
    _user = user;
    notifyListeners();
  }
}