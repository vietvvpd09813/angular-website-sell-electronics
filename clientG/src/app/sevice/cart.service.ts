import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3001/v1/api/admin/cart';

  constructor(private http: HttpClient) { }

  // Lấy tất cả sản phẩm trong giỏ hàng của người dùng
  getCartItems(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  // Lấy giỏ hàng theo productId và userId
  getCartByProductId(userId: number, productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(userId: number, productId: number, quantity: number): Observable<any> {
    const cartData = {
      userId: userId,
      productId: productId,
      quantity: quantity
    };
    return this.http.post<any>(`${this.apiUrl}`, cartData);
  }


  updateCartItem(id: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, {quantity});
  }


  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


  clearCart(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteAll/${userId}`);
  }
}
