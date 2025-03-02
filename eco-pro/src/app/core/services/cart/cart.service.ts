import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  myToken: string | null = '';

  constructor(private httpClient: HttpClient) {
    if (typeof window !== 'undefined') {
      this.myToken = localStorage.getItem('userToken');
    }
  }
  cartNumber:BehaviorSubject<number> =new BehaviorSubject(0)

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/cart', {
      "productId": id
    }, {
      headers: { token: this.myToken || '' } // تأكيد إن التوكين موجود

    });
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: { token: this.myToken || '' }
    });
  }
  removeSpecificCartItem(id:string):Observable<any> {
      return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}  ` ,
        {
          headers:{
            token:this.myToken || ''
          }
        }
       )
  }
  updateCartQunatity(id:string , newCount:number ):Observable<any> {
return this.httpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
  ,{
    "count":newCount
} ,
{
  headers:{
    token:this.myToken || ''
  }
}
)
  }
  clearCart():Observable<any>{
return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,
{
  headers:{
    token:this.myToken || ''
  }
}
)
  }
}
