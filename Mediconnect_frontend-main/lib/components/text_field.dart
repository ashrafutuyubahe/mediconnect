import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final String label;
  final bool obscureText;
  final String? Function(String?) validator;
  final void Function(String) onChanged;

  const CustomTextField({
    Key? key,
    required this.label,
    this.obscureText = false,
    required this.validator,
    required this.onChanged,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      decoration: InputDecoration(
        labelText: label,
        border: OutlineInputBorder(),
      ),
      obscureText: obscureText,
      validator: validator,
      onChanged: onChanged,
    );
  }
}