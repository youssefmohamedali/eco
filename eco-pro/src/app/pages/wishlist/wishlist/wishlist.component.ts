import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { Iproduct } from '../../../shared/interfaces/iproduct';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  products: Iproduct[] = [];
  wishlistCount: number = 0;

  ngOnInit(): void {
    this.getWishlist();
    this.wishlistService.countWishlist.subscribe(count => {
      this.wishlistCount = count;
    });
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getWishlist() {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.products = res.data;
        this.wishlistService.countWishlist.next(res.count);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  removeFromWishlist(id: string): void {
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          console.log(res.data.length);
          this.toastrService.success(res.message, 'FreshCart');
          this.products = this.products.filter(item => item.id !== id);
          this.wishlistService.countWishlist.next(res.data.length);
        }
      },
      error: (err) => console.log(err)
    });
  }
}
