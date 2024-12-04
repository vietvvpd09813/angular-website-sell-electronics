import { CommonModule } from '@angular/common';
import { Component ,Input } from '@angular/core';

@Component({
  selector: 'app-animastaitem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animastaitem.component.html',
  styleUrl: './animastaitem.component.css'
})
export class AnimastaitemComponent {
  @Input() name = '';
  @Input() price = 0;
  @Input() image1 = '';

}
