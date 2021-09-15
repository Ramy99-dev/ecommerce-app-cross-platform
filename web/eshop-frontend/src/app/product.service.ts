import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient , private router:Router) { }
  baseUrl:string = "http://localhost:4080"
  getAllProd(opt:any):Observable<any>{
    return this._http.get(`${this.baseUrl}/all-prod-pagination/${JSON.stringify(opt)}`);
  }

  getProdByCateg(opt:any):Observable<any>{
    return this._http.get(`${this.baseUrl}/get-product-by-categ/${JSON.stringify(opt)}`);
  }

  getProd():Observable<any>{
    return this._http.get(this.baseUrl+"/all-prod");
  }

  getPriceInterval():Observable<any>{
    return this._http.get(this.baseUrl+"/price-interval");
  }
  
  getProdById(id:any):Observable<any>{
    return this._http.get(`${this.baseUrl}/prod-by-id/${id}`);
  }
  getProdByCategId(id:any):Observable<any>{
    return this._http.get(`${this.baseUrl}/prod-by-categ-id/${id}`);
  }

  searchProd(opt:any):Observable<any>{
    return this._http.get(`${this.baseUrl}/search-product/${JSON.stringify(opt)}`);
  }

  updateProdSales(id:any,qte:number):Observable<any>{
    return this._http.put(`${this.baseUrl}/product-sales`,{'id':id,'qte':qte});
  }
  updateProdQte(id:any,qte:number):Observable<any>{
    return this._http.put(`${this.baseUrl}/product-qte`,{'id':id,'qte':qte});
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

  getBestProd():Observable<any>{
    return this._http.get(this.baseUrl+"/best-prod")
  }

  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();



  changeMessage(prods: any) {
    
    this.messageSource.next(prods)
    this.router.navigate(['/produits'])
  }

}
