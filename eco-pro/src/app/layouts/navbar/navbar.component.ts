import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule , SearchPipe , FormsModule  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() isLogin: boolean = true;
  cartCount: number = 0
  countWishlist!: number;

  readonly authService = inject(AuthService);
  readonly cartService = inject(CartService);
  readonly wishlistService = inject(WishlistService);

  isOpen = false;

  ngOnInit(): void {
    this.cartService.cartNumber.subscribe({
      next: (value) => {
        this.cartCount = value;
      },
    });

    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartNumber.next(res.numOfCartItems);
      },
    });

    this.wishlistService.countWishlist.subscribe({
      next: (value) => {
        this.countWishlist = value;
      },
    });

    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlistService.countWishlist.next(res.count);
      },
    });
  }
  nameProduct : string = ''

 }
