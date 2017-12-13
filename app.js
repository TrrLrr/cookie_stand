'use strict';


//Helper functions and arrays
//**********************************************************************************************
var storeHours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];

function ranNum(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var storeTable = document.getElementById('sales_table');

var patsLocales = [];

function renderSales() {
  for( var i = 0; i < patsLocales.length; i++) {
    patsLocales[i].render();
  }
}


//Constructor function
//**********************************************************************************************

function Store(storeLocation, custMinPerHour, custMaxPerHour, avgCookPerCust) {
  this.storeLocation = storeLocation;
  this.custMinPerHour = custMinPerHour;
  this.custMaxPerHour = custMaxPerHour;
  this.avgCookPerCust = avgCookPerCust;
  this.salesPerHour = [];
  this.custsPerHour = [];
  this.dailyTotalSales = 0;
  patsLocales.push(this);
  this.calcHourlyCusts = function() {
    for( var i = 0; i < storeHours.length; i++) {
      this.custsPerHour.push(ranNum(this.custMinPerHour,this.custMaxPerHour))
    };
  };
  this.calcSalesPerHour = function() {
    this.calcHourlyCusts();
    for(var i = 0; i < storeHours.length; i++) {
      this.salesPerHour.push(Math.ceil(this.custsPerHour[i] * this.avgCookPerCust))
    };
  };

  this.render = function() {
    this.calcSalesPerHour();
    var tdEl = document.createElement('td');
    var trEl = document.createElement('tr');
    tdEl.textContent = this.storeLocation;
    trEl.appendChild(tdEl);

    for(var i = 0; i < storeHours.length; i++) {
      tdEl = document.createElement('td');
      tdEl.textContent = this.salesPerHour[i];
      trEl.appendChild(tdEl);
    }

    storeTable.appendChild(trEl);
  };

};


new Store('First and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);

renderSales();
