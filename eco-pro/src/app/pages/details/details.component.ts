import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PorductsService } from '../../core/services/products/porducts.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
private readonly _ActivatedRoute = inject(ActivatedRoute)
private readonly porductsService = inject(PorductsService)
private readonly cartService = inject(CartService)
private readonly toastrService = inject(ToastrService)
detailsProduct:Iproduct = { } as Iproduct
  ngOnInit(): void {
this._ActivatedRoute.paramMap.subscribe({
  next:(p)=>{
    let idProduct = p.get('detId')
    this.porductsService.getAllSpecificProduct( idProduct ).subscribe({
next : (res)=>{
console.log(res.data)
this.detailsProduct = res.data
},
error:(err)=>{
  console.log(err)
}
    })
  }
})
  }
  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Exclusive');
          this.cartService.cartNumber.next(res.numOfCartItems);
        }
      },
      error: (err) => {
        this.toastrService.error('Failed to add product to cart', 'Error');
        console.error(err);
      },
    });
  }
  selectedImage: string | null = null;

changeMainImage(image: string) {
  this.selectedImage = image;
}

}
