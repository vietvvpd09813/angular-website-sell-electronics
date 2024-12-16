import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: string | null = null; // Biến để lưu username

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUsername(); // Gọi phương thức khi component khởi tạo
  }

  // Hàm lấy username từ localStorage
  loadUsername(): void {
    // Lấy accessToken từ localStorage, giả sử username được lưu trong accessToken (hoặc ngược lại)
    const storedAccessToken = localStorage.getItem('accessToken');

    if (storedAccessToken) {
      try {
        const decodedToken: any = jwtDecode(storedAccessToken); // Giải mã accessToken
        // Giả sử 'username' là một phần của payload trong token
        console.log('decodedToken',decodedToken);

        this.username = decodedToken.username || 'Unknown';
        console.log('this.username',this.username);
        // Lấy username từ payload (nếu có)
      } catch (error) {
        console.error('Lỗi giải mã token:', error);
        this.username = 'Unknown'; // Nếu có lỗi, gán username là Unknown
      }
    } else {
      console.log('Không tìm thấy accessToken trong localStorage');
      this.username = 'Guest'; // Nếu không có token, gán username là 'Guest'
    }
  }


  // Hàm xử lý đăng xuất
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username'); // Xóa username khi đăng xuất
    this.router.navigate(['/login']); // Điều hướng về trang login
  }
}
