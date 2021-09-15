import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _http:HttpClient) { }
  baseUrl:string = "http://localhost:4080"
  addContact(contact:any):Observable<any>{
    return this._http.post(this.baseUrl+"/add-contact",contact);
  }
}
