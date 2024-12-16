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
      const parsedUserId = parseInt(storedUserId, 10);
      if (!isNaN(parsedUserId)) {
        this.userId = parsedUserId;
        this.getCartItems();
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

  // Tính tổng số lượng sản phẩm
  getTotalQuantity(): number {
    return this.cart.reduce((total, item) => total + (item.quantity || 0), 0);
  }

  // Tính tổng tiền
  getTotalAmount(): number {
    return this.cart.reduce((total, item) => {
      const itemPrice = item.product?.price || 0;
      const itemQuantity = item.quantity || 0;
      return total + (itemPrice * itemQuantity);
    }, 0);
  }

  // Xóa sản phẩm khỏi giỏ
  removeFromCart(id: number): void {
    if (this.userId === null) {
      alert("Bạn cần đăng nhập để xóa sản phẩm khỏi giỏ hàng.");
      return;
    }

    this.cartService.removeFromCart(id).subscribe(
      (response) => {
        this.getCartItems();  // Cập nhật giỏ hàng sau khi xóa sản phẩm
        alert("Sản phẩm đã được xóa khỏi giỏ hàng thành công!");
      },
      (error) => {
        console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
        alert("Lỗi khi xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại.");
      }
    );
  }

  // Tăng số lượng sản phẩm
  increaseQuantity(id: number): void {
    const item = this.cart.find(item => item.id === id);
    if (item && item.quantity !== undefined) {
      item.quantity++;
      this.updateCartItem(id, item.quantity);
    }
  }

  // Giảm số lượng sản phẩm
  decreaseQuantity(id: number): void {
    const item = this.cart.find(item => item.id === id);
    if (item && item.quantity > 1) {  // Kiểm tra không cho giảm xuống dưới 1
      item.quantity--;
      this.updateCartItem(id, item.quantity);  // Gọi API để cập nhật giỏ hàng
    }
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItem(id: number, quantity: number): void {
    if (this.userId !== null) {
      this.cartService.updateCartItem(id, quantity).subscribe(
        (response) => {
          console.log('success update');

          this.getCartItems();  // Cập nhật lại giỏ hàng sau khi thay đổi số lượng
        },
        (error) => {
          console.error('Lỗi khi cập nhật sản phẩm trong giỏ:', error);
          alert("Lỗi khi cập nhật sản phẩm trong giỏ hàng. Vui lòng thử lại.");
        }
      );
    }
  }
}
