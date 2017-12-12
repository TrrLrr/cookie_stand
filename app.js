'use strict';

var storeHours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

var pikeFirst = {
  custMin: 23,
  custMax: 65,
  avgCook: 6.3,
  sales: [],
  actCust: function(min,max) {
    return Math.floor(Math.random() * (this.custMax - this.custMin) + this.custMin);
  }
}

var seaTac = {
  custMin: 3,
  custMax: 24,
  avgCook: 1.2,
  sales: [],
  actCust: function(min,max) {
    return Math.floor(Math.random() * (this.custMax - this.custMin) + this.custMin);
  }
}

var seaCenter = {
  custMin: 11,
  custMax: 38,
  avgCook: 3.7,
  sales: [],
  actCust: function(min,max) {
    return Math.floor(Math.random() * (this.custMax - this.custMin) + this.custMin);
  }
}

var capHill = {
  custMin: 20,
  custMax: 38,
  avgCook: 2.3,
  sales: [],
  actCust: function(min,max) {
    return Math.floor(Math.random() * (this.custMax - this.custMin) + this.custMin);
  }
}

var alki = {
  custMin: 2,
  custMax: 16,
  avgCook: 4.6,
  sales: [],
  actCust: function(min,max) {
    return Math.floor(Math.random() * (this.custMax - this.custMin) + this.custMin);
  }
}

function getSales(storeName) {
  return Math.floor(storeName.actCust() * storeName.avgCook);
}

function hourlySales(store) {
  for(var i = 0; i < storeHours.length; i++) {
    store.sales.push(getSales(store));
  }
  console.log(store);
}
