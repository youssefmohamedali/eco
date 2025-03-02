import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../../core/services/brand/brand.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brand',
  imports: [RouterLink],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent implements OnInit {
  private readonly brandService = inject(BrandService);

  brands: any[] = [];

  ngOnInit(): void {
    this.getAllBrand();
  }

  getAllBrand() {
    this.brandService.getAllBrand().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brands = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  trackById(index: number, item: any): string {
    return item._id;
  }
}
