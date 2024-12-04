import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './../../sevice/login.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

declare function loginaaa(): void;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  // Form group để quản lý form đăng ký (với các trường đã được thêm số "1")
  formRegisterGroup: FormGroup = new FormGroup({
    emailControl1: new FormControl(null, [
      Validators.required, // Email là bắt buộc
      Validators.email,    // Kiểm tra định dạng email
    ]),
    usernameControl1: new FormControl(null, [
      Validators.required,  // Tên người dùng là bắt buộc
      Validators.minLength(3), // Tên người dùng phải có ít nhất 3 ký tự
    ]),
    passwordControl1: new FormControl(null, [
      Validators.required, // Mật khẩu là bắt buộc
      Validators.minLength(6), // Mật khẩu phải có ít nhất 6 ký tự
    ]),
    confirmPasswordControl1: new FormControl(null, [
      Validators.required, // Xác nhận mật khẩu là bắt buộc
      Validators.minLength(6), // Mật khẩu phải có ít nhất 6 ký tự
    ]),
  });

  // Biến điều khiển form đăng nhập hay đăng ký
  isLoginForm: boolean = true; // Mặc định là form đăng nhập

  constructor(private loginService: LoginService, private router: Router) {}

  // Getter để lấy các controls trong form đăng nhập
  get loginFormControl() {
    return this.formLoginGroup.controls;
  }

  // Getter để lấy các controls trong form đăng ký (đã thay đổi tên trường)
  get registerFormControl() {
    return this.formRegisterGroup.controls;
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
          localStorage.setItem('userId',data.data.id)
          if (data.data.isActive) {
            if (data.data.role === 'admin') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/']);
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

  // Phương thức đăng ký
  register() {
    console.log('hi',this.formRegisterGroup.value);
    const username = this.formRegisterGroup.value.usernameControl1;
    const email = this.formRegisterGroup.value.emailControl1;
    const password = this.formRegisterGroup.value.passwordControl1;
    const password2 = this.formRegisterGroup.value.confirmPasswordControl1;
    if(password !== password2) {
      alert('mật khẩu không trùng nhau')
      return;
    }
    console.log(username, email, password);

    this.loginService.register(username, email, password).subscribe(
      (response: any) => {
        console.log('response',response);

        if (response) {
          alert('Đăng ký thành công! Bạn có thể đăng nhập ngay.');
          // Chuyển về form đăng nhập
          this.toggleForm();
        } else {
          alert('Đăng ký không thành công, vui lòng thử lại!');
        }
      },
      (error) => {
        alert('Đăng ký không thành công, vui lòng thử lại!');
      }
    );
  }

  // Phương thức chuyển đổi giữa form đăng nhập và đăng ký
  toggleForm() {
    this.isLoginForm = !this.isLoginForm;
  }
}
