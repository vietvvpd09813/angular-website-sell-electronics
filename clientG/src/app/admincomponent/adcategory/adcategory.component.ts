import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../sevice/categories.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-adcategory',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './adcategory.component.html',
  styleUrls: ['./adcategory.component.css']
})
export class AdcategoryComponent implements OnInit {
  categories: any[] = [];  // Mảng lưu danh sách các danh mục
  errorMessage: string = '';  // Biến để lưu thông báo lỗi nếu không thể xóa

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    // Gọi phương thức lấy tất cả danh mục từ API
    this.getAllCategories();
  }

  // Lấy tất cả danh mục từ API
  getAllCategories(): void {
    this.categoriesService.getAllCategories().subscribe((response: any) => {
      this.categories = response.data;  // Truy cập thuộc tính 'data' từ API trả về
    });
  }

  // Phương thức xóa danh mục
  deleteCategory(id: number): void {
    console.log('id delete', id);

    // Trước khi xóa, kiểm tra xem có sản phẩm nào liên kết với danh mục này không
    this.categoriesService.checkProductsByCategory(id).subscribe(
      (response) => {
        // Nếu có sản phẩm liên kết, không cho phép xóa
        if (response.hasProducts) {
          this.errorMessage = 'Không thể xóa danh mục này vì có sản phẩm đang sử dụng danh mục này.';
          alert(this.errorMessage);
        } else {
          // Nếu không có sản phẩm nào liên kết, cho phép xóa
          if (confirm('Bạn có muốn xoá danh mục này không?')) {
            this.categoriesService.deleteCategory(id).subscribe(
              () => {
                console.log('Danh mục đã được xoá');
                alert('Danh mục đã được xoá thành công!');

                // Sau khi xoá thành công, gọi lại danh sách danh mục
                this.getAllCategories();  // Lấy lại danh sách danh mục từ server
              },
              (error) => {
                console.error('Có lỗi khi xoá danh mục:', error);
                alert('Danh mục đã được xoá thành công!');
              }
            );
          }
        }
      },
      (error) => {
        console.error('Có lỗi khi kiểm tra sản phẩm:', error);
        alert('Có lỗi khi kiểm tra sản phẩm!');
      }
    );
  }

}
