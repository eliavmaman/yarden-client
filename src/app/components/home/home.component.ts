import {Component, OnInit} from '@angular/core';
import {ViewChild} from "@angular/core";
import {NotificationsComponent} from "../notifications/notifications.component";
import {GlobalService} from "../../services/global.service";
import {Authervice} from "../../services/auth.service";

declare var google: any;
declare var brain: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    // get referance to notification component
    @ViewChild('notification') notification: NotificationsComponent;
    addedSuccess: boolean = false;
    products: any[];
    selectedProduct: any;
    searchText: '';
    searchCat: any;
    searchPrice: 0;
    mlp: any;


    alertType: string;
    alertMessage: string;
    alertClass: string;
    user: any;

    constructor(private service: GlobalService, private auth: Authervice) {

        //get user data
        this.user = this.auth.getUser();
    }

    getUniqNuber() {
        return new Date().getTime();
    }

    ngOnInit() {
        let productsHash = {};
        //get data for machine learning
        this.service.getProducts().subscribe((res) => {
            this.products = res;
            let i = 1;
            this.products.forEach((p) => {
                productsHash[p._id] = this.getUniqNuber() + i * 15;
                p.catName = p.category.name;
                i++;

            });

            if (this.user) {
                // this.service.getMlProduct(this.user._id).subscribe((res) => {
                //     this.mlp = res;
                // });
                //let id = req.params.id;
                let userProducts = [];
                let trainData = [];
                this.service.getUserOrders(this.user._id).subscribe((orders) => {
                    orders.forEach((o) => {
                        console.log('start 1')
                        o.products.forEach((p) => {
                            userProducts.push(p);
                            // trainData.push({input: {name: p.name, price: p.price}, output: {goodProduct: 1}});
                            trainData.push({input: [productsHash[p._id]], output: [1]});
                        });

                    });
                    let allProducts = [];

                    allProducts = this.products;
                    this.products.forEach((p) => {
                        console.log('start 2')


                        if (!productsHash[p._id]) {
                            console.log('NOT EXIST ------' + JSON.stringify(p));
                            //trainData.push({input: {name: p.name, price: p.price}, output: {goodProduct: 0}});
                            productsHash[p._id] = this.getUniqNuber();
                            trainData.push({input: [productsHash[p._id]], output: [0]});
                        }
                    });

                    let net = new brain.NeuralNetwork();

                    console.log('TRAIN DATA ___________');
                    console.log(trainData);
                    if (trainData.length > 0) {
                        net.train(trainData);


                        let bestProduct;
                        let bestProductPredicate = 0;
                        let output;
                        allProducts.forEach((p) => {

                            console.log('test ------ ');
                            console.log({name: p.name, price: p.price});
                            //output = net.run({_id: p._id, name: p.name, price: p.price});
                            output = net.run([productsHash[p._id]]);
                            console.log('output ------' + output);
                            if (output > bestProductPredicate) {
                                bestProductPredicate = output;
                                this.mlp = p;
                            }

                        });


                        console.log('best product-' + JSON.stringify(bestProduct));
                    }


                });


            }
        });

    }


    //add the product to the busket
    addProduct(p: any) {
        this.service.addProductToBasket(p);
        this.addedSuccess = true;
        setTimeout(() => this.addedSuccess = false, 2000);

    }

    ngAfterContentInit() {

        //get location from the server from google map
        this.service.getLocations().subscribe((locations) => {
            var geocoder;
            var map;
            var bounds = new google.maps.LatLngBounds();

            function initialize() {
                map = new google.maps.Map(
                    document.getElementById("map_canvas"), {
                        center: new google.maps.LatLng(37.4419, -122.1419),
                        zoom: 13,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });
                geocoder = new google.maps.Geocoder();

                for (let i = 0; i < locations.length; i++) {


                    geocodeAddress(locations, i);
                }
            }

            google.maps.event.addDomListener(window, "load", initialize);

            function geocodeAddress(locations, i) {
                var title = locations[i][0];
                var address = locations[i][1];
                var url = locations[i][2];
                geocoder.geocode({
                        'address': locations[i][1]
                    },

                    function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            var marker = new google.maps.Marker({
                                icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
                                map: map,
                                position: results[0].geometry.location,
                                title: title,
                                animation: google.maps.Animation.DROP,
                                address: address,
                                url: url
                            })
                            infoWindow(marker, map, title, address, url);
                            bounds.extend(marker.getPosition());
                            map.fitBounds(bounds);
                        } else {
                            alert("geocode of " + address + " failed:" + status);
                        }
                    });
            }

            function infoWindow(marker, map, title, address, url) {
                google.maps.event.addListener(marker, 'click', function () {
                    var html = "<div><h3>" + title + "</h3><p>" + address + "<br></div><a href='" + url + "'>View location</a></p></div>";
                    let iw = new google.maps.InfoWindow({
                        content: html,
                        maxWidth: 350
                    });
                    iw.open(map, marker);
                });
            }

            // function createMarker(results) {
            //     var marker = new google.maps.Marker({
            //         icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
            //         map: map,
            //         position: results[0].geometry.location,
            //         title: title,
            //         animation: google.maps.Animation.DROP,
            //         address: address,
            //         url: url
            //     })
            //     bounds.extend(marker.getPosition());
            //     map.fitBounds(bounds);
            //     infoWindow(marker, map, title, address, url);
            //     return marker;
            // }
        })


    }

}
