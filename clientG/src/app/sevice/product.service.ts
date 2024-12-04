import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3001/v1/api/admin/products';  // API sản phẩm
  private categoryUrl = 'http://localhost:3001/v1/api/admin/categories';  // API danh mục sản phẩm

  constructor(private http: HttpClient) {}

  // Phương thức lấy tất cả sản phẩm
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);  // Trả về mảng sản phẩm
  }

  // Phương thức lấy sản phẩm theo ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);  // API lấy sản phẩm theo ID
  }

  // Phương thức lấy tất cả danh mục sản phẩm
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryUrl);  // Trả về mảng danh mục
  }

  // Phương thức thêm sản phẩm mới
  addProduct(
    name: string,
    price: number,
    image1: string,
    image2: string,
    image3: string,
    description: string,
    categoryId: number
  ): Observable<any> {
    const productData = {
      name: name,
      price: price,
      image1: image1,
      image2: image2,
      image3: image3,
      description: description,
      categoryId: categoryId,
    };

    return this.http.post<any>(this.apiUrl, productData);  // Gửi POST request
  }

  // Phương thức sửa sản phẩm
  updateProduct(
    id: number,
    name: string,
    price: number,
    image1: string,
    image2: string,
    image3: string,
    description: string,
    categoryId: number
  ): Observable<any> {
    const productData = {
      name: name,
      price: price,
      image1: image1,
      image2: image2,
      image3: image3,
      description: description,
      categoryId: categoryId,
    };

    return this.http.patch<any>(`${this.apiUrl}/${id}`, productData);  // Gửi PUT request để cập nhật sản phẩm
  }

  // Phương thức xoá sản phẩm theo ID
  deleteProduct(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);  // Gửi DELETE request để xoá sản phẩm
  }

  // Phương thức lấy sản phẩm theo ID danh mục
  getProductsByCategoryId(categoryId: number): Observable<any[]> {
    const url = `${this.apiUrl}/category/${categoryId}`;
    return this.http.get<any[]>(url);  // Trả về mảng sản phẩm của một danh mục cụ thể
  }
}
