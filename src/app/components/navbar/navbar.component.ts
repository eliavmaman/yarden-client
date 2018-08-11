import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Authervice} from "../../services/auth.service";
import {GlobalService} from "../../services/global.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isLoggedIn = false;
    isAdmin = false;
    numberOgUsers: string = "0";
    basket: any = {products: [], total: 0, totalItems: 0};

    constructor(public router: Router, private auth: Authervice, private service: GlobalService) {
        this.isLoggedIn = this.auth.getUser() ? true : false;
        let user = this.auth.getUser();
        if (user) {
            this.isAdmin = user.role == 'admin'
        }
        //this.numberOgUsers = this.service.getNumOfUsers;

    }

    ngOnInit() {
        this.service.onProductAddCallback$.subscribe(data => {
            this.basket = data;
        });

        //this.numberOgUsers= this.service.getNumOfUsers;
        this.service.onUserLoggedCallback$.subscribe(data => {
            this.numberOgUsers = data;
        });
    }

    logout() {
        localStorage.removeItem('user');
        this.router.navigateByUrl('login');
    }

    // onLogoutClick(){
    //
    //   this.router.navigate(['/login']);
    //   return false;
    // }
}
