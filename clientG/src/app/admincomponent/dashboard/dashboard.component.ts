import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../sevice/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any[] = []; // Danh sách sản phẩm
  top7Products: any[] = []; // Top 7 sản phẩm có giá cao nhất
  chartData: any[] = []; // Dữ liệu biểu đồ

  // Mảng chứa 7 màu sắc cố định
  colors: string[] = [
    'bg-red-500',    // Màu đỏ
    'bg-blue-500',   // Màu xanh dương
    'bg-green-500',  // Màu xanh lá
    'bg-yellow-500', // Màu vàng
    'bg-purple-500', // Màu tím
    'bg-pink-500',   // Màu hồng
    'bg-orange-500'  // Màu cam
  ];

  constructor(private productService: ProductService) {}

  // Hàm lấy tất cả sản phẩm từ API
  getAllProduct(): void {
    this.productService.getAllProducts().subscribe((response: any) => {
      this.products = response.data; // Lưu sản phẩm từ API

      // Lọc ra top 7 sản phẩm có giá cao nhất
      this.top7Products = this.products
        .sort((a, b) => b.price - a.price) // Sắp xếp theo giá giảm dần
        .slice(0, 7); // Lấy 7 sản phẩm đầu tiên

      // Gán màu sắc cho mỗi sản phẩm trong chartData
      this.chartData = this.top7Products.map((product, index) => ({
        ...product,
        value: 0, // Khởi tạo giá trị cột là 0
        isAnimated: false,
        color: this.colors[index] // Gán màu từ mảng `colors`
      }));

      // Gọi animation cho chartData
      this.animateChart();
    });
  }

  // Hàm thực hiện animation
  animateChart(): void {
    this.chartData.forEach((product, index) => {
      setTimeout(() => {
        this.chartData[index].isAnimated = true;
        this.chartData[index].value = product.price * 0.001; // Giảm 90% giá trị gốc
      }, index * 300); // Thực hiện animation cho từng cột lần lượt
    });
  }

  // Hàm định dạng giá thành tiền Việt Nam (VND)
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  ngOnInit() {
    this.getAllProduct(); // Lấy tất cả sản phẩm khi component khởi tạo
  }
}
