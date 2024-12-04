import { Component, OnInit  } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SliderComponent } from './component/slider/slider.component';
import { StatisticalComponent } from './component/statistical/statistical.component';
import { LoginComponent } from './component/login/login.component';
import { ProductsComponent } from './component/products/products.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent,HeaderComponent,FooterComponent,SliderComponent,StatisticalComponent,LoginComponent,ProductsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular10';
  constructor(private router: Router) {}
  ngOnInit() {
    // Lắng nghe sự kiện NavigationEnd và cuộn trang lên đầu khi đường dẫn thay đổi
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);  // Cuộn trang lên đầu (0, 0)
    });
  }
}



