import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../sevice/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';  // Import ChangeDetectorRef

@Component({
  selector: 'app-categori35',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categori35.component.html',
  styleUrl: './categori35.component.css'
})
export class Categori35Component {
  products: any = [];  // Mảng lưu danh sách các sản phẩm

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Lấy danh sách sản phẩm khi component được khởi tạo
    this.getAllProducts();  // Gọi phương thức lấy tất cả sản phẩm
  }

  // Phương thức lấy tất cả sản phẩm
  getAllProducts(): void {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data;
      console.log('data',data);
        // Cập nhật lại danh sách sản phẩm
    });
  }

  // Phương thức xoá sản phẩm theo ID
  deleteProduct(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xoá sản phẩm này?')) {
      this.productService.deleteProduct(id).subscribe(
        (response) => {
          console.log('Sản phẩm đã được xoá:', response);
          alert('Sản phẩm đã được xoá thành công!');

          // Gọi lại phương thức lấy lại danh sách sản phẩm sau khi xoá
          this.getAllProducts();  // Lấy lại danh sách sản phẩm mới nhất từ server

          // Nếu không có thay đổi UI sau khi gọi API, có thể sử dụng ChangeDetectorRef
          this.cdr.detectChanges();  // Yêu cầu Angular kiểm tra lại thay đổi trong component
        },
        (error) => {
          console.error('Có lỗi khi xoá sản phẩm:', error);
          alert('Có lỗi khi xoá sản phẩm!');
        }
      );
    }
  }
}
