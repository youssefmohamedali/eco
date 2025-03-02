import { Component, OnInit, inject } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Iorder } from '../../shared/interfaces/i-order';

@Component({
  imports :[DatePipe, CurrencyPipe , CommonModule],
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

orders: Iorder[] = [];

  private readonly ordersService = inject(OrdersService);

  constructor() {}

  ngOnInit(): void {
    this.getOrdersData();
  }

  getOrdersData(): void {
    this.ordersService.getAllOrders().subscribe({
      next: (res) => {
this.orders = res
        console.log("📌 Orders Data:", res);
      },
      error: (err) => {
        console.error("❌ Error fetching orders:", err);
      }
    });
  }
}
