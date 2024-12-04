import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../../sevice/login.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

declare function loginaaa(): void;

@Component({
  selector: 'app-loginlab48',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loginlab48.component.html',
  styleUrls: ['./loginlab48.component.css']
})
export class Loginlab48Component implements OnInit {

  ngOnInit(): void {
    loginaaa(); // Có thể dùng để thực thi một hàm JavaScript riêng ngoài Angular
  }

  // Form group để quản lý form đăng nhập
  formLoginGroup: FormGroup = new FormGroup({
    emailControl: new FormControl(null, [
      Validators.required, // Email là bắt buộc
      Validators.email,    // Kiểm tra định dạng email
      Validators.minLength(5), // Đảm bảo email có ít nhất 5 ký tự
    ]),
    passwordControl: new FormControl(null, [
      Validators.required,  // Mật khẩu là bắt buộc
      Validators.minLength(6), // Mật khẩu phải có ít nhất 6 ký tự
    ]),
  });

  constructor(private loginService: LoginService, private router: Router) {}

  // Getter để lấy các controls trong form đăng nhập
  get loginFormControl() {
    return this.formLoginGroup.controls;
  }

  // Phương thức đăng nhập
  async login() {
    if (this.formLoginGroup.invalid) {
      console.log('Form đăng nhập không hợp lệ');
      return;
    }

    const email = this.formLoginGroup.value.emailControl;
    const password = this.formLoginGroup.value.passwordControl;

    this.loginService.login(email, password).subscribe(
      (data: any) => {
        console.log('da, dtaa loginm', data);

        if (data.status === 200) {
          localStorage.setItem('accessToken', data.data.accessToken);
          localStorage.setItem('refreshToken', data.data.refreshToken);
          localStorage.setItem('userId', data.data.id);
          if (data.data.isActive) {
            if (data.data.role === 'admin') {
              this.router.navigate(['lab34']);
            } else {
              this.router.navigate(['/lab34']);
            }
          } else {
            alert('Tài khoản của bạn đã bị khóa.');
          }
        } else {
          alert('Thông tin đăng nhập không chính xác!');
        }
      },
      (error) => {
        alert('Đăng nhập không thành công, vui lòng kiểm tra lại thông tin!');
      }
    );
  }
}
