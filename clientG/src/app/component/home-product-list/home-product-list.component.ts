import { ProductService } from './../../sevice/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductitemComponent } from '../productitem/productitem.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-product-list',
  standalone: true,
  imports: [ProductitemComponent, CommonModule],
  templateUrl: './home-product-list.component.html',
  styleUrls: ['./home-product-list.component.css'], // Sửa lại 'styleUrl' thành 'styleUrls'
})
export class HomeProductListComponent implements OnInit {
  list1: any = [];
  listProducts: any = [];
  categoryId: number = 2;
  constructor(private productService: ProductService) {} // Inject service ProductService vào component

  ngOnInit(): void {
    this.productService.getProductsByCategoryId(this.categoryId).subscribe(
      (data: any[]) => {
        this.list1 = data;
        this.listProducts = this.list1.data;
        console.log('newscasdasdasdsad', this.listProducts); // Gán dữ liệu nhận được vào list1
      },
      (error) => {
        console.error('Có lỗi xảy ra khi lấy danh sách sản phẩm', error);
      }
    );
  }
}
