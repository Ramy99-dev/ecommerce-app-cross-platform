import 'package:eshop_app/product.dart';
import 'package:flutter/material.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';


import 'login.dart';
import 'product.dart';
import 'profile.dart';
import 'home.dart';
import 'single-product.dart';
import 'cart.dart';
import 'contactUs.dart';
import 'register.dart';






void main() {
  runApp(EshopApp());
  configLoading();
}

class EshopApp extends StatelessWidget {


  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home:Home(),
      routes:{
        '/login':(context)=>Login(),
        '/products':(context)=>Product(),
        '/single-product':(context)=>SingleProduct(),
        '/profile':(context)=>Profile(),
        '/cart':(context)=>Cart(),
        '/contactUs':(context)=>ContactUs(),
        '/register':(context)=>Register()
      },
      debugShowCheckedModeBanner: false,
      builder: EasyLoading.init(),
    );
  }
}
void configLoading()
{

  EasyLoading.instance
    ..displayDuration = const Duration(milliseconds: 2000)
    ..indicatorType = EasyLoadingIndicatorType.fadingCircle
    ..loadingStyle = EasyLoadingStyle.dark
    ..indicatorSize = 45.0
    ..radius = 10.0
    ..progressColor = Colors.yellow
    ..backgroundColor = Colors.green
    ..indicatorColor = Colors.yellow
    ..textColor = Colors.yellow
    ..maskColor = Colors.blue.withOpacity(0.5)
    ..userInteractions = true;


}