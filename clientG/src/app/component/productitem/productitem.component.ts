import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productitem',
  standalone: true,
  imports: [RouterLink,CommonModule ],
  templateUrl: './productitem.component.html',
  styleUrl: './productitem.component.css'
})
export class ProductitemComponent {
  @Input() name ='';
  @Input() id ='';
  @Input() price = 0;
  @Input( ) image1 = '';
}
