import {Component, OnInit} from '@angular/core';
import {ViewChild} from "@angular/core";
import {NotificationsComponent} from "../notifications/notifications.component";
import {GlobalService} from "../../services/global.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    @ViewChild('notification') notification: NotificationsComponent;
    addedSuccess: boolean = false;
    products: any[];
    selectedProduct: any;


    alertType: string;
    alertMessage: string;
    alertClass: string;
    card:any;

    constructor(private service: GlobalService) {
    }

    ngOnInit() {

        this.service.getProducts().subscribe((res) => {
            this.products = res;
        });

    }

    addProduct(p: any) {
        this.service.addProductToBasket(p);
        this.addedSuccess = true;
        setTimeout(() => this.addedSuccess = false, 2000);

    }

}
