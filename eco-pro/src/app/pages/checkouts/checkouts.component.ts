
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { error } from 'console';

@Component({
  selector: 'app-checkouts',
  imports: [ReactiveFormsModule],
templateUrl: './checkouts.component.html',
  styleUrl: './checkouts.component.scss'
})
export class CheckoutsComponent implements OnInit {
private readonly activatedRoute= inject(ActivatedRoute)
private readonly ordersService= inject(OrdersService)
private readonly router = inject(Router)
cartId  :string = "" ;
  checkOutForm! : FormGroup ;
ngOnInit(): void {
this.initForm()
this.getCartId()
}
initForm():void{
  this.checkOutForm = new FormGroup({
    details : new FormControl (null , [Validators.required]) ,
    phone : new FormControl(null , [Validators.required , Validators.pattern(/^ 01[0125][0-9]{8} $/)]) ,
    city : new FormControl(null , [Validators.required])
})
}

getCartId(): void {
  this.activatedRoute.paramMap.subscribe({
    next: (param) => {
      const id = param.get('id');
      if (id) {
        this.cartId = id;
      } else {
        console.error('Cart ID not found');
      }
    }
  });
}
userId:string = ""
submitFormCard(): void {
  this.ordersService.checkOutPayment(this.cartId, this.checkOutForm.value).subscribe({
    next: (res) => {
      console.log(res);
      if (res.status === 'success') {
        open(res.session.url, '_self');
      }
    },
    error: (err) => {
      console.error(err); // استخدام console.error بدلاً من console.log
    }
  });
}
submitFormCash():void{
  console.log(this.checkOutForm.value);

  this.ordersService.checkoutPaymentCash(this.cartId , this.checkOutForm.value).subscribe({
    next: (res)=>{
if(res.status == 'success'){
  this.userId = res.data.user
  localStorage.setItem('id' ,this.userId)
  setTimeout(() => {
    this.router.navigate(['/allorders']);
  }, 1300);

  console.log(res);

}

    },
    error: (err)=>{
      console.log(err);
      
    }
  })
}

}
