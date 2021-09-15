import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
  baseUrl:string = "http://localhost:4080"
  addUser(user:any):Observable<any>{
    return this._http.post(this.baseUrl+"/add-user",user);
  }
  login(user:any):Observable<any>{
    return this._http.post(this.baseUrl+"/login",user);
  }
  editUser(user:any):Observable<any>{
    return this._http.put(this.baseUrl+"/edit-user",{user});
  }
  getUserById():Observable<any>{
    return this._http.get(this.baseUrl+"/user-by-id",{responseType: 'text'});
  }
  addMoney(newCredit:number):Observable<any>{
    return this._http.put(this.baseUrl+"/add-money",{newCredit});
  }
  loggedIn()
  {
    return !!localStorage.getItem('jwt')
  }
  logout():Observable<any>{
    return this._http.post(this.baseUrl+"/logout",{});
  }
  updateUserCredit(total:number):Observable<any>{
    return this._http.put(this.baseUrl+"/user-credit",{total});
  }

  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();



  changeMessage(user: any) {
    
    this.messageSource.next(user)
    
  }
}
