import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PorductsService {
  getProductDetails(): any {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient:HttpClient) { }
getAllProduct():Observable<any>{
return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/products')
}
getAllSpecificProduct(id:string | null):Observable<any>{
return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}

}
