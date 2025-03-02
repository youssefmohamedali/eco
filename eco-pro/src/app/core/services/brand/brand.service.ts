import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient: HttpClient) { }

  getAllBrand(): Observable<any> {
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }


}
