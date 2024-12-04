import { Component, OnInit } from '@angular/core';
declare function  slider2():void
import { CategoriesService } from '../../sevice/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent  {
  categories: any[] = [];  // Mảng lưu danh sách các danh mục
  constructor(private categoriesService: CategoriesService) {}
  ngOnInit(): void {

    // Gọi phương thức lấy tất cả danh mục từ API
    this.getAllCategories();
    slider2()
  }

  // Lấy tất cả danh mục từ API
  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe((response: any) => {
      this.categories = response.data;  // Truy cập thuộc tính 'data' từ API trả về
    });
  }
}
