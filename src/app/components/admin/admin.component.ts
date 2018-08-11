import {Component, OnInit} from '@angular/core';
import {GlobalService} from "../../services/global.service";

declare var $: any;
//declare var d3: any;

import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import * as d3Shape from 'd3-shape';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    constructor(private service: GlobalService) {
    }

    //set private memebers
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
    searchText: '';
    searchCat: any;
    searchPrice: 0;
    categories: any;
    products: any;
    users: any;
    selectedCat: any;
    selctedProduct: any;
    selectedUser: any


    private width: number;
    private height: number;
    private margin = {top: 20, right: 20, bottom: 30, left: 40};

    private x: any;
    private y: any;
    private svg: any;
    private g: any;

    private radius: number;

    private arc: any;
    private pie: any;
    private color: any;

//Gender chart data
    data = [];

    ngOnInit() {
        $('.modal').hide();
        // $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();

        //get iniitial datat for the screen
        this.service.getCategories().subscribe((res) => {
            this.categories = res;
        });
        this.service.getProducts().subscribe((res) => {
            this.products = res;
            this.products.forEach((p) => {
                p.catName = p.category.name;
            });
        });
        this.service.getUsers().subscribe((res) => {
            this.users = res;
        });

    }

    ngAfterContentInit() {
        // get data for the charts
        this.service.getCategories().subscribe((cats: any) => {
            this.service.getProdbycat().subscribe((res: any) => {
                var data = [];
                if (res) {

                    res.forEach((r) => {
                        let cat = cats.find((c) => {
                            return c._id.toString() == r._id.toString()
                        });

                        data.push({name: cat.name, count: r.count});
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
                    .text("Products per category charts")
                    .attr("class", "title")
            });
        });
        this.service.groupByGender().subscribe((res) => {
            // res[0].count = 100;
            this.data = res;
            this.initSvg();
            this.drawChart(this.data);
            // this.initSvg();
            // this.initAxis();
            // this.drawAxis();
            // this.drawBars();
        })

    }

    // init the chart of gender
    private initSvg() {
        this.svg = d3.select('svg#byGender');

        this.width = +this.svg.attr('width');
        this.height = +this.svg.attr('height');
        this.radius = Math.min(this.width, this.height) / 2;

        this.color = d3Scale.scaleOrdinal()
            .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

        this.arc = d3Shape.arc()
            .outerRadius(this.radius - 10)
            .innerRadius(this.radius - 70);

        this.pie = d3Shape.pie()
            .sort(null)
            .value((d: any) => d.count);

        this.svg = d3.select('svg#byGender')
            .append('g')
            .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
    }
    private drawChart(data: any[]) {
        let g = this.svg.selectAll('.arc')
            .data(this.pie(data))
            .enter().append('g')
            .attr('class', 'arc');

        g.append('path')
            .attr('d', this.arc)
            .style('fill', d => this.color(d.data._id));

        g.append('text')
            .attr('transform', d => 'translate(' + this.arc.centroid(d) + ')')
            .attr('dy', '.35em')
            .text(d => d.data.count + ' - ' + d.data._id);
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
        if (!this.newProduct.category) {
            alert('Please select category');
            return false;
        }
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
