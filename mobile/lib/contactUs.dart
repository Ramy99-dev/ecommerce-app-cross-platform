import 'package:flutter/material.dart';
import 'services/contact.dart';
import 'package:toast/toast.dart';
import 'nav.dart';

class ContactUs extends StatelessWidget {
  TextEditingController subjectCntrl = new TextEditingController();
  TextEditingController emailCntrl = new TextEditingController();
  TextEditingController contentCntrl = new TextEditingController();
  final _formKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: Nav(),
        body: SingleChildScrollView(
          child: Form(
            key:_formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.all(10.0),
                  child: TextFormField(


                    controller: subjectCntrl,
                    decoration: InputDecoration(

                      hintText: 'Sujet',
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
                  padding: const EdgeInsets.all(10.0),
                  child: TextFormField(
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Champ Obligatoire';
                      }

                      return null;
                    },
                    controller: emailCntrl,
                    decoration: InputDecoration(
                      errorStyle: TextStyle(color:Colors.black),
                      errorBorder:OutlineInputBorder(
                          borderSide: const BorderSide(
                              color: Colors.black, width: 2.0)) ,
                      focusedErrorBorder:OutlineInputBorder(
                          borderSide: const BorderSide(
                              color: Colors.black, width: 2.0)),
                      hintText: 'Email',
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

                  padding: const EdgeInsets.all(10.0),
                  child: TextFormField(
                    maxLength:755 ,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Champ Obligatoire';
                      }

                      return null;
                    },
                    controller: contentCntrl,
                    maxLines: 8,
                    decoration: InputDecoration(
                      errorStyle: TextStyle(color:Colors.black),
                      errorBorder:OutlineInputBorder(
                          borderSide: const BorderSide(
                              color: Colors.black, width: 2.0)) ,
                      focusedErrorBorder:OutlineInputBorder(
                          borderSide: const BorderSide(
                              color: Colors.black, width: 2.0)),
                      focusedBorder: OutlineInputBorder(

                          borderSide:
                              const BorderSide(color: Colors.black, width: 2.0)),
                      enabledBorder: OutlineInputBorder(
                          borderSide:
                              const BorderSide(color: Colors.black, width: 2.0)),
                    ),
                    keyboardType: TextInputType.text,
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ElevatedButton(
                        onPressed: () async{
                          if (!(_formKey.currentState.validate())) {
                            // If the form is valid, display a snackbar. In the real world,
                            // you'd often call a server or save the information in a database.
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(content: Text('veuillez remplir  les champs ')),
                            );
                          }
                          else{
                            print(emailCntrl.text);
                            print( subjectCntrl.text);
                            print( contentCntrl.text);
                            if( await addContact(emailCntrl.text , subjectCntrl.text , contentCntrl.text )=="OK"){
                              Toast.show("Message envoyer", context, duration: Toast.LENGTH_SHORT, gravity:  Toast.BOTTOM);

                            }
                          }

                        },
                        style: ButtonStyle(
                            backgroundColor:
                                MaterialStateProperty.all(Colors.green),
                            foregroundColor:
                                MaterialStateProperty.all(Colors.black)),
                        child:
                            Text("Envoyer", style: TextStyle(color: Colors.black)))
                  ],
                )
              ],
            ),
          ),
        ));
  }
}
