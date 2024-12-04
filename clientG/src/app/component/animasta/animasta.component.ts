import { Component, OnInit } from '@angular/core';
import { AnimastaitemComponent } from '../animastaitem/animastaitem.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../sevice/product.service';

@Component({
  selector: 'app-animasta',
  standalone: true,
  imports: [AnimastaitemComponent,CommonModule],
  templateUrl: './animasta.component.html',
  styleUrl: './animasta.component.css'
})
export class AnimastaComponent implements OnInit{

list12 : any = [];
list22: any = [];
categoryId : number = 5;
constructor(private ProductService : ProductService){}
ngOnInit(): void {
  this.ProductService.getProductsByCategoryId(this.categoryId).subscribe(
    (data : any[])=>{
      this.list12 = data;
      this.list22 = this.list12.data;
      console.log("newdlkasgdlkasgdgsa112",this.list22);


    }
  )
}





}
