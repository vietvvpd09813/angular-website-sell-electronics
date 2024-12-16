import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = 'http://localhost:3001/v1/api/admin/categories';

  constructor(private http: HttpClient) {}

  // Lấy tất cả danh mục
  getAllCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Lấy danh mục theo ID
  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Thêm danh mục
  addCategory(name: string, image: string): Observable<any> {
    const categoryData = {
      name: name,
      image: image,
    };

    return this.http.post<any>(this.apiUrl, categoryData);
  }

  // Cập nhật danh mục
  updateCategory(id: number, name: string, image: string): Observable<any> {
    const categoryData = {
      name: name,
      image: image,
    };

    return this.http.put<any>(`${this.apiUrl}/${id}`, categoryData);
  }

  // Xoá danh mục
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Kiểm tra xem có sản phẩm nào liên kết với danh mục này không
  checkProductsByCategory(id: number): Observable<any> {
    const checkUrl = `${this.apiUrl}/${id}`;
    return this.http.get<any>(checkUrl);
  }
}
