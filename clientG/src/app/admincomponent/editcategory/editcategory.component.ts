import { CategoriesService } from './../../sevice/categories.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { ActivatedRoute, RouterLink, Router } from '@angular/router';  // Import RouterLink và ActivatedRoute

@Component({
  selector: 'app-editcategory',
  standalone: true,
  imports: [CommonModule,FormsModule],  // Sử dụng CommonModule và RouterLink
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {

  categoryId: number = 0;  // Biến lưu ID danh mục
  name: string = '';  // Biến lưu tên danh mục
  image: string = '';  // Biến lưu URL hình ảnh
  errorMessage: string = '';  // Biến lưu thông báo lỗi
  isLoading: boolean = false;  // Biến kiểm tra trạng thái loading

  constructor(
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute,  // Để lấy tham số từ URL
    private router: Router  // Để điều hướng khi cập nhật thành công
  ) {}

  ngOnInit(): void {
    this.categoryId = +this.activatedRoute.snapshot.paramMap.get('id')!;  // Lấy ID từ URL
    this.loadCategoryData();  // Gọi phương thức tải dữ liệu danh mục
  }

  // Lấy dữ liệu danh mục từ API
  loadCategoryData(): void {
    this.isLoading = true;  // Bắt đầu loading
    this.categoriesService.getCategoryById(this.categoryId).subscribe(
      (response: any) => {
        if (response) {
          this.name = response.name;
          this.image = response.image;
        } else {
          this.errorMessage = 'Danh mục không tồn tại.';
        }
        this.isLoading = false;  // Dừng loading
      },
      (error) => {
        console.error('Có lỗi khi tải danh mục:', error);
        this.errorMessage = 'Có lỗi khi tải dữ liệu danh mục.';
        this.isLoading = false;  // Dừng loading
      }
    );
  }

  // Phương thức cập nhật danh mục
  updateCategory(): void {
    if (this.name && this.image) {
      console.log(this.name);
      console.log(this.image);

      this.isLoading = true;  // Bắt đầu loading
      this.categoriesService.updateCategory(this.categoryId, this.name, this.image).subscribe(
        (response) => {
          console.log('Danh mục đã được cập nhật:', response);
          alert('Danh mục đã được cập nhật thành công!');
          this.router.navigate(['/admin/adcategory']);  // Điều hướng về trang danh mục sau khi cập nhật thành công
        },
        (error) => {
          console.error('Có lỗi khi cập nhật danh mục:', error);
          this.errorMessage = 'Có lỗi khi cập nhật danh mục.';
          this.isLoading = false;  // Dừng loading
        }
      );
    } else {
      this.errorMessage = 'Tên danh mục và URL hình ảnh là bắt buộc!';
    }
  }
}
