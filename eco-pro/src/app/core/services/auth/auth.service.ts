// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { jwtDecode } from 'jwt-decode';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor(private httpClient: HttpClient, private router: Router) {}

//   userData: any ;

//   sendRegisterData(data: object): Observable<any> {
//     return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data);
//   }

//   sendLoginData(data: object): Observable<any> {
//     return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data);
//   }

//   saveUserData() {
//      this.userData = jwtDecode(localStorage.getItem('userToken')!)
//      console.log(this.userData)
//   }

//   logOut() {
//     localStorage.removeItem('userToken');
//     this.userData = null;
//     this.router.navigate(['/login']);
//   }

//   setEmailVerify(data: object): Observable<any> {
//     return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data);
//   }

//   setCodeVerify(data: object): Observable<any> {
//     return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', data);
//   }

//   setResetPassword(data: object): Observable<any> {
//     return this.httpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', data);
//   }
// }
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) {}

  private readonly  router = inject(Router);


  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', data );
  }


  sendloginForm(data: object): Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', data );
  }


 userToken:any;
  getUserData():void{
    this.userToken = jwtDecode(localStorage.getItem('token')!);
    console.log(this.userToken);
  }


logOut():void{
  localStorage.removeItem('token');
  this.userToken = null;
this.router.navigate(['/login']);

}



setEmailVerfiy(data:object):Observable<any>{
  return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', data);
}

setCodeVerfiy(data:object):Observable<any>{
  return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', data);
}

setResetPassword(data:object):Observable<any>{
  return this.httpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', data);
}



}
