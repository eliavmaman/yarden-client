import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from "@angular/router";

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';

import {GlobalService} from "./services/global.service";
import {ModalModule} from "ngx-bootstrap";
import * as $ from 'jquery';


import {NotificationsComponent} from './components/notifications/notifications.component';


import {HomeComponent} from './components/home/home.component';
//import {BookComponent} from "./components/book/book.component";
import {BooksComponent} from "./components/books/books.component";
//import {AddUpdateBookComponent} from "./components/add-update-book/add-update-book.component";
import {A2Edatetimepicker} from "ng2-eonasdan-datetimepicker";
import {TitlePipe} from './pipes/title/title.pipe';
import { ConfirmationModalComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {Authervice} from "./services/auth.service";
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import {AdminComponent} from "./components/admin/admin.component";
import { BasketComponent } from './components/basket/basket.component';
import { OrderComponent } from './components/order/order.component';
//import { AdminComponent } from './admin/admin.component';


const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'basket', component: BasketComponent},
    {path: 'order', component: OrderComponent},

];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        NotificationsComponent,
       // BookComponent,
        BooksComponent,
        HomeComponent,
        //AddUpdateBookComponent,
        TitlePipe,
        ConfirmationModalComponent,
        LoginComponent,
        SignupComponent,
        ProductsComponent,
        CategoriesComponent,
        CartComponent,
        AdminComponent,
        BasketComponent,
        OrderComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        ModalModule.forRoot(),
        A2Edatetimepicker
    ],
    providers: [
        GlobalService,
        Authervice
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
