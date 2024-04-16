import 'dart:async';

import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';
import 'nav.dart';
import 'sideBar.dart';
import './services/products.dart';
import 'package:google_fonts/google_fonts.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  Timer _timer;
  @override
  void initState() {
    getRandomProducts();
    EasyLoading.addStatusCallback((status) {
      if (status == EasyLoadingStatus.dismiss) {
        _timer?.cancel();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        //resizeToAvoidBottomInset: true,
        appBar: Nav(),
        drawer: SideBar(),
        body: SafeArea(
          child: ListView(
            scrollDirection: Axis.vertical,
            children: [
              Container(
                color: Colors.orange,
                height: 200,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Text("EShop",
                        style: GoogleFonts.poppins(
                            textStyle: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 25))),
                    Image.asset('assets/cover1.png')
                  ],
                ),
              ),
              SizedBox(
                height: 10,
              ),
              FutureBuilder<List>(
                  future: getRandomProducts(),
                  builder: (context, AsyncSnapshot snapshot) {
                    if (snapshot.hasData) {
                      return CarouselSlider(
                        options: CarouselOptions(
                          height: 400.0,
                          enableInfiniteScroll: false,
                        ),
                        items: snapshot.data.map<Widget>((i) {
                          return Builder(
                            builder: (BuildContext context) {
                              return Container(
                                  width: MediaQuery.of(context).size.width,
                                  margin: EdgeInsets.symmetric(horizontal: 5.0),
                                  child: InkWell(
                                    onTap: () {
                                      Navigator.pushNamed(
                                          context, '/single-product',
                                          arguments: i['_id']);
                                    },
                                    child: Image.network(
                                        'http://localhost:4080/${i['product_img']}'),
                                  ));
                            },
                          );
                        }).toList(),
                      );
                    } else {
                      return Center(child: CircularProgressIndicator());
                    }
                  }),
              SizedBox(
                height: 10,
              ),
              Container(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [Image.asset("assets/banner-img1.png")],
                ),
                color: Colors.orange,
                height: 200,
              ),
              SizedBox(
                height: 10,
              ),
              FutureBuilder(
                  future: getBestProduct(),
                  builder: (context, AsyncSnapshot snapshot) {
                    if (snapshot.hasData) {
                      return CarouselSlider(
                        options: CarouselOptions(
                            height: 400.0, enableInfiniteScroll: false),
                        items: snapshot.data.map<Widget>((i) {
                          print(i['product_img']);
                          return Builder(
                            builder: (BuildContext context) {
                              return Container(
                                  width: MediaQuery.of(context).size.width,
                                  margin: EdgeInsets.symmetric(horizontal: 5.0),
                                  child: InkWell(
                                    onTap: () {
                                      Navigator.pushNamed(
                                          context, '/single-product',
                                          arguments: i['_id']);
                                    },
                                    child: Image.network(
                                        'http://localhost:4080/${i['product_img']}'),
                                  ));
                            },
                          );
                        }).toList(),
                      );
                    } else {
                      return Center(child: CircularProgressIndicator());
                    }
                  }),
            ],
          ),
        ));
  }
}
