import 'package:flutter/material.dart';
import './services/user.dart';
import 'nav.dart';
import 'sideBar.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';

class Profile extends StatefulWidget {
  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0xFF212121),
        appBar: Nav(),
        drawer: SideBar(),
        body: Padding(
          padding: const EdgeInsets.all(20.0),
          child: SingleChildScrollView(
              child:
              FutureBuilder(
                  future: getUserById(),
                  builder: (context, AsyncSnapshot snapshot) {
                    if (snapshot.hasData) {
                      snapshot.data['birthday']=DateFormat('yyyy-MM-dd' ).format(DateTime.tryParse(snapshot.data['birthday']));
                      if(snapshot.data['gender']=="M")
                        {
                          snapshot.data['gender']="Masculin";
                        }
                      else{
                        snapshot.data['gender']="Feminin";
                      }
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Nom complet', style: GoogleFonts.poppins(
                              textStyle: TextStyle(
                                  color: Colors.white
                              )
                          )),
                          Text('${snapshot.data['firstName']} ${snapshot.data['lastName']}', style: GoogleFonts.poppins(
                              textStyle: TextStyle(
                                  color: Colors.amber,
                                  fontSize: 23,
                                  fontWeight: FontWeight.bold

                              )
                          )),
                          Text('Email', style: GoogleFonts.poppins(
                              textStyle: TextStyle(
                                  color: Colors.white
                              )
                          )),
                          Text('${snapshot.data['email']}',
                              style: GoogleFonts.poppins(
                                  textStyle: TextStyle(
                                      color: Colors.amber,
                                      fontSize: 23,
                                      fontWeight: FontWeight.bold

                                  )
                              )),
                          Text('Lieu', style: GoogleFonts.poppins(
                              textStyle: TextStyle(
                                  color: Colors.white
                              )
                          )),
                          Text('${snapshot.data['place']}', style: GoogleFonts.poppins(
                              textStyle: TextStyle(
                                  color: Colors.amber,
                                  fontSize: 23,
                                  fontWeight: FontWeight.bold

                              )
                          )),
                          Text('Date de naissance', style: GoogleFonts.poppins(
                              textStyle: TextStyle(
                                  color: Colors.white
                              )
                          )),
                          Text('${snapshot.data['birthday']}', style: GoogleFonts.poppins(
                              textStyle: TextStyle(
                                  color: Colors.amber,
                                  fontSize: 23,
                                  fontWeight: FontWeight.bold

                              )
                          )),
                          Text('Sexe', style: GoogleFonts.poppins(
                              textStyle: TextStyle(
                                  color: Colors.white
                              )
                          )),
                          Text('${snapshot.data['gender']}', style: GoogleFonts.poppins(
                              textStyle: TextStyle(
                                  color: Colors.amber,
                                  fontSize: 23,
                                  fontWeight: FontWeight.bold

                              )
                          )),
                          Text('Credit', style: GoogleFonts.poppins(
                              textStyle: TextStyle(
                                  color: Colors.white
                              )
                          )),
                          Text('${snapshot.data['credit']} DT', style: GoogleFonts.poppins(
                              textStyle: TextStyle(
                                  color: Colors.amber,
                                  fontSize: 23,
                                  fontWeight: FontWeight.bold

                              )
                          )),
                        ],
                      );
                    }
                    else {
                      return Center(child: CircularProgressIndicator());
                    }
                  }
              )

          ),
        )
    );
  }
}
