import 'package:flutter/material.dart';
import 'nav.dart';
import './services/cart.dart';
import './services/products.dart';
import 'package:google_fonts/google_fonts.dart';
import './services/token.dart';
import 'package:toast/toast.dart';



class SingleProduct extends StatefulWidget {
  @override
  _SingleProductState createState() => _SingleProductState();
}

class _SingleProductState extends State<SingleProduct> {
  String data;
  int qte = 1;
  double price;
  Map product = {};
  double currentQte =1.0;

  @override
  Widget build(BuildContext context) {
    data = ModalRoute.of(context).settings.arguments;

    return Scaffold(
        appBar: Nav(),
        body: FutureBuilder(
            future: getProduct(data),
            builder: (context, AsyncSnapshot snapshot) {

              if (snapshot.hasData) {
                product = {'id':snapshot.data['_id'],'product':snapshot.data['name'],'img':snapshot.data['product_img'],'price':snapshot.data['price'],'qte':1};
                return ListView(children: [
                  Container(
                    margin: EdgeInsets.only(top: 10),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Image.asset(
                          'stage/eshop-frontend/src/assets/uploads/${snapshot.data['product_img']}',
                          width: 400,
                        ),
                      ],
                    ),
                  ),
                  Text(
                    '${snapshot.data['name']}',
                    textAlign: TextAlign.center,
                    style:GoogleFonts.poppins(
                      textStyle:TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 15
                    ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(20.0),
                    child: Text(
                      '${snapshot.data['description']}',
                      style:GoogleFonts.poppins(textStyle:TextStyle(fontSize: 12)) ,
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Slider(
                        value: currentQte,
                        label: currentQte.round().toString(),
                        divisions: (snapshot.data['qte']),
                        onChanged: (double newQte) {
                          setState(() {

                            currentQte = newQte;
                            qte=newQte.round();
                            print(snapshot.data['price']);
                            price = (snapshot.data['price'].toDouble())*qte;

                          });
                        },
                        min: 1.0,
                        max: (snapshot.data['qte']).toDouble(),
                      )
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        '${snapshot.data['price']} DT',
                        textAlign: TextAlign.center,
                        style:GoogleFonts.poppins(textStyle:TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 15,)
                        ),
                      ),
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      FutureBuilder(
                        future:Token.getToken("jwt"),
                        builder:(context , AsyncSnapshot snapshot)
                          {

                            if(snapshot.hasData )
                              {
                                return ElevatedButton.icon(
                                    style: ButtonStyle(
                                        backgroundColor:
                                        MaterialStateProperty.all(Colors.orange),
                                        foregroundColor:
                                        MaterialStateProperty.all(Colors.black)),
                                    onPressed: ()async {

                                     if(price != null && qte !=null)
                                       {
                                         product['qte']=qte;
                                         product['price']=price;
                                       }

                                      var added = await addCart(product);

                                     if(added['message']=="OK")
                                       {
                                         Toast.show("Produit Ajouter au panier", context, duration: Toast.LENGTH_SHORT, gravity:  Toast.BOTTOM);
                                       }
                                     else{
                                       Toast.show("Produit est déja dans le panier", context, duration: Toast.LENGTH_SHORT, gravity:  Toast.BOTTOM);
                                     }

                                    },
                                    label: Text('Acheter',style:GoogleFonts.poppins()),
                                    icon: Icon(Icons.add_shopping_cart_outlined));
                              }
                            else{
                             return ElevatedButton.icon(

                                  style: ButtonStyle(
                                      backgroundColor:
                                      MaterialStateProperty.all(Colors.orange),
                                      foregroundColor:
                                      MaterialStateProperty.all(Colors.black)),
                                  onPressed: () {

                                    Navigator.pushNamed(context, '/login');
                                  },
                                  label: Text('Acheter',style:GoogleFonts.poppins()),
                                  icon: Icon(Icons.add_shopping_cart_outlined));
                            }
                          }
                      )

                    ],
                  )
                ]);
              }
              else{
                return Center(child: CircularProgressIndicator());
              }
            }));
  }
}
