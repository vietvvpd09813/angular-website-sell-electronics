import { Component, OnInit } from '@angular/core';
import { ProductnewComponent } from '../productnew/productnew.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../sevice/product.service';


@Component({
  selector: 'app-listproductnew',
  standalone: true,
  imports: [ProductnewComponent,CommonModule],
  templateUrl: './listproductnew.component.html',
  styleUrl: './listproductnew.component.css'
})
export class ListproductnewComponent implements OnInit {

Listproductnew : any = [];
list2: any = [];
categoryId : number = 1;
constructor(private ProductService : ProductService){}
ngOnInit(): void {
  this.ProductService.getProductsByCategoryId(this.categoryId).subscribe(
    (data : any[])=>{
      this.Listproductnew = data;
      this.list2 = this.Listproductnew.data;

    }
  )
}


}
