import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productnew',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productnew.component.html',
  styleUrl: './productnew.component.css',
})
export class ProductnewComponent {
  @Input() name = '';
  @Input() price = 0;
  @Input() image1 = '';
}
