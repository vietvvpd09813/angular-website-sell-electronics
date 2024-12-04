import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';  // Đảm bảo import Router từ @angular/router

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']  // Sửa lại styleUrl thành styleUrls
})
export class SidebarComponent {

  // Inject Router vào constructor để có thể sử dụng trong các hàm
  constructor(private router: Router) {}

  logout() {
    // Clear the tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('User logged out');

    // Navigate to the login page or any other route as required
    this.router.navigate(['/login']);  // Điều hướng đến trang đăng nhập
  }
}
