import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:toast/toast.dart';
import './services/cart.dart';
import './services/products.dart';
import 'package:flutter_svg/flutter_svg.dart';

class Cart extends StatefulWidget {
  @override
  _CartState createState() => _CartState();
}

class _CartState extends State<Cart> {
  double total = 0;

  @override
  void initState() {
    super.initState();
    getCart();
  }

  @override
  Widget build(BuildContext context) {
    print('build ... ');
    return Scaffold(
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
            child: Column(children: [
          FutureBuilder(
              future: getCart(),
              builder: (context, AsyncSnapshot snapshot) {
                if (snapshot.hasData) {
                  return Column(
                      children: snapshot.data['products'].map<Widget>((i) {
                    return Card(
                        child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                          Image.asset(
                              "../web/eshop-frontend/src/assets/uploads/${i['img']}",
                              width: 80),
                          Container(child: Text("${i['product']}"), width: 120),
                          Text('Quantite : ${i['qte']}'),
                          Text(' ${i['price']} DT'),
                          IconButton(
                              onPressed: () {
                                setState(() {
                                  deleteCartItem(i['id'], snapshot.data['id']);

                                  print(total);
                                });
                              },
                              icon: Icon(Icons.delete))
                        ]));
                  }).toList());
                } else {
                  return Container();
                }
              }),
          FutureBuilder(
              future: getCart(),
              builder: (context, AsyncSnapshot snapshot) {
                total = 0;

                // print(snapshot.data['products']);
                if (snapshot.hasData) {
                  for (var prod in snapshot.data['products']) {
                    total += prod['price'];
                  }
                  if (total > 0) {
                    return Container(
                      width: MediaQuery.of(context).size.width,
                      padding: EdgeInsets.all(8.0),
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text('$total DT',
                                style: TextStyle(fontWeight: FontWeight.bold)),
                            ElevatedButton.icon(
                                onPressed: () async {
                                  var buyResult = await buy(total);
                                  if (buyResult['buy'] == "OK") {
                                    Toast.show("Produit acheter", context,
                                        duration: Toast.LENGTH_SHORT,
                                        gravity: Toast.BOTTOM);
                                    var prods = await getCart();
                                    for (var prod in prods['products']) {
                                      updateProdSales(prod['id'], prod['qte']);
                                    }
                                    setState(() {
                                      deleteCart();
                                    });
                                  } else {
                                    Toast.show("Solde insuffisant", context,
                                        duration: Toast.LENGTH_SHORT,
                                        gravity: Toast.BOTTOM);
                                  }
                                },
                                label: Text('Acheter'),
                                icon: Icon(Icons.add_shopping_cart_outlined),
                                style: ButtonStyle(
                                    backgroundColor:
                                        MaterialStateProperty.all(Colors.green),
                                    foregroundColor: MaterialStateProperty.all(
                                        Colors.black)))
                          ]),
                    );
                  }
                  return Container();
                } else {
                  return Container(
                      height: (MediaQuery.of(context).size.height) / 2,
                      child: Center(
                          child: Opacity(
                              opacity: 0.1,
                              child: SvgPicture.asset('assets/empty.svg',
                                  width: 200))));
                }
              }),
        ])));
  }
}
