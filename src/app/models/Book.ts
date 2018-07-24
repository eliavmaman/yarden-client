export class Book {
    id: number;
    author: string;
    title: string;
    date: Date

    static counter = 0;

    constructor(_id: number, _author: string, _title: string, _date: Date) {
        this.id = _id;
        this.author = _author;
        this.title = _title;
        this.date = _date;
    }
}
