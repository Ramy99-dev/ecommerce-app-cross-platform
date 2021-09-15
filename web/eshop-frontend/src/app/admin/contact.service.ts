import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _http:HttpClient) { }

  baseUrl:string = "http://localhost:4080"

  getAllContact():Observable<any>{
    return this._http.get(this.baseUrl+"/all-contact");
  }
  getContact(id:string):Observable<any>{
    return this._http.get(this.baseUrl+`/contact/${id}`);
  }

  deleteContact(id:any):Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { id: id }
    };
    return this._http.delete(this.baseUrl+"/delete-contact",options);
  }
}
