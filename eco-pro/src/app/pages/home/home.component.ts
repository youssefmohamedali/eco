import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';

import { PorductsService } from '../../core/services/products/porducts.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { UserinfoService } from '../../core/services/userinfo/userinfo.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import {SearchPipe} from '../../shared/pipes/search.pipe' ;

import { Iproduct } from '../../shared/interfaces/iproduct';
import { Icategory } from '../../shared/interfaces/icategory';
import { Iuserinfo } from '../../shared/interfaces/iuserinfo';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, CommonModule ,SearchPipe , FormsModule ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private readonly porductsService = inject(PorductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly userinfoService = inject(UserinfoService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);

  customMainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplayTimeout: 3000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 },
    },
    nav: true,
  };

  userOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 },
    },
    nav: true,
  };

  wishlist: string[] = [];
  products: Iproduct[] = [];
  categories: Icategory[] = [];
  userHome: Iuserinfo[] = [];

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoryData();
    this.getUserData();
    // this.getWishlist();
  }

  getProductsData(): void {
    this.porductsService.getAllProduct().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        this.toastrService.error('Failed to load products', 'Error');
        console.error(err);
      },
    });
  }

  getCategoryData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        this.toastrService.error('Failed to load categories', 'Error');
        console.error(err);
      },
    });
  }

  getUserData(): void {
    this.userinfoService.getAllUserInfo().subscribe({
      next: (res) => {
        this.userHome = res;
      },
      error: (err) => {
        this.toastrService.error('Failed to load user data', 'Error');
        console.error(err);
      },
    });
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

  addToWishlist(id: string): void {
    const isInWishlist = this.wishlist.includes(id);

    if (isInWishlist) {
      this.wishlistService.removeProductFromWishlist(id).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.toastrService.warning(res.message, 'FreshCart');
            this.wishlist = this.wishlist.filter((item) => item !== id);
            this.wishlistService.countWishlist.next(res.data.length);
          }
        },
        error: (err) => {
          this.toastrService.error('Failed to remove product from wishlist', 'Error');
          console.error(err);
        },
      });
    } else {
      this.wishlistService.addProductToWishlist(id).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.toastrService.success(res.message, 'FreshCart');
            this.wishlist.push(id);
            this.wishlistService.countWishlist.next(res.data.length);
          }
        },
        error: (err) => {
          this.toastrService.error('Failed to add product to wishlist', 'Error');
          console.error(err);
        },
      });
    }
  }

  getWishlist(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlist = res.data.map((item: any) => item._id);
      },
      error: (err) => {
        this.toastrService.error('Failed to load wishlist', 'Error');
        console.error(err);
      },
    });
  }


  nameProduct : string = ''


}

