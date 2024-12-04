import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:3001/v1/api/admin/users";

  constructor(private httpService: HttpClient) { }

  // Lấy tất cả dữ liệu người dùng
  getAllData() {
    return this.httpService.get(this.url);
  }

  // Cập nhật trạng thái isActive của người dùng
  updateUserStatus(userId: number, isActive: boolean): Observable<any> {
    const updateData = {
      isActive: isActive
    };

    return this.httpService.patch(`${this.url}/${userId}`, updateData);
  }
}
