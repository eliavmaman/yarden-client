import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";

declare var $: any;
import * as d3 from 'd3';
@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    constructor(private service: GlobalService) {
    }

    newCat = {
        name: ''
    };

    newProduct = {
        name: '',
        price: '',
        category: '',
        image: ''
    };

    newUser = {
        email: '',
        password: ''
    };

    categories: any;
    products: any;
    users: any;
    selectedCat: any;
    selctedProduct: any;
    selectedUser: any

    ngOnInit() {
        $('.modal').hide();
        // $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        this.service.getCategories().subscribe((res) => {
            this.categories = res;
        });
        this.service.getProducts().subscribe((res) => {
            this.products = res;
        });
        this.service.getUsers().subscribe((res) => {
            this.users = res;
        });

    }

    ngAfterContentInit() {
        this.service.getCategories().subscribe((cats: any) => {
            this.service.getProdbycat().subscribe((res: any) => {
                var data = [];
                if (res) {

                    res.forEach((r) => {
                        let cat = cats.find((c) => {
                            return c._id.toString() == r._id.toString()
                        });

                        data.push({name:cat.name,count:r.count});
                    })
                }
                var svg = d3.select("svg"),
                    width = parseInt(svg.attr("width")),
                    height = parseInt(svg.attr("height")),
                    radius = Math.min(width, height) / 2;

                var g = svg.append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);

                var pie = d3.pie().value(function (d: any) {
                    return d.count;
                });

                var path: any = d3.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0);

                var label = d3.arc()
                    .outerRadius(radius)
                    .innerRadius(radius - 80);

                var arc = g.selectAll(".arc")
                    .data(pie(data))
                    .enter().append("g")
                    .attr("class", "arc");

                arc.append("path")
                    .attr("d", path)
                    .attr("fill", function (d: any) {
                        return color(d.data.name);
                    });

                console.log(arc)

                arc.append("text")
                    .attr("transform", function (d: any) {
                        return "translate(" + label.centroid(d) + ")";
                    })
                    .text(function (d: any) {
                        return d.data.name;
                    });

                svg.append("g")
                    .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
                    .append("text")
                    .text("Browser use statistics - Jan 2017")
                    .attr("class", "title")
            });
        });



    }

// CATEGORIES
    selectCat(cat: any) {
        this.selectedCat = cat;
    }

    deleteCat(cat: any) {
        this.service.deleteCategories(cat).subscribe((res) => {
            this.ngOnInit();
        })
    }

    createCat() {
        this.service.createCategories(this.newCat).subscribe((res) => {
            this.ngOnInit();
        })
    }

    updateCategory() {
        this.service.updateCategory(this.selectProduct).subscribe((res) => {
            this.ngOnInit();
        })
    }


    // PRODUCTS
    selectProduct(p: any) {
        this.selctedProduct = p;
    }

    deleteProduct(p: any) {
        this.service.deleteProducts(p).subscribe((res) => {
            this.ngOnInit();
        })
    }

    createProduct() {
        this.service.createProducts(this.newProduct).subscribe((res) => {
            this.ngOnInit();
        })
    }

    updateProduct() {
        this.service.updateProducts(this.selctedProduct).subscribe((res) => {
            this.ngOnInit();
        })
    }

    // USERS
    selectUser(u: any) {
        this.selectedUser = u;
    }

    deleteUser(u: any) {
        this.service.deleteUser(u).subscribe((res) => {
            this.ngOnInit();
        })
    }

    createUser() {
        this.service.createUser(this.newUser).subscribe((res) => {
            this.ngOnInit();
        })
    }

    updateUser() {
        this.service.updateUser(this.selectedUser).subscribe((res) => {
            this.ngOnInit();
        })
    }


}
