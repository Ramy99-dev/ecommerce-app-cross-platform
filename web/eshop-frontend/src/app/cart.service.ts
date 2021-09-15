import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private userService: UserService) { }
  baseUrl: string = "http://localhost:4080"
  addCartUser(prod: any): Observable<any> {

    return this.http.post(this.baseUrl + "/add-cart-user", prod, { responseType: 'text' })

  }

  getCartLength(): Observable<any> {

    return this.http.get(this.baseUrl + "/cart-length")
  }

  getCartByUser(): Observable<any> {
    return this.http.get(this.baseUrl + "/cart-user")
  }

  deleteCartItem(idProd: string, idCart: string): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        prodId: idProd,
        cartId: idCart
      },
    };
    return this.http.delete(this.baseUrl + "/cart-item", options)
  }

  buy(total: number): Observable<any> {

    return this.http.post(this.baseUrl + "/buy", { total })

  }
  deleteCart(): Observable<any> {
    return this.http.delete(this.baseUrl + "/cart")
  }


  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();



  changeMessage(nbr: string) {

    this.messageSource.next(nbr)
  }
}
