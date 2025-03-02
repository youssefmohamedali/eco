import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const homelogGuard: CanActivateFn = (route, state) => {
const _Router = inject(Router)

if(localStorage.getItem("token")!==null){
  _Router.navigate(['/home'])

  return false
}else{
  // _Router.navigate()
  return true
}};
