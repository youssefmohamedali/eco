import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../../core/services/category/category.service';

@Component({
  selector: 'app-category',
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
private readonly categoryService = inject(CategoryService)
Category: any[] = [];

ngOnInit(): void {
  this.getAllCategory()
}
getAllCategory():void{
this.categoryService.getAllCategory().subscribe({
next:(res)=>{
console.log(res.data)
this.Category = res.data
} ,
error:(err)=>{
  console.log(err)
}
})
}
}
