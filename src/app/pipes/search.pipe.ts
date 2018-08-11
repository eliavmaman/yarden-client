import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterByNamePipe implements PipeTransform {
    transform(items: any, term: any): any {
        if (term === undefined) {
            return items;
        }

        return items.filter(function (item) {
            return item.name.toLowerCase().includes(term.toLowerCase());
        });
    }
}

@Pipe({
    name: 'filterCat'
})
export class FilterByCategoryPipe implements PipeTransform {
    transform(items: any, term: any): any {
        if (term === undefined) {
            return items;
        }

        return items.filter(function (item) {
            return item.catName.toLowerCase().includes(term.toLowerCase());
        });
    }
}

@Pipe({
    name: 'filterByPrice'
})
export class FilterByPricePipe implements PipeTransform {
    transform(items: any, term: any): any {
        if (!term) {
            return items;
        }

        return items.filter(function (item) {
            return item.price < parseInt(term);
        });
    }
}