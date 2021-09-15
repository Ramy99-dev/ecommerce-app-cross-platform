import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import './services/token.dart';

class Nav extends StatefulWidget implements PreferredSizeWidget {
  @override
  Size get preferredSize => const Size.fromHeight(50.0);
  @override
  _NavState createState() => _NavState();
}

class _NavState extends State<Nav> {

  @override
  Widget build(BuildContext context) {
    return AppBar(
      iconTheme: IconThemeData(color: Colors.black),
      title: Text(
        'EShop',
        style: GoogleFonts.poppins(
            textStyle:
                TextStyle(color: Colors.black, fontWeight: FontWeight.w600)),
      ),
      centerTitle: true,
      backgroundColor: Colors.orange,
      actions: [
        FutureBuilder(
            future: Token.getToken('jwt'),
            builder: (context, AsyncSnapshot snapshot) {

              if (!(snapshot.hasData) ) {

                return Padding(
                  padding: const EdgeInsets.all(7.0),
                  child: IconButton(
                      icon: Icon(Icons.login),
                      onPressed: () async {
                        setState(() {
                          Token.connected = false;
                        });

                        Navigator.pushNamed(context, '/login');
                      },
                      color: Colors.black),
                );
              }
              else{
                return  Padding(
                  padding: const EdgeInsets.all(7.0),
                  child: Row(
                    children: [
                      IconButton(
                          icon: Icon(Icons.shopping_bag),
                          onPressed: () async {
                            Navigator.pushNamed(context, '/cart');
                          },
                          color: Colors.black
                      ),
                      IconButton(
                          icon: Icon(Icons.logout),
                          onPressed: () async {
                            setState(() {
                              Token.deleteToken('jwt');
                              Navigator.pushReplacementNamed(context,'/');
                            });


                          },
                          color: Colors.black
                      ),
                    ],
                  ),
                );
              }

            })
      ],
    );
  }


}
