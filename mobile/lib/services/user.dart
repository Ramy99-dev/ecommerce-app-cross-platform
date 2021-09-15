import 'dart:io';

import 'package:http/http.dart';
import 'dart:convert';
import 'token.dart';



Future addUser(Map user) async{
  Response response = await post(Uri.parse("http://10.0.2.2:4080/add-user"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: jsonEncode(user));
  print(response.body);
  return jsonDecode(response.body);
}

Future login(String email , String password) async {
  Response response = await post(Uri.parse("http://10.0.2.2:4080/login"),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: jsonEncode(<String, String>{
        'email':email,
        'password':password
      }));
  var data = json.decode(response.body);
  try {
    Token.addToken('jwt',data['token']);
  }
  catch (e, s) {
    print("$e ... $s.");
  }

  return (data);
}

Future getUserById()async{
  print('test.... ');
  Response response = await get(Uri.parse('http://10.0.2.2:4080/user-by-id'), headers: {
      HttpHeaders.authorizationHeader: 'Bearer'+' '+ await Token.getToken('jwt'),
    },
  );

  var data = jsonDecode(response.body);
  print(data['user']);
  return data['user'];
}
