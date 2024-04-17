// import 'package:flutter/material.dart';
// import 'package:go_router/go_router.dart';
// import 'package:provider/provider.dart';
// import 'screens/screens.dart';
// import 'providers/app_provider.dart';

// final GoRouter _router = GoRouter(
//   routes: <GoRoute>[
//     GoRoute(path: '/', builder: (BuildContext context) => const HomeScreen()),
//     GoRoute(path: '/sign-in', builder: (BuildContext context) => const SignInScreen()),
//     GoRoute(path: '/register', builder: (BuildContext context) => const RegisterScreen()),
//     GoRoute(path: '/profile', builder: (BuildContext context) => const ProfileScreen()),
//     GoRoute(path: '/medical', builder: (BuildContext context) => const MedicalScreen()),
//   ],
// );

// void main() {
//   runApp(MyApp());
// }

// class MyApp extends StatelessWidget {
//   @override
//   Widget build(BuildContext context) {
//     return MultiProvider(
//       providers: [
//         ChangeNotifierProvider(create: (_) => AppProvider()),
//       ],
//       child: MaterialApp.router(
//         routerConfig: _router,
//       ),
//     );
//   }
// }

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'go_router.dart';
import 'screens/screens.dart';
import 'providers/app_provider.dart';

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
        title: 'Mediconnect',
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