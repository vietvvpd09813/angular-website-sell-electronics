import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../sevice/product.service';
import { CategoriesService } from '../../sevice/categories.service';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule và NgForm nếu sử dụng form
import { Router } from '@angular/router'; // Dùng Router để điều hướng sau khi thêm sản phẩm
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [FormsModule, CommonModule], // Thêm FormsModule để sử dụng trong template
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  categories: any[] = [];  // Mảng lưu danh sách các danh mục
  selectedCategoryId: number = 0;  // Cập nhật biến này là kiểu number và gán giá trị mặc định là 0

  constructor(
    private productService: ProductService,  // Inject ProductService
    private categoriesService: CategoriesService,  // Inject CategoriesService
    private router: Router  // Inject Router để điều hướng sau khi thêm sản phẩm
  ) {}

  ngOnInit(): void {
    // Lấy danh sách các danh mục khi component được khởi tạo
    this.categoriesService.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data.data;
        console.log("Danh mục sản phẩm nhận được:", this.categories);  // Log ra danh sách danh mục để kiểm tra
      },
      (error) => {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    );
  }

  // Phương thức xử lý form submit
  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { name, price, image1, image2, image3, description } = form.value;
      console.log(name, price, image1, image2, image3, description, this.selectedCategoryId);

      // Kiểm tra nếu selectedCategoryId là hợp lệ (không phải 0) trước khi gọi addProduct
      if (this.selectedCategoryId > 0) {
        // Gọi service để thêm sản phẩm
        this.addProduct(name, price, image1, image2, image3, description, this.selectedCategoryId);
      } else {
        console.log('Vui lòng chọn danh mục sản phẩm');
        alert('Vui lòng chọn danh mục sản phẩm!');
      }
    } else {
      console.log('Form không hợp lệ');
    }
  }

  // Tách riêng phương thức gọi service để thêm sản phẩm
  addProduct(name: string, price: number, image1: string, image2: string, image3: string, description: string, categoryId: number): void {
    this.productService.addProduct(name, price, image1, image2, image3, description, categoryId).subscribe(
      (response) => {
        console.log('Sản phẩm đã được thêm thành công:', response);
        alert('Sản phẩm đã được thêm thành công!');
        this.router.navigate(['/admin/adproduct']);  // Sau khi thêm thành công, điều hướng đến trang sản phẩm
      },
      (error) => {
        console.error('Có lỗi khi thêm sản phẩm:', error);
      }
    );
  }
}
