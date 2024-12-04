import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { AdcategoryComponent } from '../adcategory/adcategory.component';
import { AdcommentComponent } from '../adcomment/adcomment.component';
import { AdproductComponent } from '../adproduct/adproduct.component';
import { AdorderComponent } from '../adorder/adorder.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent,AdcategoryComponent,AdcommentComponent,AdproductComponent,AdorderComponent,DashboardComponent,AdcategoryComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
