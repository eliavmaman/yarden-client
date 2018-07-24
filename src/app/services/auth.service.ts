import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import {Observable} from "rxjs/Observable";

import "rxjs/Rx";
import {Subject} from "rxjs/Subject";
import {Book} from "../models/Book";
import {Http, Response} from "@angular/http";


@Injectable()
export class Authervice {


    constructor(private http: Http) {

    }

    setUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
        if (localStorage.user) {
            return JSON.parse(localStorage.getItem('user'))
        }
        return null
    }
}
