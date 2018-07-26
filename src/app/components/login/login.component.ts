import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {Router} from "@angular/router";
import {Authervice} from "../../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email = '';
    password = '';

    login() {
        this.service.signin(this.email, this.password).subscribe((res:any) => {
            if(res.email=='y@p.com'){
                res.role='admin';
            }
            this.auth.setUser(res);
            this.router.navigateByUrl('home');
        });
    }

    constructor(private service: GlobalService, private auth: Authervice, private router: Router) {
    }

    ngOnInit() {

    }

}
