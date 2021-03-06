'use strict';

//HTML elements by ID
//**********************************************************************************************
var storeTable = document.getElementById('sales_table');

var tossSchedule = document.getElementById('toss_schedule');

var form = document.getElementById('new_store');

//Global arrays
//**********************************************************************************************
var storeHours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];

var patsLocales = [];
//Creating base store instances
//**************************************************************************************
new Store('First and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

//"Helper" functions
//********************************************************************************************
function makeTable(){
  renderHeader();
  renderSales();
  renderFooter();

  schedHeader();
  renderSched();
}

//********************************************************************************************

function ranNum(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function renderSales() {
  for( var i = 0; i < patsLocales.length; i++) {
    patsLocales[i].render();
  }
}

function renderSched() {
  for( var i = 0; i < patsLocales.length; i++) {
    patsLocales[i].schedule();
  }
}

function formData() {

  event.preventDefault();

  var name = event.target.name.value;
  var min = event.target.min.value;
  var max = event.target.max.value;
  var avg = event.target.avg.value;

  new Store(name, min, max, avg);
  storeTable.innerHTML = '';
  tossSchedule.innerHTML = '';
  makeTable();



  form.reset();



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


};

//Prototype Methods
//********************************************************************************************
Store.prototype.calcHourlyCusts = function() {
  for( var i = 0; i < storeHours.length; i++) {
    this.custsPerHour.push(ranNum(this.custMinPerHour,this.custMaxPerHour))
  }
};

Store.prototype.calcSalesPerHour = function() {
  this.calcHourlyCusts();
  for(var i = 0; i < storeHours.length; i++) {
    var sales = (Math.ceil(this.custsPerHour[i] * this.avgCookPerCust));
    this.salesPerHour.push(sales);
    this.dailyTotalSales += sales;
  }
};

Store.prototype.render = function() {
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
//+++++++++++++++++++++++++++++++++++++++++++++++++++
//Stretch Goal table
//+++++++++++++++++++++++++++++++++++++++++++++++++++
Store.prototype.schedule = function() {
  var minToss = 2;
  var tdEl = document.createElement('td');
  var trEl = document.createElement('tr');
  tdEl.textContent = this.storeLocation;
  trEl.appendChild(tdEl);

  for(var i = 0; i < storeHours.length; i++) {
    var hourlies = this.custsPerHour[i];
    var tossPerHour = 0;
    while(hourlies >= 20) {
      hourlies = hourlies - 20;
      tossPerHour++;
    }
    if (tossPerHour > 2) {
      tdEl = document.createElement('td');
      tdEl.textContent = tossPerHour;
      trEl.appendChild(tdEl);
    } else {
      tdEl = document.createElement('td');
      tdEl.textContent = minToss;
      trEl.appendChild(tdEl);
    }
  }
  tossSchedule.appendChild(trEl);
};

//Hourly Sales total functions
//*********************************************************************************************
function renderFooter() {
  var tdEl = document.createElement('td');
  var trEl = document.createElement('tr');

  tdEl.textContent = 'Hourly Totals';
  trEl.appendChild(tdEl);

  for(var i = 0; i < storeHours.length;i++) {
    var sum = 0;
    for( var j = 0; j < patsLocales.length; j++) {
      sum += patsLocales[j].salesPerHour[i];
    }
    tdEl = document.createElement('td');
    tdEl.textContent = sum;
    trEl.appendChild(tdEl);
  }
  var totalSum = 0;
  for(var k = 0; k < patsLocales.length; k++){
    totalSum += patsLocales[k].dailyTotalSales;
    }
  tdEl = document.createElement('td');
  tdEl.textContent = totalSum;
  trEl.appendChild(tdEl);

  storeTable.appendChild(trEl);

}
//header function schedule
//*********************************************************************************************
function schedHeader() {
  var thEl = document.createElement('th');
  var trEl = document.createElement('tr');
  thEl.textContent = 'Location';
  trEl.appendChild(thEl);

  for( var i = 0; i < storeHours.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = storeHours[i];
    trEl.appendChild(thEl);
  }


  tossSchedule.appendChild(trEl);
}
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

//rendering Sales numbers
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
makeTable();
form.addEventListener('submit', formData);
