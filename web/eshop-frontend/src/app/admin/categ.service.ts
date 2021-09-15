import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategService {

  constructor(private _http:HttpClient) { }
  baseUrl:string = "http://localhost:4080"

   getAllCateg():Observable<any>{
    return this._http.get(this.baseUrl+"/all-categ");
  }
  getCateg(id:string):Observable<any>{
    return this._http.get(this.baseUrl+`/categ/${id}`);
  }
  addCateg(categ:any):Observable<any>{
    return this._http.post(this.baseUrl+"/add-categ",categ);
  }

  

  deleteCateg(id:any):Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { id: id }
    };
    return this._http.delete(this.baseUrl+"/delete-categ",options);
  }

  
  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();

  editCateg(categ:any):Observable<any>{
    return this._http.put(this.baseUrl+"/edit-categ",{categ});
  }


  changeMessage(categId: string) {
    
    this.messageSource.next(categId)
    
  }
}
