import { CommonModule } from '@angular/common';
import { CategoriesService } from './../../sevice/categories.service';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; // Import NgForm để lấy thông tin từ form
import { Router } from '@angular/router'; // Import Router để điều hướng sau khi thêm danh mục

@Component({
  selector: 'app-form-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule], // Thêm FormsModule vào imports để sử dụng ngForm
  templateUrl: './form-add-category.component.html',
  styleUrls: ['./form-add-category.component.css'],
})
export class FormAddCategoryComponent {
  // Biến để lưu thông báo lỗi và thành công
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private categoriesService: CategoriesService,
    private router: Router // Inject Router vào constructor
  ) {}

  // Phương thức xử lý form submit
  onSubmit(form: NgForm): void {
    if (form.valid) {
      // Lấy dữ liệu từ form
      const { name, image } = form.value;

      // Kiểm tra nếu image rỗng hoặc không hợp lệ
      if (!image || image.trim() === '') {
        this.errorMessage = 'Vui lòng nhập URL hình ảnh hợp lệ.';
        return;
      }

      // Gọi service để thêm danh mục
      this.addCategory(name, image);
    } else {
      this.errorMessage = 'Form không hợp lệ. Vui lòng kiểm tra lại.';
    }
  }

  // Tách riêng phương thức để gọi service thêm danh mục
  addCategory(name: string, image: string): void {
    this.categoriesService.addCategory(name, image).subscribe(
      (response) => {
        console.log('Danh mục đã được thêm thành công:', response);
        this.successMessage = 'Danh mục đã được thêm thành công!';
        this.errorMessage = ''; // Xóa thông báo lỗi nếu có

        // Sau khi thêm thành công, chuyển hướng đến danh sách danh mục
        this.router.navigate(['/admin/adcategory']);
      },
      (error) => {
        console.error('Có lỗi khi thêm danh mục:', error);
        this.successMessage = ''; // Xóa thông báo thành công nếu có
        this.errorMessage = 'Có lỗi xảy ra khi thêm danh mục. Vui lòng thử lại.';
      }
    );
  }
}
