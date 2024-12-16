import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderItemService {
  private apiUrl = 'http://localhost:3001/v1/api/admin/orderItem'; // URL của API

  constructor(private http: HttpClient) {}

  // Lấy tất cả sản phẩm (OrderItem)
  getAllOrderItems(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // Lấy chi tiết của OrderItem theo ID
  getOrderItemById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Tạo OrderItem mới
  createOrderItem(orderId: number, items: any): Observable<any> {
    const orderItemData = {
      orderId: orderId,
      body: items,
    };

    return this.http.post<any>(this.apiUrl, orderItemData);
  }
}
