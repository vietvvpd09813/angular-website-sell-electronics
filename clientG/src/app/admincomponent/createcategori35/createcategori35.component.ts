import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../sevice/product.service';
import { CategoriesService } from '../../sevice/categories.service';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule và NgForm nếu sử dụng form
import { Router } from '@angular/router'; // Dùng Router để điều hướng sau khi thêm sản phẩm
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createcategori35',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './createcategori35.component.html',
  styleUrls: ['./createcategori35.component.css']
})
export class Createcategori35Component implements OnInit {
  categories: any[] = [];  // Mảng lưu danh sách các danh mục
  selectedCategoryId: number = 0;  // Cập nhật biến này là kiểu number và gán giá trị mặc định là 0

  // Các giá trị mặc định cho sản phẩm
  defaultImageUrl: string = "https://tailwindflex.com/storage/avatars/177.jpg?ver=1";
  defaultPrice: number = 200;
  defaultDescription: string = "ok";
  defaultCategoryId: number = 1;

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

      // Kiểm tra nếu các trường image1, image2, image3 không được điền, gán giá trị mặc định
      const finalImage1 = image1 || this.defaultImageUrl;
      const finalImage2 = image2 || this.defaultImageUrl;
      const finalImage3 = image3 || this.defaultImageUrl;

      // Kiểm tra nếu price và description không được điền, gán giá trị mặc định
      const finalPrice = price || this.defaultPrice;
      const finalDescription = description || this.defaultDescription;

      // Kiểm tra nếu selectedCategoryId không hợp lệ, gán giá trị mặc định
      const finalCategoryId = this.selectedCategoryId > 0 ? this.selectedCategoryId : this.defaultCategoryId;

      console.log(name, finalPrice, finalImage1, finalImage2, finalImage3, finalDescription, finalCategoryId);

      // Gọi service để thêm sản phẩm
      this.addProduct(name, finalPrice, finalImage1, finalImage2, finalImage3, finalDescription, finalCategoryId);
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
        this.router.navigate(['/lab34']);  // Sau khi thêm thành công, điều hướng đến trang sản phẩm
      },
      (error) => {
        console.error('Có lỗi khi thêm sản phẩm:', error);
      }
    );
  }
}
