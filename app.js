'use strict';

var storeHours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];

//Objects containing store info
var pikeFirst = {
  storeLocation: 'First and Pike',
  custMin: 23,
  custMax: 65,
  avgCook: 6.3,
  sales: [],
  actCust: function(min,max) {
    return Math.floor(Math.random() * (this.custMax - this.custMin + 1) + this.custMin);
  }
}

var seaTac = {
  storeLocation: 'SeaTac Airport',
  custMin: 3,
  custMax: 24,
  avgCook: 1.2,
  sales: [],
  actCust: function(min,max) {
    return Math.floor(Math.random() * (this.custMax - this.custMin + 1) + this.custMin);
  }
}

var seaCenter = {
  storeLocation: 'Seattle Center',
  custMin: 11,
  custMax: 38,
  avgCook: 3.7,
  sales: [],
  actCust: function(min,max) {
    return Math.floor(Math.random() * (this.custMax - this.custMin + 1) + this.custMin);
  }
}

var capHill = {
  storeLocation: 'Capitol Hill',
  custMin: 20,
  custMax: 38,
  avgCook: 2.3,
  sales: [],
  actCust: function(min,max) {
    return Math.floor(Math.random() * (this.custMax - this.custMin + 1) + this.custMin);
  }
}

var alki = {
  storeLocation: 'Alki',
  custMin: 2,
  custMax: 16,
  avgCook: 4.6,
  sales: [],
  actCust: function(min,max) {
    return Math.floor(Math.random() * (this.custMax - this.custMin + 1) + this.custMin);
  }
}

//functions

//addition function
function sum(a,b) {
  return (a + b);
}
//function to determine number of cookies sold daily
function dailyTotal(storeLoc) {
    var arrSum = 0;

  for(var i =0; i <storeLoc.sales.length; i++) {
    arrSum = sum(arrSum,storeLoc.sales[i]);
    }
  return arrSum;
  console.log(arrSum);

}

//function to determine cookies sold every hour
function hourlySales(store) {
  for(var i = 0; i < storeHours.length; i++) {
    store.sales.push(getSales(store));
  }
  console.log(store);
}


function getSales(storeName) {
  return Math.ceil(storeName.actCust() * storeName.avgCook);
}

function printSales(store) {

  hourlySales(store);
  var totalSales = dailyTotal(store);



  var container = document.createElement('div');
  container.innerHTML = '<p>' + store.storeLocation + ' Hourly Sales</p>';
  document.body.appendChild(container);

  var salesList = document.createElement('ul');
  var listArr = [];

  for(var i = 0; i < storeHours.length; i++) {
    listArr.push('<li>' + storeHours[i] + ': ' + store.sales[i] + '</li>');
  }

  listArr.push('<li> Daily total: ' + totalSales + '</li>');
  var fullList = listArr.join('');

  salesList.innerHTML = fullList;
  document.body.appendChild(salesList);


}
