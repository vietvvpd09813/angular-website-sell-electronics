import { Component,Input,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-products-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products-item.component.html',
  styleUrl: './products-item.component.css'
})
export class ProductsITEMComponent  implements OnInit {
  @Input() name ='';
  @Input() id = 0;
  @Input() price = 0;
  @Input( ) image1 = '';
  ngOnInit(): void {

  }
}
