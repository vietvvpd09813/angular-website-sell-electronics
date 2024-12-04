import { Component,OnInit } from '@angular/core';
declare function addorder():void;
@Component({
  selector: 'app-adorder',
  standalone: true,
  imports: [],
  templateUrl: './adorder.component.html',
  styleUrl: './adorder.component.css'
})
export class AdorderComponent implements OnInit {
 ngOnInit(): void {
   addorder()
 }
}
