import 'dart:io';
import 'package:flutter_easyloading/flutter_easyloading.dart';

import 'package:http/http.dart';
import 'dart:convert';
import 'token.dart';

Future addCart(Map product)async{
  Response response = await post(Uri.parse('http://10.0.2.2:4080/add-cart-user'), headers: {
    HttpHeaders.authorizationHeader: 'Bearer'+' '+ await Token.getToken('jwt'),
    'Content-Type': 'application/json; charset=UTF-8',
  },
      body: jsonEncode(product)
  );
 return jsonDecode(response.body);
}


Future<Map> getCart() async{
  Response response = await get(Uri.parse('http://10.0.2.2:4080/cart-user'), headers: {
    HttpHeaders.authorizationHeader: 'Bearer'+' '+ await Token.getToken('jwt'),
  });

  Map<String,dynamic> data = jsonDecode(response.body);
  //print(data['result']);
  var cart = {
    'products' : ((data['result'])[0])['products'],
    'id' : ((data['result'])[0])['_id']
  };

  return cart;
}

Future deleteCartItem(String prodId , String cartId) async
{
  EasyLoading.show(status: 'Chargement...');
  Response response = await delete(Uri.parse('http://10.0.2.2:4080/cart-item'), headers: {
    HttpHeaders.authorizationHeader: 'Bearer'+' '+ await Token.getToken('jwt'),
    'Content-Type': 'application/json; charset=UTF-8',
  },
  body:jsonEncode(<String,String>{
    'prodId':prodId,
    'cartId':cartId
  }));

  if(response.statusCode==200)
    {
      EasyLoading.showSuccess('Supprimer');
      EasyLoading.dismiss();
    }

  //print(response.body);
}

Future buy(double total) async{

  Response response = await post(Uri.parse('http://10.0.2.2:4080/buy'), headers: {
    HttpHeaders.authorizationHeader: 'Bearer'+' '+ await Token.getToken('jwt'),
    'Content-Type': 'application/json; charset=UTF-8',
  },
      body:jsonEncode(<String,double>{
        'total':total,

      }));
  print(response.body);
  return jsonDecode(response.body);
}

deleteCart ()async{
  EasyLoading.show(status: 'loading...');
  Response response = await delete(Uri.parse('http://10.0.2.2:4080/cart'), headers: {
  HttpHeaders.authorizationHeader: 'Bearer'+' '+ await Token.getToken('jwt'),

  });


  if(response.statusCode == 200)
    {
      EasyLoading.showSuccess('');
      EasyLoading.dismiss();


    }
}