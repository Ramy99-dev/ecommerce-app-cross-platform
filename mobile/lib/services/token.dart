import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class Token {
  static final storage = new FlutterSecureStorage();
  static bool connected ;
  static getToken(k) async {
    return await storage.read(key: k);
  }

  static deleteToken(k) async {
    await storage.delete(key: k);
  }

  static addToken(k, val) async {
    await storage.write(key: k, value: val);
  }
}
