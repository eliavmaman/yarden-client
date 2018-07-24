import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    constructor(private service: GlobalService) {
    }

    newCat = {
        name: ''
    };

    newProduct = {
        name: '',
        price: '',
        category: '',
        image: ''
    };

    newUser = {
        email: '',
        password: ''

    };

    categories: any;
    products: any;
    users: any;
    selectedCat: any;
    selctedProd: any;
    selectedUser: any

    ngOnInit() {
        this.service.getCategories().subscribe((res) => {
            this.categories = res.data;
        });
        this.service.getProducts().subscribe((res) => {
            this.products = res.data;
        });
        this.service.getUsers().subscribe((res) => {
            this.users = res.data;
        });

    }

    selectCat(cat: any) {
        this.selectedCat = cat;
    }

    createCat() {
        this.service.createCategories(this.newCat).subscribe((res) => {
            this.ngOnInit();
        })
    }


    updtaeCat() {
        this.service.updateCategories(this.selectedCat).subscribe((res) => {
            this.ngOnInit();
        })
    }

}
