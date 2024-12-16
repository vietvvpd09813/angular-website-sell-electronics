import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-list',
  standalone: true,
  imports: [],
  templateUrl: './detail-list.component.html',
  styleUrl: './detail-list.component.css'
})
export class DetailListComponent implements OnInit {
  @Input() name ='';
  @Input() id = 0;
  @Input() price = 0;
  @Input( ) image1 = '';
  ngOnInit(): void {

  }
}
