import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../sevice/product.service';
import { CartService } from './../../sevice/cart.service';
import { CommonModule } from '@angular/common';
import { DetailListComponent } from '../detail-list/detail-list.component';
import { CommentComponent } from '../comment/comment.component';


declare function end22(): void;

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, DetailListComponent, CommentComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, AfterViewInit {
  userId: number = 0;
  product: any = {};
  productlist: any[] = [];
  filteredProductList: any[] = [];
  productId: number = 0;
  categoryId: number = 0; // Thêm thuộc tính categoryId

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id')!;
      this.getProductDetail(this.productId);
      console.log("productId",this.productId);

    });
    this.getAllProducts();
  }

  ngAfterViewInit(): void {
    end22();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe((response: any) => {
      this.productlist = response.data;
      // Lọc danh sách sản phẩm theo danh mục
      this.filteredProductList = this.productlist.filter(product => product.categoryId === this.categoryId);
    });
  }

  getProductDetail(id: number): void {
    this.productService.getProductById(id).subscribe(
      (response) => {
        this.product = response.data;
        this.categoryId = this.product.categoryId; // Lưu categoryId của sản phẩm chi tiết
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  addToCart(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("Please log in to add items to the cart.");
      return;
    }
    this.userId = +userId;
    const productId = this.product.id;
    const quantity = 1;

    this.cartService.addToCart(this.userId, productId, quantity).subscribe(
      (response) => {
        console.log('Product added to cart', response);
        alert("Sản phẩm đã thêm vào giỏ hàng");
      },
      (error) => {
        console.error('Error adding product to cart:', error);
        alert("Error adding product to cart. Please try again.");
      }
    );
  }
}
