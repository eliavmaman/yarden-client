import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    email = '';
    password = '';

    signup() {
        this.service.signup(this.email, this.password).subscribe(data => {

            this.router.navigateByUrl('');
        });
    }

    constructor(private service: GlobalService,private router: Router) {
    }

    ngOnInit() {
    }

}
