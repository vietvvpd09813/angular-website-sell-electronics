import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule để sử dụng ngModel
import { ProductsITEMComponent } from '../products-item/products-item.component';
import { ProductService } from '../../sevice/product.service';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductsITEMComponent],  // Đảm bảo FormsModule có trong imports
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];        // Danh sách tất cả sản phẩm
  categories: any[] = [];      // Danh sách danh mục
  filteredProducts: any[] = []; // Danh sách sản phẩm sau khi lọc
  searchTerm: string = '';      // Từ khóa tìm kiếm
  selectedCategoryId: string = '';  // ID của danh mục được chọn

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getCategories();
  }

  // Lấy tất cả sản phẩm
  getAllProducts(): void {
    this.productService.getAllProducts().subscribe((response: any) => {
      this.products = response.data;
      this.filteredProducts = this.products;  // Ban đầu, hiển thị tất cả sản phẩm
    });
  }

  // Lấy danh sách danh mục
  getCategories(): void {
    this.productService.getCategories().subscribe((response: any) => {
      this.categories = response.data;  // Lưu danh sách danh mục
    });
  }

  // Tìm kiếm sản phẩm theo tên khi nhấn nút
  onSearch(): void {
    this.filterProducts();  // Gọi hàm lọc khi nhấn nút tìm kiếm
  }

  // Lọc sản phẩm theo tên
  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Lọc sản phẩm theo danh mục khi người dùng chọn một danh mục
  filterByCategory(categoryId: string): void {
    this.selectedCategoryId = categoryId;
    if (categoryId) {
      this.filteredProducts = this.products.filter(product =>
        product.categoryId === categoryId
      );
    } else {
      this.filteredProducts = this.products;  // Nếu không chọn danh mục, hiển thị tất cả sản phẩm
    }
  }
}
