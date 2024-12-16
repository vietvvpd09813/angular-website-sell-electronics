import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../sevice/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';  // Import ChangeDetectorRef

@Component({
  selector: 'app-adproduct',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './adproduct.component.html',
  styleUrls: ['./adproduct.component.css']  // Sửa thành 'styleUrls' thay vì 'styleUrl'
})
export class AdproductComponent implements OnInit {
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


          this.getAllProducts();


          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Có lỗi khi xoá sản phẩm:', error);
          alert('Có lỗi khi xoá sản phẩm!');
        }
      );
    }
  }
}
