import { ProductService } from './../../sevice/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editproduct',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // Import các module cần thiết
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  productForm: FormGroup;
  productId: number = 0;
  categories: any[] = [];  // Danh sách các danh mục sản phẩm

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Khởi tạo form với các control tương ứng
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      categoryName: ['', Validators.required],
      image1: ['', Validators.required],
      image2: ['', Validators.required],
      image3: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    // Lấy id sản phẩm từ URL
    this.route.params.subscribe(params => {
      this.productId = +params['id'];  // Lấy id từ URL
      this.loadProductData();  // Tải dữ liệu sản phẩm
      this.loadCategories();  // Tải danh mục
    });
  }

  // Lấy dữ liệu sản phẩm theo ID
  loadProductData(): void {
    this.productService.getProductById(this.productId).subscribe(
      (data) => {
        console.log('data product',data);

        // Cập nhật dữ liệu vào form
        this.productForm.patchValue({
          name: data.data.name,
          price: data.data.price,
          description: data.data.description,
          categoryId: data.data.categoryId,
          categoryName: data.data.category.name,
          image1: data.data.image1,
          image2: data.data.image2,
          image3: data.data.image3
        });
      },
      (error) => {
        console.error('Error loading product:', error);
      }
    );
  }

  // Lấy danh mục sản phẩm
  loadCategories(): void {
    this.productService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  // Phương thức cập nhật sản phẩm
  updateProduct(): void {
    if (this.productForm.valid) {
      const updatedProduct = this.productForm.value;
      this.productService.updateProduct(
        this.productId,
        updatedProduct.name,
        updatedProduct.price,
        updatedProduct.image1,
        updatedProduct.image2,
        updatedProduct.image3,
        updatedProduct.description,
        updatedProduct.categoryId
      ).subscribe(
        (response) => {
          console.log('Product updated successfully:', response);
          // Sau khi cập nhật, điều hướng về danh sách sản phẩm
          this.router.navigate(['/admin/adproduct']);
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }

  // Phương thức hủy
  cancel(): void {
    this.router.navigate(['/admin/adproduct']);
  }
}
