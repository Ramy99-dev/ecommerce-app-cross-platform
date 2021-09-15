import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import './services/token.dart';

class SideBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Container(
        color: Colors.orange,
        child: FutureBuilder(
          future:Token.getToken('jwt'),
          builder:(context , AsyncSnapshot snapshot)
            {
              if(snapshot.hasData)
                {
                  return ListView(
                    padding: EdgeInsets.only(top: 20.0),
                    children: [
                      ListTile(
                        title: Text("Acceuil",style: GoogleFonts.poppins()),
                        onTap: () {
                          Navigator.pushReplacementNamed(context, '/');
                        },
                      ),
                      ListTile(
                        title: Text("Profile",style: GoogleFonts.poppins()),
                        onTap: () {
                          Navigator.pushNamed(context, '/profile');
                        },
                      ),
                      ListTile(
                        title: Text("Produits",style: GoogleFonts.poppins()),
                        onTap: () {
                          Navigator.pushReplacementNamed(context, '/products');
                        },
                      ),
                      ListTile(
                        title: Text("Service",style: GoogleFonts.poppins()),
                        onTap: () {
                          Navigator.pop(context);
                        },
                      ),
                      ListTile(
                        title: Text("Nous contactez",style: GoogleFonts.poppins()),
                        onTap: () {
                          Navigator.pushNamed(context, '/contactUs');
                        },
                      ),

                    ],
                  );
                }
              else{
                return ListView(
                  padding: EdgeInsets.only(top: 20.0),
                  children: [
                    ListTile(
                      title: Text("Acceuil",style: GoogleFonts.poppins()),
                      onTap: () {
                        Navigator.pushReplacementNamed(context, '/');
                      },
                    ),
                    ListTile(
                      title: Text("Produits",style: GoogleFonts.poppins()),
                      onTap: () {
                        Navigator.pushReplacementNamed(context, '/products');
                      },
                    ),
                    ListTile(
                      title: Text("Service",style: GoogleFonts.poppins()),
                      onTap: () {
                        Navigator.pop(context);
                      },
                    ),
                    ListTile(
                      title: Text("Nous contactez",style: GoogleFonts.poppins()),
                      onTap: () {
                        Navigator.pushNamed(context, '/contactUs');
                      },
                    ),
                  ],
                );
              }
            }
        ),
      ),
    );
  }
}
