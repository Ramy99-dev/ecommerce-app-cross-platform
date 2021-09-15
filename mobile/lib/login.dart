
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:toast/toast.dart';
import 'services/user.dart';
import 'package:google_fonts/google_fonts.dart';


class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}




class _LoginState extends State<Login> {
  Icon iconPassword = Icon(Icons.visibility);
  TextEditingController emailController = new TextEditingController();
  TextEditingController passwordController = new TextEditingController();
  bool obscure = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(

        backgroundColor: Colors.orange,
        appBar:AppBar(
          iconTheme: IconThemeData(color: Colors.black),
          title: Text(
            'EShop',
            style: GoogleFonts.poppins(
                textStyle:
                TextStyle(color: Colors.black, fontWeight: FontWeight.w600)),
          ),
          centerTitle: true,
          backgroundColor: Colors.orange,
        ),
        body: SingleChildScrollView(
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(margin:EdgeInsets.fromLTRB(0, 10, 0, 0),width: 200, child: Image.asset("assets/login-img.png")),
                Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: TextField(
                    controller: emailController,
                    decoration: InputDecoration(
                      prefixIcon: Icon(
                        Icons.alternate_email,
                        color: Colors.black,
                      ),
                      focusedBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Colors.black, width: 2.0)),
                      enabledBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Colors.black, width: 2.0)),
                    ),
                    keyboardType: TextInputType.emailAddress,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: TextField(
                    controller: passwordController,
                    obscureText: obscure,
                    decoration: InputDecoration(
                      suffixIcon: IconButton(
                        color:Colors.black,
                        icon: iconPassword,
                        onPressed: () {
                          setState(() {
                            if(obscure == true)
                              {
                                iconPassword = Icon(Icons.visibility_off);
                                obscure=false;
                              }
                            else{
                              iconPassword = Icon(Icons.visibility);
                              obscure=true;
                            }

                          });
                        },
                      ),
                      prefixIcon: Icon(
                        Icons.vpn_key,
                        color: Colors.black,
                      ),
                      focusedBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Colors.black, width: 2.0)),
                      enabledBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Colors.black, width: 2.0)),
                    ),
                    keyboardType: TextInputType.visiblePassword,
                  ),
                ),
                ElevatedButton(
                  onPressed: () async {
                    var  data  = await login(emailController.text , passwordController.text);
                    if( await data['connected']==true){
                      Navigator.pushReplacementNamed(context, '/');
                    }
                    else{

                      Toast.show(data['msg'], context, duration: Toast.LENGTH_SHORT, gravity:  Toast.BOTTOM);
                    }
                  },
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(Colors.orange),
                    elevation: MaterialStateProperty.all(4.00),
                      foregroundColor:MaterialStateProperty.all(Colors.black)

                  ),
                  child: Text("Connecter"),
                ),
                Container(
                  margin:EdgeInsets.only(top:30),
                  child: GestureDetector(
                      child: Text("Creer un compte", style: TextStyle(decoration: TextDecoration.underline, color: Colors.blue)),
                      onTap: () {
                        Navigator.pushNamed(context, '/register');
                      }
                  ),
                )
              ],
            ),
          ),
        ));
  }
}
