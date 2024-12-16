import { Component, OnInit, NgZone } from '@angular/core';
import { CommentService } from '../../sevice/comment.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';  // Import ChangeDetectorRef



@Component({
  selector: 'app-adcomment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adcomment.component.html',
  styleUrls: ['./adcomment.component.css']
})
export class AdcommentComponent implements OnInit {
  comments: any[] = [];
  users: any[] = [];
  name11: string = '';

  constructor(
    private commentService: CommentService,
    private cdr: ChangeDetectorRef


  ) {}

  ngOnInit(): void {
    this.loadComments();

  }

  // Lấy tất cả bình luận
  loadComments(): void {
    this.commentService.getAllComments().subscribe(
      (response) => {
        this.comments = response.data;
        console.log("comments",this.comments);

      },
      (error) => {
        console.error('Error loading comments:', error);
      }
    );
  }



  // Xác nhận xóa bình luận
  confirmDelete(id: number): void {
    const isConfirmed = window.confirm('bạn có muốn xoá bình luận?');
    if (isConfirmed) {
      this.deleteComment(id);
    }
  }

  // Xóa bình luận
  deleteComment(id: number): void {
    this.commentService.deleteComment(id).subscribe(
      (response) => {
        if (response.status === 200) {
          // Sử dụng NgZone để yêu cầu Angular cập nhật giao diện
          this.loadComments();
          this.cdr.detectChanges();
        }
      },
      (error) => {
        console.error('Error deleting comment:', error);
      }
    );
  }
}
