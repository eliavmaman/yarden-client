import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {Authervice} from "../../services/auth.service";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    basket = {
        products: [],
        totalItems: [],
        total: 0
    };

    order = {
        user: '',
        products: [],
        price: 0,
        order_date: new Date(),
        card_digits: '',
        is_bitcoin: false
    };
    rate: number = 0;

    total = 0;
    user: any;

    constructor(private service: GlobalService, private auth: Authervice) {
        this.user = this.auth.getUser();
        this.order.user = this.user._id;
    }


    ngOnInit() {
        this.basket = this.service.getBasket;
        if (this.basket)
            this.total = this.basket.total;
        this.service.getBitcoinRate().subscribe((res: any) => {
            this.rate = res.bpi.USD.rate_float;
        });
        // this.service.onProductAddCallback$.subscribe(data => {
        //     this.basket = data;
        // });

    }

    pay() {
        this.order.products = this.basket.products;
        this.order.price = this.total;
        this.order.order_date = new Date();
        this.service.createOrders(this.order).subscribe((res: any) => {
            alert("Order created successfully");
        })
    };


    onBitcoinPressed() {
        this.order.is_bitcoin = !this.order.is_bitcoin;


        if (this.order.is_bitcoin) {
            this.total = this.basket.total / this.rate;
        } else {
            this.total = this.basket.total;
        }


    }


}
