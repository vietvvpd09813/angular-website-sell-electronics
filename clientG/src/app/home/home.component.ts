import { Component, OnInit,OnChanges,OnDestroy,DoCheck,SimpleChanges } from '@angular/core';
import { SliderComponent } from '../component/slider/slider.component';
import { RouterOutlet } from '@angular/router';
import { StatisticalComponent } from '../component/statistical/statistical.component';
import { HomeProductListComponent } from '../component/home-product-list/home-product-list.component';
import { BannerComponent } from '../component/banner/banner.component';
import { ProducthotComponent } from '../component/producthot/producthot.component';
import { CommonModule } from '@angular/common';
import { ProductnewComponent } from '../component/productnew/productnew.component';
import { ListproductnewComponent } from "../component/listproductnew/listproductnew.component";
import { OrderComponent } from '../component/order/order.component';
import { AnimastaComponent } from "../component/animasta/animasta.component";


@Component({
  selector: 'home',
  standalone: true,
  imports: [RouterOutlet, SliderComponent, StatisticalComponent,AnimastaComponent, HomeProductListComponent, BannerComponent, ProducthotComponent, StatisticalComponent, CommonModule, ProductnewComponent, ListproductnewComponent, OrderComponent, AnimastaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnChanges, DoCheck, OnDestroy {
  name: String = "Tuan Dev";
  handleClick() {
    this.name = "Doan Thanh Tuấn";
  }
 ngOnInit(): void {//chỉ gọi 1 lần, gọi khi khởi tạo
  //  alertHomePage();
  console.log('ngOnInit');
 }
 ngOnChanges(changes: SimpleChanges): void {//nếu input thay đổi thì gọi onChange
  console.log('ngOnChanges');
 }
 ngDoCheck(): void { //gọi khi phát hiện thay đổi dữ liệu
  console.log('ngDoCheck');
 }
 ngOnDestroy(): void {//gọi khi component bị xóa
  console.log('ngOnDestroy');
 }
}
