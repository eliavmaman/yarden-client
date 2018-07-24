import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

import {Observable} from "rxjs/Observable";

import "rxjs/Rx";
import {Subject} from "rxjs/Subject";
import {Book} from "../models/Book";
import {Http, Response} from "@angular/http";


@Injectable()
export class GlobalService {

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

    constructor(private http: Http) {

    }

    getBooks(): Observable<Book[]> {

        return Observable.of(this.books);
    }


    addBook(book: Book) {

        let founded = this.books.find((b: Book) => {
            return b.title.toLowerCase() === book.title.toLowerCase();
        });
        if (founded) {
            this.bookSubject.next({books: this.books, error: 'Book with the same title already exist'});
            return;
        }
        book.id = this.books[this.books.length - 1].id++;
        this.books.push(book);


        this.bookSubject.next({books: this.books});
    }

    updateBook(book: Book) {


        let foundedBook = this.books.find((b) => {
            return b.id == book.id;
        });

        foundedBook.title = book.title;
        foundedBook.author = book.author;
        foundedBook.date = book.date;

        this.bookSubject.next({books: this.books});
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

    signup(email, password) {

        var data = {email: email, password: password};
        return this.http.post('http://localhost:3000/api/register', data).map(res => res.json());

    }

    signin(email, password) {

        var data = {email: email, password: password};
        return this.http.post('http://localhost:3000/api/login', data).map(res => res.json());

    }

    // GET
    getProducts() {
        return this.http.get('http://localhost:3000/api/products').map(res => res.json());
    }

    getUsers() {
        return this.http.get('http://localhost:3000/api/users').map(res => res.json());
    }

    getCategories() {
        return this.http.get('http://localhost:3000/api/categories').map(res => res.json());
    }

    getOrders() {
        return this.http.get('http://localhost:3000/api/orders').map(res => res.json());
    }

    // POST
    createProducts(p: any) {
        return this.http.post('http://localhost:3000/api/products', p).map(res => res.json());
    }

    createCategories(c: any) {
        return this.http.post('http://localhost:3000/api/categories', c).map(res => res.json());
    }

    createOrders(o) {
        return this.http.post('http://localhost:3000/api/orders', o).map(res => res.json());
    }


    //PUT
    updateProducts(p: any) {
        return this.http.put('http://localhost:3000/api/products/' + p._id, p).map(res => res.json());
    }

    updateCategories(c: any) {
        return this.http.put('http://localhost:3000/api/categories/' + c._id, c).map(res => res.json());
    }

}
