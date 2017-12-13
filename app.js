'use strict';


//Helper functions
//**********************************************************************************************

function ranNum(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//declaring variable to
var storeTable = document.getElementById('sales_table');


function renderSales() {
  for( var i = 0; i < patsLocales.length; i++) {
    patsLocales[i].render();
  }
}

//Global arrays
//**********************************************************************************************
var storeHours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];

var patsLocales = [];

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
    }
  };
  this.calcSalesPerHour = function() {
    this.calcHourlyCusts();
    for(var i = 0; i < storeHours.length; i++) {
      var sales = (Math.ceil(this.custsPerHour[i] * this.avgCookPerCust));
      this.salesPerHour.push(sales);
      this.dailyTotalSales += sales;
      }
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

    tdEl = document.createElement('td');
    tdEl.textContent = this.dailyTotalSales;
    trEl.appendChild(tdEl);

    storeTable.appendChild(trEl);
  };

};


//header function
//*********************************************************************************************
function renderHeader() {
  var thEl = document.createElement('th');
  var trEl = document.createElement('tr');
  thEl.textContent = 'Location';
  trEl.appendChild(thEl);

  for( var i = 0; i < storeHours.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = storeHours[i];
    trEl.appendChild(thEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = 'Total';
  trEl.appendChild(thEl);

  storeTable.appendChild(trEl)
}

//Creating new store instances
//**************************************************************************************
new Store('First and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

//rendering Sales numbers
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
renderHeader();
renderSales();
