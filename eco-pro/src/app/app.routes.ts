import { Routes } from '@angular/router';
import { AuthLayoutsComponent } from './layouts/auth-layouts/auth-layouts.component';
import { BlankLayoutsComponent } from './layouts/blank-layouts/blank-layouts.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { homelogGuard } from './core/guards/homelog/homelog.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '', component: AuthLayoutsComponent, canActivate: [homelogGuard], children: [
      { path: 'signup', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: 'signup' },
      { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: 'Login' },
      { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), title: 'Register' },
      { path: 'forgotPassword', loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent), title: 'forgotPassword' }
    ]
  },

  {
    path: '', component: BlankLayoutsComponent, canActivate: [authGuard], children: [
      { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'Home' },
      { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent), title: 'Contact' },
      { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent), title: 'About' },
      { path: 'checkout/:id', loadComponent: () => import('./pages/checkouts/checkouts.component').then(m => m.CheckoutsComponent), title: 'Check out' },
      { path: 'details/:detId', loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), title: 'Details' },
      { path: 'allorders', loadComponent: () => import('./pages/allorders/allorders.component').then(m => m.AllordersComponent), title: 'all orders' },
      { path: 'brand', loadComponent: () => import('./pages/brand/brand/brand.component').then(m => m.BrandComponent), title: 'Brand' },
      { path: 'category', loadComponent: () => import('./pages/category/category/category.component').then(m => m.CategoryComponent), title: 'Category' },
      { path: 'wishlist', loadComponent: () => import('./pages/wishlist/wishlist/wishlist.component').then(m => m.WishlistComponent), title: 'WishList' },
      { path: 'cart', loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), title: 'cart' },
      { path: '**', component: NotfoundComponent }
    ]
  }
];
