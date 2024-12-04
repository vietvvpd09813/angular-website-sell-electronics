import { ProductService } from './../../sevice/product.service';
import { CartService } from './../../sevice/cart.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Khai báo hàm end22 từ file bên ngoài
declare function end22(): void;

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, AfterViewInit {
  userId: number = 0;
  product: any = {};  // Biến lưu thông tin chi tiết sản phẩm
  productId: number = 0;  // Biến lưu ID sản phẩm từ URL

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService  // Inject CartService
  ) { }

  ngOnInit(): void {
    // Lấy ID sản phẩm từ URL
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id')!;  // Lấy ID từ URL và chuyển thành số
      this.getProductDetail(this.productId);  // Lấy chi tiết sản phẩm theo ID
    });
  }

  ngAfterViewInit(): void {
    end22();
  }

  // Hàm lấy thông tin chi tiết sản phẩm từ API
  getProductDetail(id: number): void {
    this.productService.getProductById(id).subscribe(
      (response) => {
        this.product = response.data;
        console.log(this.product);  // Lưu thông tin chi tiết vào biến product
      },
      (error) => {
        console.error('Error fetching product details:', error);
        // Bạn có thể thêm logic xử lý lỗi ở đây
      }
    );
  }

  // Hàm xử lý thêm sản phẩm vào giỏ hàng
  addToCart(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert("Please log in to add items to the cart.");
      return;  // Nếu chưa đăng nhập thì thông báo và không thực hiện thao tác
    }
    this.userId = +userId;
    const productId = this.product.id;
    const quantity = 1;  // Giả sử mỗi lần thêm 1 sản phẩm vào giỏ
    console.log("Adding to cart", quantity, productId, this.userId);

    this.cartService.addToCart(this.userId, productId, quantity).subscribe(
      (response) => {
        console.log('Product added to cart', response);
        alert("Sản phẩm đã thêm vào giỏ hàng");  // Thông báo thêm sản phẩm thành công
      },
      (error) => {
        console.error('Error adding product to cart:', error);
        alert("Error adding product to cart. Please try again.");
      }
    );
  }
}
