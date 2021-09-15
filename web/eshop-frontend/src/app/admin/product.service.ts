import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient) { }

  baseUrl:string = "http://localhost:4080"

  addProd(prod:any):Observable<any>{
    return this._http.post(this.baseUrl+"/add-prod",prod);
  }
  editProd(prod:any):Observable<any>{
    return this._http.put(this.baseUrl+"/edit-prod",{prod});
  }

  uploadImg(fd:FormData):Observable<any>{
    return this._http.post(this.baseUrl+"/upload-img",fd);
  }

  getAllProd():Observable<any>{
    return this._http.get(this.baseUrl+"/all-prod");
  }
  deleteProd(id:any):Observable<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { id: id }
    };
    return this._http.delete(this.baseUrl+"/delete-prod",options);
  }

  getProdById(id:any):Observable<any>{
    return this._http.get(`${this.baseUrl}/prod-by-id/${id}`);
  }

  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();



  changeMessage(prodId: string) {
    
    this.messageSource.next(prodId)
    
  }
}
