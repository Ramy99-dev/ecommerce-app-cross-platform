import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }
  baseUrl:string = "http://localhost:4080"

   getAllCateg():Observable<any>{
    return this._http.get(this.baseUrl+"/all-categ");
  }
}
