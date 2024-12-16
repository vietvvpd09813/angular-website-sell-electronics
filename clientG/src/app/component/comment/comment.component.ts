import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommentService } from '../../sevice/comment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../sevice/user-sevice.service';
@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnChanges {
  @Input() productId: number = 1;
  comments: any[] = [];
  userId: number | null = null;
  newCommentText: string = '';
  users: any[] = [];
  name11: string = '';

  constructor(
    private commentService: CommentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserId();
    this.loadUsers();
    this.loadComments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] && !changes['productId'].firstChange) {
      this.loadComments(); // Khi productId thay đổi, tải lại comments
    }
  }

  // Lấy userId từ localStorage
  loadUserId(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const parsedUserId = parseInt(storedUserId, 10);
      if (!isNaN(parsedUserId)) {
        this.userId = parsedUserId;
      } else {
        console.error('ID người dùng không hợp lệ!');
      }
    } else {
      console.error('Không tìm thấy ID người dùng trong localStorage!');
    }
  }

  // Lấy danh sách người dùng
  loadUsers(): void {
    this.userService.getAllData().subscribe(
      (data: any) => {
        this.users = data.data;
        // console.log('Danh sách người dùng:', this.users);
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  getUserNameById(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.name11 = user.username;
      // console.log(`Tên người dùng cho userId: ${userId} là ${this.name11}`);
      return user.name;
    } else {
      console.log(`Không tìm thấy người dùng với userId: ${userId}`);
      return 'Anonymous';
    }
  }

  // Lấy tất cả reviews cho productId cụ thể
  loadComments(): void {
    this.commentService.getAllReviews(this.productId).subscribe(
      (response) => {
        this.comments = response.data;
      },
      (error) => {
        console.error('Error loading comments:', error);
      }
    );
  }

  // Gửi bình luận mới (Review)
  postComment(): void {
    if (this.userId && this.newCommentText.trim()) {
      this.commentService.createReview(this.productId, this.userId, this.newCommentText).subscribe(
        (response) => {
          if (response.status === 200 && response.review) {
            this.comments.push(response.review);  // Thêm bình luận mới vào mảng comments

            // Làm trống nội dung nhập vào sau khi tạo bình luận
            this.newCommentText = '';
          } else {
            console.error('Server did not return a valid review.');
          }
        },
        (error) => {
          console.error('Error posting comment:', error);
        }
      );
    } else {
      console.error('Không có userId hoặc nội dung bình luận trống!');
    }
  }

  // Chỉnh sửa bình luận
  editComment(comment: any): void {
    comment.editing = true;
  }

  // Lưu bình luận đã chỉnh sửa
  saveComment(comment: any): void {
    if (this.userId && comment.text.trim()) {
      this.commentService.updateReview(comment.id, comment.text).subscribe(
        (response) => {
          comment.editing = false; // Tắt chế độ chỉnh sửa
        },
        (error) => {
          console.error('Error updating comment:', error);
        }
      );
    } else {
      console.error('Nội dung bình luận không hợp lệ!');
    }
  }

  // Hủy chỉnh sửa
  cancelEdit(comment: any): void {
    comment.editing = false; // Hủy chế độ chỉnh sửa
  }
}
