import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { Icart } from '../../shared/interfaces/icart';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'] ,
  imports: [CommonModule , RouterLink]
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cartDetails: Icart = {} as Icart ;

  ngOnInit(): void {
    this.getCartData();
  }
  trackByProductId(index: number, cartItem: any): string {
    return cartItem._id;
  }
  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }



  updateCount( id:string , count:number ):void{
    this.cartService.updateCartQunatity(id , count).subscribe({
      next:(res)=>{
        console.log(res)
        this.cartDetails = res.data;

        } ,
        error:(err)=>{
          console.log(err)
        }
        })
      }

  removeItem(id: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => { // Fixed the closing parenthesis here
      if (result.isConfirmed) {
        this.cartService.removeSpecificCartItem(id).subscribe({
          next: (res) => {
            console.log(res);
            this.cartDetails = res.data;
            this.cartService.cartNumber.next(res.numOfCartItems);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }




  clearCart(): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe({
          next: (res) => {
            console.log(res);
            this.cartDetails = {} as Icart;
            this.cartService.cartNumber.next(res.numOfCartItems);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }


}
