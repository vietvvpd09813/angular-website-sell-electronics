import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../sevice/user-sevice.service'; // Đảm bảo tên import chính xác

@Component({
  selector: 'app-adminuser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})
export class AdminuserComponent implements OnInit {
  users: any = [];

  constructor(private userService: UserService) { } // Đảm bảo tên ở đây phải khớp với tên import

  ngOnInit(): void {
    this.loadUsers();
  }

  // Hàm để tải danh sách người dùng
  loadUsers(): void {
    this.userService.getAllData().subscribe((data: any) => {
      this.users = data;
    });
  }

  // Hàm thay đổi trạng thái isActive của người dùng
  changeUserStatus(userId: number, currentStatus: boolean): void {
    const newStatus = !currentStatus; // đảo ngược trạng thái
    this.userService.updateUserStatus(userId, newStatus).subscribe(
      (response) => {
        console.log('Trạng thái người dùng đã được cập nhật!', response);
        // Sau khi cập nhật thành công, tải lại danh sách người dùng
        this.loadUsers();
      },
      (error) => {
        console.error('Có lỗi khi cập nhật trạng thái người dùng!', error);
      }
    );
  }
}
