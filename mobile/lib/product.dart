import 'dart:convert';

import 'package:flutter/material.dart';
import 'nav.dart';
import 'sideBar.dart';
import './services/products.dart';
import './services/category.dart';


class Product extends StatefulWidget {
  @override
  _ProductState createState() => _ProductState();
}

class _ProductState extends State<Product> {

  Future<List> product;

 /*void getToken()async{
    var token = await EshopApp.storage.read(key:'jwt');

    print(token);
  }*/

  @override
  void initState() {
    super.initState();
    //getToken();
    product = getProducts();
  }

  String dropdownValue = "Tous les produits_all";

  var selectedRange;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: Nav(),
      drawer: SideBar(),
      body: Column(
        children: [
          Container(
            height: 150,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                FutureBuilder<List>(
                    future: getCategory(),
                    builder: (context, AsyncSnapshot snapshot) {
                      if (snapshot.hasData) {
                        return DropdownButton<String>(
                          value: dropdownValue,
                          icon: const Icon(Icons.arrow_downward),
                          iconSize: 24,
                          elevation: 16,
                          style: const TextStyle(color: Colors.deepPurple),
                          underline: Container(
                            height: 2,
                            color: Colors.black,
                          ),
                          onChanged: (dynamic newValue) {
                            setState(() {
                              String id = newValue.split("_")[1];
                              setState(() {
                                product = getProductsByCategId(id);
                              });

                              dropdownValue = newValue;
                            });
                          },
                          items: snapshot.data
                              .map<DropdownMenuItem<String>>((dynamic val) {
                            return DropdownMenuItem<String>(
                              value: "${val['name']}_${val['_id']}",
                              child: Text(val['name']),
                            );
                          }).toList(),
                        );
                      } else {
                        return Container();
                      }
                    })
              ],
            ),
          ),
          Expanded(
              child: FutureBuilder<List>(
                  future: product,
                  builder: (context, AsyncSnapshot snapshot) {
                    if (snapshot.hasData) {
                      return GridView.builder(
                          gridDelegate:
                              SliverGridDelegateWithMaxCrossAxisExtent(
                                  maxCrossAxisExtent: 200,
                                  childAspectRatio: 3 / 2,
                                  crossAxisSpacing: 20,
                                  mainAxisSpacing: 20),
                          itemCount: snapshot.data.length,
                          itemBuilder: (context, index) {
                            return InkWell(
                                onTap: () {
                                  Navigator.pushNamed(
                                      context, '/single-product',
                                      arguments: snapshot.data[index]['_id']);
                                },
                                child: Image.asset(
                                    "stage/eshop-frontend/src/assets/uploads/${snapshot.data[index]['product_img']}"));
                          });
                    } else {

                      return Center(child: CircularProgressIndicator());
                    }
                  })),
        ],
      ),
    );
  }
}
