import { Component, OnInit } from '@angular/core';
declare function  hello():void

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent  {
 ngOnInit(): void {
   hello();
 }
}
