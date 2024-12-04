import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderComponent } from '../order/order.component';


@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [RouterLink,OrderComponent],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent {

}
