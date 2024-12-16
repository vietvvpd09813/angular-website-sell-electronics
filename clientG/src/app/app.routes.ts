import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ProductsComponent } from './component/products/products.component';
import { PagenotComponent } from './component/pagenot/pagenot.component';
import { DetailComponent } from './component/detail/detail.component';
import { RootComponent } from './root/root.component';
import { AdminComponent } from './admincomponent/admin/admin.component';
import { AdminuserComponent } from './admincomponent/adminuser/adminuser.component';
import { CartComponent } from './component/cart/cart.component';
import { PayComponent } from './component/pay/pay.component';
import { RegisterComponent } from './component/register/register.component';
import { ProductnewComponent } from './component/productnew/productnew.component';
import { OrderComponent } from './component/order/order.component';
import { TextComponent } from './admincomponent/text/text.component';
import { AdcategoryComponent } from './admincomponent/adcategory/adcategory.component';
import { AdproductComponent } from './admincomponent/adproduct/adproduct.component';
import { AdcommentComponent } from './admincomponent/adcomment/adcomment.component';
import { AdorderComponent } from './admincomponent/adorder/adorder.component';
import { CanActivate } from '@angular/router';
import { DashboardComponent } from './admincomponent/dashboard/dashboard.component';
import { AddProductsComponent } from './admincomponent/add-products/add-products.component';
import { FormAddCategoryComponent } from './admincomponent/form-add-category/form-add-category.component';
import { EditproductComponent } from './admincomponent/editproduct/editproduct.component';
import { EditcategoryComponent } from './admincomponent/editcategory/editcategory.component';
import { Loginlab48Component } from './admincomponent/loginlab48/loginlab48.component';
import { Categori35Component } from './admincomponent/categori35/categori35.component';
import { Createcategori35Component } from './admincomponent/createcategori35/createcategori35.component';
import { Editcategori35Component } from './admincomponent/editcategori35/editcategori35.component';
import { OrderDetailsComponent } from './admincomponent/order-details/order-details.component';
import { OrderEditComponent } from './admincomponent/order-edit/order-edit.component';
import { OrderdetailsComponent } from './component/orderdetails/orderdetails.component';


const canlogin: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return false;
};

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'lab12', component: Loginlab48Component },
  { path: 'register', component: RegisterComponent },
  { path: 'lab34', component: Categori35Component },
  { path: 'lab34add', component: Createcategori35Component },
  { path: 'lab34edit/:id', component: Editcategori35Component },
  {
    path: '',
    component: RootComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'products/:id', component: DetailComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'pay', component: PayComponent },
      { path: 'order', component: OrderComponent },
      { path: 'order2', component: OrderdetailsComponent },
      { path: 'productnew', component: ProductnewComponent },

      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    pathMatch: 'prefix',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'addproduct', component: AddProductsComponent },
      { path: 'addcategory', component: FormAddCategoryComponent },
      { path: 'users', component: AdminuserComponent },
      { path: 'text', component: TextComponent },
      { path: 'editproduct/:id', component: EditproductComponent },
      { path: 'editcategory/:id', component: EditcategoryComponent },
      { path: 'adcategory', component: AdcategoryComponent },

      { path: 'adproduct', component: AdproductComponent },
      { path: 'orderdetail/:id', component: OrderDetailsComponent },
      { path: 'orderedit/:id', component: OrderEditComponent },
      { path: 'adcomment', component: AdcommentComponent },
      { path: 'adorder', component: AdorderComponent },
    ],
  },

  { path: '**', component: PagenotComponent },
];
