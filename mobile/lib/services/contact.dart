import 'dart:convert';
import 'package:toast/toast.dart';
import 'package:http/http.dart';

Future addContact(String email, String subject, String content) async {
  Response response = await post(Uri.parse('http://10.0.2.2:4080/add-contact'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: jsonEncode(<String, dynamic>{
        'subject': subject,
        'email': email,
        'msg': content
      }));
  return response.body;
}
