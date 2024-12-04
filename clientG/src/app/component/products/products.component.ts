import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsITEMComponent } from '../products-item/products-item.component';
import { ProductService } from '../../sevice/product.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [  CommonModule, ProductsITEMComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
 products : any[] = [];
 constructor ( private ProductService:ProductService){}
 ngOnInit(): void {
   this.getAllProduct();
 }
 getAllProduct():void{
  this.ProductService.getAllProducts().subscribe((reponse:any)=>{
    this.products = reponse.data

    let ok = this.products
    console.log("ok",ok);

  })
 }

}





