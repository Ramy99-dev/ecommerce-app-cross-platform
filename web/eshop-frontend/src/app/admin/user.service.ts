import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  baseUrl:string = "http://localhost:4080"

  getAllUsers():Observable<any>{
    return this._http.get(this.baseUrl+"/all-users");
  }
  deleteUser(id:any):Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { id: id }
    };
    return this._http.delete(this.baseUrl+"/delete-user",options);
  }
}
