// cart.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './../../sevice/cart.service';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  userId: number | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      const parsedUserId = parseInt(storedUserId, 10);  // Chuyển đổi sang kiểu number
      if (!isNaN(parsedUserId)) {
        this.userId = parsedUserId;
        this.getCartItems();  // Gọi API sau khi đã chuyển đổi thành công
      } else {
        console.error('ID người dùng không hợp lệ!');
      }
    } else {
      console.error('Không tìm thấy ID người dùng trong localStorage!');
    }
  }

  getCartItems(): void {
    if (this.userId !== null) {
      this.cartService.getCartItems(this.userId).subscribe((response) => {
        this.cart = response.data;
        console.log('Các sản phẩm trong giỏ:', this.cart);
      }, (error) => {
        console.error('Lỗi khi lấy sản phẩm trong giỏ:', error);
      });
    }
  }

  // Hàm tính tổng số lượng sản phẩm trong giỏ hàng
  getTotalQuantity(): number {
    return this.cart.reduce((total, item) => total + (item.quantity || 0), 0);
  }

  // Hàm tính tổng tiền của tất cả sản phẩm trong giỏ hàng
  getTotalAmount(): number {
    return this.cart.reduce((total, item) => {
      const itemPrice = item.product?.price || 0;  // Giá của sản phẩm
      const itemQuantity = item.quantity || 0;  // Số lượng sản phẩm
      return total + (itemPrice * itemQuantity);  // Tính tổng tiền
    }, 0);
  }

  // Hàm xử lý xóa sản phẩm khỏi giỏ hàng
  removeFromCart(id: number): void {
    if (this.userId === null) {
      alert("Bạn cần đăng nhập để xóa sản phẩm khỏi giỏ hàng.");
      return;
    }

    // Gọi API xóa sản phẩm
    this.cartService.removeFromCart(id).subscribe(
      (response) => {
        // Sau khi xóa thành công, gọi lại giỏ hàng để cập nhật
        this.getCartItems();
        alert("Sản phẩm đã được xóa khỏi giỏ hàng thành công!");  // Thông báo thành công
      },
      (error) => {
        console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
        alert("Lỗi khi xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại.");
      }
    );
  }
}
