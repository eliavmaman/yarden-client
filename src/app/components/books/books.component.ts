import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {Book} from "../../models/Book";
import {AddUpdateBookComponent} from "../add-update-book/add-update-book.component";
import {NotificationsComponent} from "../notifications/notifications.component";
import {ConfirmationModalComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {AfterViewInit} from "@angular/core";


@Component({
    selector: 'books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit {
    @ViewChild('addUpdateModal') addUpdateModal: AddUpdateBookComponent;
    @ViewChild('notification') notification: NotificationsComponent;
    @ViewChild('confirm1') confirm: ConfirmationModalComponent;
    books: Book[];
    selectedBook: Book;
    bookToDelete: Book;

    alertType: string;
    alertMessage: string;
    alertClass: string;

    constructor(private service: GlobalService) {
        this.service.booksListOnUpdate().subscribe((data: any) => {
            this.setNotification(data.error);
            this.notification.show();
            this.books = data.books;
            this.bookToDelete = null;
        });

    }

    setNotification(error: any) {
        this.alertClass = error ? 'alert-danger' : 'alert-success';
        this.alertType = error ? 'Error' : 'Success';
        this.alertMessage = error || 'Books list was updated successfully';

    }

    ngOnInit() {
        this.service.getBooks().subscribe((books: Book[]) => {
            this.books = books;
        });

    }

    ngAfterViewInit() {
        this.confirm.onClose.subscribe(result => {
            if (result === true) {
                this.service.deleteBook(this.bookToDelete);
            }
        });
    }

    onEdit(book: Book) {
        this.selectedBook = book;
        this.addUpdateModal.openModal(this.selectedBook);
    }

    onDelete(book: Book) {
        this.bookToDelete = book;
        this.confirm.showConfirmationModal('Are you sure?', 'delete ' + book.title + '?');

    }


}
