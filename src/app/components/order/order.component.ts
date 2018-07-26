import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
    order = {
        user: '',
        products: {products:[]},
        price: 0,
        order_date: new Date(),
        card_digits: '',
        is_bitcoin: false
    };
    rate: number = 0;

    total=0;

    constructor(private service: GlobalService,) {
    }

    busket: any;

    ngOnInit() {
        this.order.products = this.service.getBasket;
        this.service.getBitcoinRate().subscribe((res:any) => {
            this.rate = res.bpi.USD.rate_float;
        });

        // Array.prototype.sum = function (prop) {
        //     let total = 0
        //     for ( var i = 0, _len = this.length; i < _len; i++ ) {
        //         total += this[i][prop]
        //     }
        //     return total
        // }
    }

    pay() {

    }
    onBitcoinPressed(){
        this.order.is_bitcoin = !this.order.is_bitcoin;
        let sum=0;
        if(this.order.products.products){
            this.order.products.products.forEach((p)=>{
                sum+=p.price;
            });
            //let sum=this.order.products.products.sum('price');
            if(this.order.is_bitcoin ){
                this.total=this.rate/sum;
            }
        }

    }



}
