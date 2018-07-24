import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";

declare var $: any;

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
    selctedProduct: any;
    selectedUser: any

    ngOnInit() {
        $('.modal').hide();
        // $('body').removeClass('modal-open');
         $('.modal-backdrop').remove();
        this.service.getCategories().subscribe((res) => {
            this.categories = res;
        });
        this.service.getProducts().subscribe((res) => {
            this.products = res;
        });
        this.service.getUsers().subscribe((res) => {
            this.users = res;
        });

    }


// CATEGORIES
    selectCat(cat: any) {
        this.selectedCat = cat;
    }

    deleteCat(cat:any){
        this.service.deleteCategories(cat).subscribe((res) => {
            this.ngOnInit();
        })
    }

    createCat() {
        this.service.createCategories(this.newCat).subscribe((res) => {
            this.ngOnInit();
        })
    }

    updateCategory() {
        this.service.updateCategory(this.selectProduct).subscribe((res) => {
            this.ngOnInit();
        })
    }



    // PRODUCTS
    selectProduct(p: any) {
        this.selctedProduct = p;
    }

    deleteProduct(p:any){
        this.service.deleteProducts(p).subscribe((res) => {
            this.ngOnInit();
        })
    }

    createProduct() {
        this.service.createProducts(this.newProduct).subscribe((res) => {
            this.ngOnInit();
        })
    }

    updateProduct() {
        this.service.updateProducts(this.selctedProduct).subscribe((res) => {
            this.ngOnInit();
        })
    }

    // USERS
    selectUser(u: any) {
        this.selectedUser = u;
    }

    deleteUser(u:any){
        this.service.deleteUser(u).subscribe((res) => {
            this.ngOnInit();
        })
    }

    createUser() {
        this.service.createUser(this.newUser).subscribe((res) => {
            this.ngOnInit();
        })
    }

    updateUser() {
        this.service.updateUser(this.selectedUser).subscribe((res) => {
            this.ngOnInit();
        })
    }




}
