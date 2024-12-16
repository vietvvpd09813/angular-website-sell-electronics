import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:3001/v1/api/admin';

  constructor(private http: HttpClient) {}

  // Lấy tất cả các bình luận (comments)
  getAllComments(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/review`);
  }

  // Lấy tất cả reviews của sản phẩm theo productId
  getAllReviews(productId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/review/${productId}`);
  }

  // Thêm bình luận mới
  createReview(
    productId: number,
    userId: number,
    text: string
  ): Observable<any> {
    const reviewData = {
      productId: productId,
      userId: userId,

      text: text,
    };

    return this.http.post<any>(`${this.apiUrl}/review`, reviewData);
  }

  // Cập nhật review
  updateReview(id: number, text: string): Observable<any> {
    const reviewData = {
      text: text,
    };

    return this.http.put<any>(`${this.apiUrl}/review/${id}`, reviewData);
  }

  // Xóa comment
  deleteComment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/review/${id}`);
  }
}
