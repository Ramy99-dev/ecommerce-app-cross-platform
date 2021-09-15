import 'dart:io';
import 'dart:math';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'package:eshop_app/services/token.dart';
import 'package:http/http.dart';
import 'dart:convert';

Future<List> getProducts() async
{
  Response response = await get(Uri.parse('http://10.0.2.2:4080/all-prod'));
  return jsonDecode(response.body);

}
Future<List> getRandomProducts() async{
  var rng = new Random();
  Response response = await get(Uri.parse('http://10.0.2.2:4080/all-prod'));
  List list = jsonDecode(response.body);
  Set s ={};
  while(s.length<3)
    {

      s.add(jsonEncode(list[rng.nextInt(list.length)]));
    }
    List products = [];
  for(var item in s)
    {
      products.add(jsonDecode(item));
    }
  return products;

}

Future getProduct(String id) async
{

  Response response = await get(Uri.parse('http://10.0.2.2:4080/prod-by-id/${id}'));

  return jsonDecode(response.body);

}

Future<List> getProductsByCategId(String id) async
{

     if(id!='all')
       {
         EasyLoading.show(status: 'Chargement...');
         Response response = await get(Uri.parse('http://10.0.2.2:4080/prod-by-categ-id/${id}'));

         if(response.statusCode==200)
           {
             EasyLoading.dismiss();
           }
         return jsonDecode(response.body);
       }
      else{
        return getProducts();
     }



}

Future<List> getBestProduct()async{
  Response response = await get(Uri.parse('http://10.0.2.2:4080/best-prod'));
  return jsonDecode(response.body);
}

updateProdSales(String  id , int qte ) async{
  Response response = await put(Uri.parse('http://10.0.2.2:4080/product-sales'), headers: {
    HttpHeaders.authorizationHeader: 'Bearer'+' '+ await Token.getToken('jwt'),
    'Content-Type': 'application/json; charset=UTF-8',
  },
      body:jsonEncode(<String,dynamic>{
        'id':id,
        'qte':qte
      }));
}

