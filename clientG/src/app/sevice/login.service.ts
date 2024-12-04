import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlLogin = "http://localhost:3001/v1/api/auth/login";
  urlRegister = "http://localhost:3001/v1/api/auth/register";  // URL đăng ký người dùng

  constructor(private http: HttpClient) { }

  // Hàm đăng nhập
  login(email: string, password: string) {
    return this.http.post(this.urlLogin, { email, password });
  }

  // Hàm đăng ký
  register(username: string, email: string, password: string) {
    const user = { username, email, password };  // Tạo đối tượng user để gửi đến server
    return this.http.post(this.urlRegister, user);  // Gửi yêu cầu POST đến server
  }
}
