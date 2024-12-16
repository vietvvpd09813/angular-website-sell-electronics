import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../sevice/order.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  userId: number = 0;
  orders: any[] = [];  // Mảng lưu các đơn hàng

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadUserId(); // Tải ID người dùng từ localStorage
    if (this.userId) {
      this.getOrders(); // Lấy các đơn hàng của người dùng
    }
  }

  // Lấy userId từ localStorage
  loadUserId(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const parsedUserId = parseInt(storedUserId, 10);
      if (!isNaN(parsedUserId)) {
        this.userId = parsedUserId;
      } else {
        console.error('ID người dùng không hợp lệ!');
      }
    } else {
      console.error('Không tìm thấy ID người dùng trong localStorage!');
    }
  }

  // Lấy đơn hàng của người dùng từ API
  getOrders(): void {
    this.orderService.getOrdersByUserId(this.userId).subscribe(
      (data) => {
        this.orders = data.orders; // Lưu thông tin đơn hàng

        // Thêm thuộc tính showDetails cho mỗi đơn hàng để điều khiển việc ẩn/hiện
        this.orders.forEach(order => {
          order.showDetails = false; // Mặc định chi tiết đơn hàng ẩn
        });
      },
      (error) => {
        console.error('Có lỗi xảy ra khi lấy đơn hàng:', error);
      }
    );
  }

  // Hàm điều khiển việc ẩn/hiện chi tiết đơn hàng
  toggleDetails(orderId: number): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.showDetails = !order.showDetails;
    }
  }

  // Kiểm tra trạng thái đơn hàng trước khi huỷ
  isCancelable(status: string): boolean {
    const nonCancelableStatuses = [
      "Đã xác nhận",
      "Đang vận chuyển",
      "Đang giao hàng",
      "Đã giao",
      "Đã hoàn thành"
    ];
    return !nonCancelableStatuses.includes(status);
  }

  // Xác nhận huỷ đơn hàng
  confirmCancelOrder(orderId: number, status: string): void {
    if (this.isCancelable(status)) {
      const confirmCancel = window.confirm("Bạn có chắc chắn muốn huỷ đơn hàng này?");
      if (confirmCancel) {
        this.cancelOrder(orderId);
      }
    } else {
      alert("Đơn hàng không thể huỷ vì trạng thái hiện tại.");
    }
  }

  // Huỷ đơn hàng
  cancelOrder(orderId: number): void {
    this.orderService.updateOrderStatus(orderId, 'Đã hủy đơn').subscribe(
      (response) => {
        console.log('Đơn hàng đã được huỷ');
        this.getOrders(); // Tải lại danh sách đơn hàng sau khi huỷ
      },
      (error) => {
        console.error('Lỗi khi huỷ đơn hàng:', error);
      }
    );
  }
}
