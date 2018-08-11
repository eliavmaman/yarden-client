import {Component, OnInit, Input} from '@angular/core';
import {GlobalService} from "../../services/global.service";
import {Authervice} from "../../services/auth.service";
import * as d3 from 'd3';

@Component({
    selector: 'app-my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.css']

})
export class MyOrdersComponent implements OnInit {
    orders: any[];
    user: any = {};
    mostRecomand: any = null;


    constructor(private auth: Authervice, private service: GlobalService) {
        this.user = this.auth.getUser();
        this.service.getUserOrders(this.user._id);

        this.service.getUserOrders(this.user._id).subscribe((res) => {
            this.orders = res;
            this.getMostRecomanded()
        })
    }

    getMostRecomanded() {
        let prodIds = [];
        let prods= [];
        this.orders.forEach((o) => {
            o.products.forEach((p) => {
                prodIds.push(p._id);
                prods.push(p);
            })
        });

        function mode(array) {
            if (array.length == 0)
                return null;
            var modeMap = {};
            var maxEl = array[0], maxCount = 1;
            for (var i = 0; i < array.length; i++) {
                var el = array[i];
                if (modeMap[el] == null)
                    modeMap[el] = 1;
                else
                    modeMap[el]++;
                if (modeMap[el] > maxCount) {
                    maxEl = el;
                    maxCount = modeMap[el];
                }
            }
            return maxEl;
        }

        let prodId = mode(prodIds);
        prods.forEach((p) => {
            if (p._id == prodId) {
                this.mostRecomand = p;
            }
        })


    }

    ngOnChanges() {

    }

    ngOnInit() {

    }

    ngAfterContentInit() {

        // this.service.getMostRecommandedProduct((this.user._id).subscribe((res: any) => {
        //     // var data = [];
        //     // if (res) {
        //     //
        //     //     res.forEach((r) => {
        //     //         let cat = cats.find((c) => {
        //     //             return c._id.toString() == r._id.toString()
        //     //         });
        //     //
        //     //         data.push({name: cat.name, count: r.count});
        //     //     })
        //     // }
        //     // var svg = d3.select("svg"),
        //     //     width = parseInt(svg.attr("width")),
        //     //     height = parseInt(svg.attr("height")),
        //     //     radius = Math.min(width, height) / 2;
        //     //
        //     // var g = svg.append("g")
        //     //     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        //     //
        //     // var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);
        //     //
        //     // var pie = d3.pie().value(function (d: any) {
        //     //     return d.count;
        //     // });
        //     //
        //     // var path: any = d3.arc()
        //     //     .outerRadius(radius - 10)
        //     //     .innerRadius(0);
        //     //
        //     // var label = d3.arc()
        //     //     .outerRadius(radius)
        //     //     .innerRadius(radius - 80);
        //     //
        //     // var arc = g.selectAll(".arc")
        //     //     .data(pie(data))
        //     //     .enter().append("g")
        //     //     .attr("class", "arc");
        //     //
        //     // arc.append("path")
        //     //     .attr("d", path)
        //     //     .attr("fill", function (d: any) {
        //     //         return color(d.data.name);
        //     //     });
        //     //
        //     // console.log(arc)
        //     //
        //     // arc.append("text")
        //     //     .attr("transform", function (d: any) {
        //     //         return "translate(" + label.centroid(d) + ")";
        //     //     })
        //     //     .text(function (d: any) {
        //     //         return d.data.name;
        //     //     });
        //     //
        //     // svg.append("g")
        //     //     .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
        //     //     .append("text")
        //     //     .text("Browser use statistics - Jan 2017")
        //     //     .attr("class", "title")
        // }));

    }
}
