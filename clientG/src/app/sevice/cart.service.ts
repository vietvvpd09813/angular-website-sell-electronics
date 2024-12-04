import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3001/v1/api/admin/cart';  // URL của API Cart bên server

  constructor(private http: HttpClient) { }

  // Lấy tất cả sản phẩm trong giỏ hàng của người dùng
  getCartItems(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);  // Đảm bảo rằng API của server nhận được userId từ URL
  }

  // Lấy giỏ hàng theo productId và userId
  getCartByProductId(userId: number, productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);  // API findById
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(userId: number, productId: number, quantity: number): Observable<any> {
    const cartData = {
      userId: userId,
      productId: productId,
      quantity: quantity
    };
    return this.http.post<any>(`${this.apiUrl}`, cartData);  // Sử dụng POST cho endpoint create
  }

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItem(userId: number, productId: number, quantity: number): Observable<any> {
    const cartData = { quantity: quantity };
    return this.http.put<any>(`${this.apiUrl}/${productId}`, cartData);  // API update
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);  // API deleteCart
  }

  // Xóa tất cả sản phẩm trong giỏ hàng của người dùng
  clearCart(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/clear/${userId}`);  // API deleteCart (clear toàn bộ giỏ)
  }
}
