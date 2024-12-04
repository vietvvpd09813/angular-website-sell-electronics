import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

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
