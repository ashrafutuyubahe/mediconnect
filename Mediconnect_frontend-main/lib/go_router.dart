import 'package:flutter/material.dart';

class GoRouter {
  final List<GoRoute> routes;

  GoRouter({
    required this.routes,
  });

  void push(BuildContext context, String path) {
    context.go(path);
  }
}

class GoRoute {
  final String path;
  final Widget Function(BuildContext) builder;

  GoRoute({
    required this.path,
    required this.builder,
  });
}