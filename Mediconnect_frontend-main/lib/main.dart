import 'package:flutter/material.dart';
import 'package:mediconnect/screens/home_screen.dart';
import 'package:mediconnect/screens/medical_screen.dart';
import 'package:mediconnect/screens/profile_screen.dart';
import 'package:mediconnect/screens/register_screen.dart';
import 'package:provider/provider.dart';
import './go_router.dart';
import 'providers/app_provider.dart';
import './screens/login_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppProvider()),
      ],
      child: MaterialApp.router(
        title: 'Mediaconnect',
        routerConfig: GoRouter(
          routes: [
            GoRoute(
              path: '/',
              builder: (context) => const HomeScreen(),
            ),
            GoRoute(
              path: '/sign-in',
              builder: (context) => const SignInScreen(),
            ),
            GoRoute(
              path: '/register',
              builder: (context) => const RegisterScreen(),
            ),
            GoRoute(
              path: '/profile',
              builder: (context) => const ProfileScreen(),
            ),
            GoRoute(
              path: '/medical',
              builder: (context) => const MedicalScreen(),
            ),
          ],
        ),
      ),
    );
  }
}