import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../ViewModels/login_view_model.dart';
import '../models/login_model.dart';

class LoginScreen extends StatelessWidget {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => LoginViewModel(),
      child: Scaffold(
        appBar: AppBar(
          title: Text('Login'),
        ),
        body: Consumer<LoginViewModel>(
          builder: (context, viewModel, child) {
            return Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  TextField(
                    controller: emailController,
                    decoration: InputDecoration(labelText: 'Phone or Email'),
                  ),
                  TextField(
                    controller: passwordController,
                    decoration: InputDecoration(labelText: 'Password'),
                    obscureText: true,
                  ),
                  SizedBox(height: 20),
                  viewModel.isLoading
                      ? CircularProgressIndicator()
                      : ElevatedButton(
                    onPressed: () {
                      final loginRequest = LoginRequest(
                        phoneNumberOrEmail: emailController.text,
                        password: passwordController.text,
                      );
                      viewModel.login(loginRequest);
                    },
                    child: Text('Login'),
                  ),
                  if (viewModel.errorMessage != null)
                    Padding(
                      padding: const EdgeInsets.only(top: 10),
                      child: Text(
                        viewModel.errorMessage!,
                        style: TextStyle(color: Colors.red),
                      ),
                    ),
                  if (!viewModel.isLoading && viewModel.errorMessage == null)
                    Padding(
                      padding: const EdgeInsets.only(top: 10),
                      child: Text(
                        'Login successful!',
                        style: TextStyle(color: Colors.green),
                      ),
                    ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
