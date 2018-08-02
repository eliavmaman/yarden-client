import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {Subject} from "rxjs/Subject";
import {Book} from "../models/Book";
import {Http, Response, Headers} from "@angular/http";
import * as io from 'socket.io-client';

import * as _ from "lodash"


@Injectable()
export class GlobalService {

    onProductAddCallback: Subject<any> = new Subject<any>();
    onProductAddCallback$ = this.onProductAddCallback.asObservable();

    onUserLoggedCallback: Subject<any> = new Subject<any>();
    onUserLoggedCallback$ = this.onUserLoggedCallback.asObservable();

    private socket: SocketIOClient.Socket; // The client instance of socket.io
    private bookSubject = new Subject<any>();

    private books: Book[] = [
        {
            "id": 1,
            "author": "Dante Alighieri",
            "title": "the Divine Comedy",
            "date": new Date()
        },
        {
            "id": 2,
            "author": "Chinua Achebe",
            "title": "Things Fall Apart ",
            "date": new Date()
        },
        {
            "id": 3,
            "author": "Hans Christian Andersen",
            "title": '@@THIS is a BooK!!',
            "date": new Date()
        }
    ];


    private productsInBusket: any = {
        products: [],
        total: 0
    };

    numOfusers: string = "0";

    constructor(private http: Http) {
        this.socket = io('http://localhost:3000/');

        this.socket.on('userLoggedin', (numOfusers: any) => {
            this.onUserLoggedCallback.next(numOfusers);
            //    this.numOfusers = numOfusers;
        });
    }

    getBooks(): Observable<Book[]> {

        return Observable.of(this.books);
    }

    deleteBook(book: Book) {

        let index = this.books.findIndex(x => x.id == book.id);

        if (index > -1) {
            this.books.splice(index, 1);


            this.bookSubject.next({books: this.books});
        }
    }

    booksListOnUpdate(): Observable<Book[]> {
        return this.bookSubject.asObservable();
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

    get getBasket() {
        return this.productsInBusket;
    }

    get getNumOfUsers() {
        return this.numOfusers;
    }


    removeFromBusket(p: any) {
        let founded: any = _.find(this.productsInBusket.products, (fp) => {
            return fp._id.toString() == p._id.toString();
        });

        if (founded) {
            this.productsInBusket.products.splice(founded, 1);
            this.productsInBusket.total = this.getTotalBasket();
            this.onProductAddCallback.next(this.productsInBusket);
        }
    }

    addProductToBasket(p) {
        let founded: any = _.find(this.productsInBusket.products, (fp) => {
            return fp._id.toString() == p._id.toString();
        });

        if (founded) {
            founded.count++;
        } else {
            p.count = 1;
            this.productsInBusket.products.push(p);
        }

        this.productsInBusket.totalItems = this.getTotalItemsBasket();
        this.productsInBusket.total = this.getTotalBasket();
        this.onProductAddCallback.next(this.productsInBusket);
    }

    private getTotalItemsBasket() {
        let sum = 0;
        this.productsInBusket.products.forEach((bp) => {
            sum += bp.count;
        });
        return sum;
    }

    private getTotalBasket() {
        let sum = 0;
        this.productsInBusket.products.forEach((bp: any) => {
            sum += bp.price * bp.count;
        });
        return sum;
    }

    signup(email, password) {

        var data = {email: email, password: password};
        return this.http.post('http://localhost:3000/api/register', data).map(res => res.json());

    }

    emitEventOnLoggedIn() {
        this.socket.emit('userLoggedin');
    }

    signin(email, password) {

        var data = {email: email, password: password};
        return this.http.post('http://localhost:3000/api/login', data).map(res => res.json());
    }

    // CATEGORIES
    getCategories() {
        return this.http.get('http://localhost:3000/api/categories').map(res => res.json());
    }

    createCategories(c: any) {
        return this.http.post('http://localhost:3000/api/categories', c).map(res => res.json());
    }

    updateCategory(c: any) {
        return this.http.put('http://localhost:3000/api/categories/' + c._id, c).map(res => res.json());
    }

    deleteCategories(c: any) {
        return this.http.delete('http://localhost:3000/api/categories/' + c._id, c).map(res => res.json());
    }


    //PRODUCTS
    getProducts() {
        return this.http.get('http://localhost:3000/api/products').map(res => res.json());
    }

    createProducts(c: any) {
        return this.http.post('http://localhost:3000/api/Products', c).map(res => res.json());
    }

    updateProducts(c: any) {
        return this.http.put('http://localhost:3000/api/Products/' + c._id, c).map(res => res.json());
    }

    deleteProducts(c: any) {
        return this.http.delete('http://localhost:3000/api/Products/' + c._id, c).map(res => res.json());
    }


    //USERS
    getUsers() {
        return this.http.get('http://localhost:3000/api/Users').map(res => res.json());
    }

    getUserOrders(id: any) {
        return this.http.get('http://localhost:3000/api/Users/' + id + '/orders').map(res => res.json());
    }

    createUser(c: any) {
        return this.http.post('http://localhost:3000/api/Users', c).map(res => res.json());
    }

    updateUser(c: any) {
        return this.http.put('http://localhost:3000/api/Users/' + c._id, c).map(res => res.json());
    }

    deleteUser(c: any) {
        return this.http.delete('http://localhost:3000/api/Users/' + c._id, c).map(res => res.json());
    }

    //ORDERS
    getOrders(id) {
        return this.http.get('http://localhost:3000/api/Orders/').map(res => res.json());
    }

    createOrders(c: any) {
        return this.http.post('http://localhost:3000/api/Orders', c).map(res => res.json());
    }

    updateOrders(c: any) {
        return this.http.put('http://localhost:3000/api/Orders/' + c._id, c).map(res => res.json());
    }

    deleteOrders(c: any) {
        return this.http.delete('http://localhost:3000/api/Orders/' + c._id, c).map(res => res.json());
    }

    getBitcoinRate() {
        return this.http.get('https://api.coindesk.com/v1/bpi/currentprice.json').map(res => res.json());

    }

    getProdbycat(){
        return this.http.get('http://localhost:3000/api/Prodbycat').map(res => res.json());
    }

    getMostRecommandedProduct(id){
        return this.http.get('http://localhost:3000/api/getMostRecommandedProduct/'+id).map(res => res.json());
    }

}
