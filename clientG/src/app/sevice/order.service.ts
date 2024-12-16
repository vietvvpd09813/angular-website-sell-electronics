import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  // Địa chỉ API của server
  private apiUrl = 'http://localhost:3001/v1/api/admin/order';

  constructor(private http: HttpClient) {}

  // Lấy tất cả đơn hàng của người dùng
  getOrdersByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  // Lấy tất cả đơn hàng (Admin)
  getAllOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // Tạo đơn hàng mới
  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderData);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    const statusData = { status };  // Tạo đối tượng status
    return this.http.patch<any>(`${this.apiUrl}/${orderId}`, statusData);  // Sử dụng PATCH để cập nhật trạng thái
  }

  // Cập nhật đơn hàng (thông tin khác)
  updateOrder(orderId: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${orderId}`, updatedData);
  }
}
