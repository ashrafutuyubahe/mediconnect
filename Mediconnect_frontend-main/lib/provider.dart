import 'package:flutter/foundation.dart';

class ChangeNotifierProvider<T extends ChangeNotifier> extends InheritedWidget {
  final T value;

  ChangeNotifierProvider({
    Key? key,
    required this.value,
    required Widget child,
  }) : super(key: key, child: child);

  static T of<T extends ChangeNotifier>(BuildContext context) {
    final provider = context.dependOnInheritedWidgetOfExactType<ChangeNotifierProvider<T>>();
    if (provider == null) {
      throw Exception('No ChangeNotifierProvider found in the context');
    }
    return provider.value;
  }

  @override
  bool updateShouldNotify(ChangeNotifierProvider<T> old) {
    return value != old.value;
  }
}