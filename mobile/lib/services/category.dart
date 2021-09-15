import 'package:http/http.dart';
import 'dart:convert';


Future<List> getCategory() async
{
  List categories = [];
  Response response = await get(Uri.parse('http://10.0.2.2:4080/all-prod'));
  List data = jsonDecode(response.body);
  Set set = {};
  set.add(jsonEncode({'_id':'all','name':'Tous les produits'}));
  for( var item in data)
    {
      set.add(jsonEncode(item['category'][0]));
    }



  for(var item in set)
    {
        categories.add(jsonDecode(item));



    }


  return categories;
}