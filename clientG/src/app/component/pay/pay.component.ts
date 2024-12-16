import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../sevice/order.service';
import { CartService } from '../../sevice/cart.service';
import { OrderItemService } from '../../sevice/order-item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  cart: any[] = [];
  userId: number | null = null;
  totalAmount: number = 0;

  // Thông tin thanh toán
  fullName: string = '';
  address: string = '';
  phoneNumber: string = '';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserId();
    if (this.userId !== null) {
      this.getCartItems();
    } else {
      console.error('Không tìm thấy ID người dùng trong localStorage!');
    }
  }

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

  getCartItems(): void {
    if (this.userId !== null) {
      this.cartService.getCartItems(this.userId).subscribe(
        (response) => {
          this.cart = response.data;
          this.totalAmount = this.getTotalAmount();
        },
        (error) => {
          console.error('Lỗi khi lấy sản phẩm trong giỏ:', error);
        }
      );
    }
  }

  getTotalAmount(): number {
    return this.cart.reduce((total, item) => {
      const itemPrice = item.product?.price || 0;
      const itemQuantity = item.quantity || 0;
      return total + (itemPrice * itemQuantity);
    }, 0);
  }

  createOrder(): void {
    if (this.userId === null) {
      alert('Vui lòng đăng nhập trước khi thanh toán!');
      return;
    }

    const orderData = {
      userId: this.userId,
      fullName: this.fullName,
      address: this.address,
      phoneNumber: this.phoneNumber,
      totalAmount: this.totalAmount,
      items: this.cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }))
    };

    this.orderService.createOrder(orderData).subscribe(
      (response) => {
        console.log('Đơn hàng đã được tạo:', response);
        alert('Thanh toán thành công!');

        this.createOrderItems(response.order.id);
        this.clearCart();  // Xóa giỏ hàng

        // Chuyển hướng về trang chủ sau khi thanh toán thành công
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Lỗi khi tạo đơn hàng:', error);
        alert('Lỗi thanh toán. Vui lòng thử lại.');
      }
    );
  }

  createOrderItems(orderId: number): void {
    const orderItemsData = this.cart.map(item => ({
      orderId: orderId,
      productId: item.product.id,
      price: item.product.price,
      quantity: item.quantity
    }));

    this.orderItemService.createOrderItem(orderId, orderItemsData).subscribe(
      (response) => {
        console.log('OrderItems đã được tạo:', response);
      },
      (error) => {
        console.error('Lỗi khi tạo OrderItem:', error);
      }
    );
  }

  clearCart(): void {
    if (this.userId !== null) {
      this.cartService.clearCart(this.userId).subscribe(
        (response) => {
          console.log('Giỏ hàng đã được xoá:', response);
          this.cart = [];  // Xóa giỏ hàng từ giao diện
          localStorage.setItem('cartCount', '0');  // Cập nhật số lượng giỏ hàng trong localStorage nếu cần
        },
        (error) => {
          console.error('Lỗi khi xoá giỏ hàng:', error);
        }
      );
    }
  }
}
