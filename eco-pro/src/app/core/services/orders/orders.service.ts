import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient : HttpClient) { }
myToken:any = localStorage.getItem('token')
checkOutPayment(id: string, data: object): Observable<any> {
  const myToken = localStorage.getItem('token');
  if (!myToken) {
    throw new Error('Token not found');
  }
  return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`, {
    "shippingAddress": data
  }, {
    headers: {
      token: myToken
    }
  });

}
getAllOrders(): Observable<any> {
  // استرجاع userId من localStorage
  const userId = localStorage.getItem('id');

  if (!userId) {
    console.warn("❌ No User ID found! User might not be logged in.");
    return throwError(() => new Error("No User ID found! Please log in."));
  }

  return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
  }
checkoutPaymentCash(id: string, data: object): Observable<any> {
  if (!this.myToken) {
    console.warn("❌ No token found! User might not be logged in.");
    return throwError(() => new Error("No token found! Please log in."));
  }

  return this.httpClient.post(
    `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
    { "shippingAddress": data },
    {
      headers: {
        token: this.myToken
      }
    }
  );
}}
