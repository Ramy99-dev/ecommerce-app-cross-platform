import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'services/user.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';


class Register extends StatefulWidget {
  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  String errorMsg ='';
  dynamic birthday ;
  String gender = "Homme";
  String accGender="H";
  final _formKey = GlobalKey<FormState>();
  Icon iconPassword = Icon(Icons.visibility);
  TextEditingController firstNameController = new TextEditingController();
  TextEditingController lastNameController = new TextEditingController();
  TextEditingController emailController = new TextEditingController();
  TextEditingController passwordController = new TextEditingController();
  TextEditingController placeController = new TextEditingController();
  TextEditingController birthController = new TextEditingController();
  bool obscure = true;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.orange,
        appBar: AppBar(
          iconTheme: IconThemeData(color: Colors.black),
          title: Text(
            'EShop',
            style: GoogleFonts.poppins(
                textStyle: TextStyle(
                    color: Colors.black, fontWeight: FontWeight.w600)),
          ),
          centerTitle: true,
          backgroundColor: Colors.orange,
        ),
        body: SingleChildScrollView(
          child: Center(
            child: Form(
              key:_formKey,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Padding(
                    padding:  EdgeInsets.only(left:20.0,right:20.0,top:40.0,bottom: 20.0),
                    child:Text('${errorMsg}')
                  ),
                  Padding(
                    padding:  EdgeInsets.only(left:20.0,right:20.0,top:5.0),
                    child: TextFormField(
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Champ Obligatoire';
                        }
                        if(!RegExp('[a-zA-Z]').hasMatch(value)){
                          return 'Nom Invalid';
                        }
                        return null;
                      },
                      controller: firstNameController,
                      decoration: InputDecoration(
                        errorStyle: TextStyle(color:Colors.black),
                        errorBorder:OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)) ,
                        focusedErrorBorder:OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)),

                        labelText:"Nom",
                        focusedBorder: OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)),
                        enabledBorder: OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)),
                      ),
                      keyboardType: TextInputType.text,
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(left:20.0,right:20.0,top:5.0),
                    child: TextFormField(
                      controller: lastNameController,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Champ Obligatoire';
                        }
                        if(!RegExp('[a-zA-Z]').hasMatch(value)){
                          return 'Prénom Invalid';
                        }
                        return null;
                      },
                      decoration: InputDecoration(
                          errorStyle: TextStyle(color:Colors.black),
                        errorBorder:OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)) ,
                        focusedErrorBorder:OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)),
                          labelText:"Prénom",
                        focusedBorder: OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)),
                        enabledBorder: OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)),
                      ),
                      keyboardType: TextInputType.text,
                    ),
                  ),
                  Padding(
                    padding:EdgeInsets.only(left:20.0,right:20.0,top:5.0),
                    child: TextFormField(
                      validator: (value) {
                        if (value == null || value.isEmpty ) {
                          return 'Champ Obligatoire';
                        }
                        if(!RegExp(r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$').hasMatch(value)){
                          return 'Email Invalid';
                        }
                        return null;
                      },
                      controller: emailController,
                      decoration: InputDecoration(
                        errorStyle: TextStyle(color:Colors.black),
                        labelText:"Email",
                        prefixIcon: Icon(
                          Icons.alternate_email,
                          color: Colors.black,
                        ),
                        errorBorder:OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)) ,
                        focusedErrorBorder:OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)),
                        focusedBorder: OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)),
                        enabledBorder: OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)),
                      ),
                      keyboardType: TextInputType.emailAddress,
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(left:20.0,right:20.0,top:5.0),
                    child: TextFormField(

                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Champ Obligatoire';
                        }
                        return null;
                      },
                      controller: passwordController,
                      obscureText: obscure,
                      decoration: InputDecoration(
                        errorStyle: TextStyle(color:Colors.black),
                        errorBorder:OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)) ,
                        focusedErrorBorder:OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)),
                        labelText:"Mot de passe",
                        suffixIcon: IconButton(
                          color: Colors.black,
                          icon: iconPassword,
                          onPressed: () {
                            setState(() {
                              if (obscure == true) {
                                iconPassword = Icon(Icons.visibility_off);
                                obscure = false;
                              } else {
                                iconPassword = Icon(Icons.visibility);
                                obscure = true;
                              }
                            });
                          },
                        ),
                        prefixIcon: Icon(
                          Icons.vpn_key,
                          color: Colors.black,
                        ),
                        focusedBorder: OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)),
                        enabledBorder: OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)),
                      ),
                      keyboardType: TextInputType.visiblePassword,
                    ),
                  ),
                  Padding(
                    padding: EdgeInsets.only(left:20.0,right:20.0,top:5.0),
                    child: TextFormField(
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Champ Obligatoire';
                        }
                        return null;
                      },
                      controller: placeController,
                      decoration: InputDecoration(
                        errorStyle: TextStyle(color:Colors.black),
                        errorBorder:OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)) ,
                        focusedErrorBorder:OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)),
                        labelText:"Lieu",
                        focusedBorder: OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)),
                        enabledBorder: OutlineInputBorder(
                            borderSide: const BorderSide(
                                color: Colors.black, width: 2.0)),
                      ),
                      keyboardType: TextInputType.text,
                    ),
                  ),
                  Container(
                    width: MediaQuery.of(context).size.width,
                    padding: EdgeInsets.only(left:20.0,right:20.0,top:5.0),
                    child: TextButton(
                      style:ButtonStyle(
                          foregroundColor:MaterialStateProperty.all(Colors.black)
                      ),
                        child: Text('Date de naissance'),
                        onPressed: () async {
                          await showDatePicker(
                              context: context,
                              initialDate: DateTime.now(),
                              firstDate: DateTime(DateTime.now().year - 15),
                              lastDate: DateTime(DateTime.now().year + 15)).then((pickedDate){
                                print(pickedDate);
                                String formattedDate = DateFormat('yyyy-MM-dd' ).format(pickedDate);
                                birthday = formattedDate;
                          });
                        }),
                  ),
                  DropdownButton<String>(
                    value: gender,
                    icon: const Icon(Icons.arrow_downward),
                    iconSize: 24,
                    elevation: 16,
                    style: const TextStyle(color: Colors.deepPurple),
                    underline: Container(
                      height: 2,
                      color: Colors.deepPurpleAccent,
                    ),
                    onChanged: (String newValue) {
                      setState(() {
                        accGender = newValue[0];

                        gender = newValue;
                      });
                    },
                    items: <String>['Homme', 'Femme']
                        .map<DropdownMenuItem<String>>((String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(value),
                      );
                    }).toList(),
                  ),
                  ElevatedButton(
                    onPressed: () async {
                      if (!(_formKey.currentState.validate())) {
                        // If the form is valid, display a snackbar. In the real world,
                        // you'd often call a server or save the information in a database.
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('veuillez remplir tous les champs ')),
                        );
                      }
                      else
                        {
                          var user = {
                            'firstname' : firstNameController.text,
                            'lastname' : lastNameController.text,
                            'email' : emailController.text,
                            'password' : passwordController.text,
                            'place' : placeController.text ,
                            'birthday' : birthday,
                            'gender' : accGender
                          };
                          if(user['birthday']==null)
                            {
                              user['birthday']= DateFormat('yyyy-MM-dd' ).format(DateTime.now());
                            }
                          print(user);
                          Map data = await  addUser(user);
                          if(!data['registred'])
                            {
                              setState(() {
                                errorMsg ="utilisateur déjà enregistré";
                              });

                            }
                        }

                    },
                    style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all(Colors.orange),
                        elevation: MaterialStateProperty.all(4.00),
                        foregroundColor: MaterialStateProperty.all(Colors.black)),
                    child: Text("Inscrire"),
                  )
                ],
              ),
            ),
          ),
        ));
  }
}
