import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../sevice/order.service';// Import OrderService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adorder',
  standalone: true,
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './adorder.component.html',
  styleUrls: ['./adorder.component.css']
})
export class AdorderComponent implements OnInit {

  orders: any[] = [];  // Mảng để chứa tất cả đơn hàng
  selectedOrder: any = null; // Lưu đơn hàng đang được chọn
  isUpdateFormVisible: boolean = false; // Điều khiển việc hiển thị form cập nhật
  isDetailsVisible: boolean = false; // Điều khiển việc hiển thị chi tiết sản phẩm
  availableStatuses: string[] = ["Chờ xác nhận", "Đã xác nhận", "Đang vận chuyển", "Đang giao hàng", "Đã giao", "Đã hoàn thành", "Đã hủy đơn"];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // Gọi hàm loadOrders để lấy danh sách đơn hàng khi component được khởi tạo
    this.loadOrders();
  }

  // Hàm lấy tất cả đơn hàng
  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (response) => {
        console.log('Dữ liệu đơn hàng:', response);
        this.orders = response.orders; // Giả sử API trả về mảng orders
        console.log(this.orders);
      },
      (error) => {
        console.error('Lỗi khi lấy đơn hàng:', error);
      }
    );
  }

  // Chọn đơn hàng và hiển thị chi tiết
  showDetails(orderId: number): void {
    this.selectedOrder = this.orders.find(order => order.id === orderId);
    console.log(this.selectedOrder);  // Kiểm tra giá trị của selectedOrder
    this.isDetailsVisible = true; // Hiển thị chi tiết khi đơn hàng được chọn
    this.isUpdateFormVisible = false; // Ẩn form cập nhật nếu đang xem chi tiết
  }

  // Hiển thị form cập nhật trạng thái đơn hàng
  toggleUpdateForm(orderId: number): void {
    this.selectedOrder = this.orders.find(order => order.id === orderId);
    this.isUpdateFormVisible = true; // Hiển thị form cập nhật
    this.isDetailsVisible = false; // Ẩn bảng chi tiết khi form cập nhật hiển thị
  }

  // Quay lại bảng đơn hàng
  goBackToTable(): void {
    this.isDetailsVisible = false;
    this.isUpdateFormVisible = false;
  }

  // Quay lại chi tiết sản phẩm
  goBackToDetails(): void {
    this.isDetailsVisible = true;
    this.isUpdateFormVisible = false;
  }

  // Cập nhật trạng thái đơn hàng
  updateStatus(orderId: number, newStatus: string): void {
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe(
      (response) => {
        console.log('Cập nhật trạng thái thành công', response);
        this.loadOrders();  // Tải lại danh sách đơn hàng sau khi cập nhật trạng thái
        this.goBackToTable(); // Quay lại bảng đơn hàng sau khi cập nhật
      },
      (error) => {
        console.error('Lỗi khi cập nhật trạng thái', error);
      }
    );
  }
}
