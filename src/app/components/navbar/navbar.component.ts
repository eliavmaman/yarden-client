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
    basket:any={};
    constructor(public router: Router, private auth: Authervice,private service: GlobalService) {
        this.isLoggedIn=this.auth.getUser()?true:false;

    }

    ngOnInit() {
        this.service.onProductAddCallback$.subscribe(data => {
           // this.zone.run(() => {
                this.basket= data;
            //});
        })
    }

    // onLogoutClick(){
    //
    //   this.router.navigate(['/login']);
    //   return false;
    // }
}
