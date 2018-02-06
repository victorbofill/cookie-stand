'use strict';

const hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm', 'Total'];

function Store(storeName, minCust, maxCust, avgCookiesPerCust) {
    this.storeName = storeName;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgCookiesPerCust = avgCookiesPerCust;
    this.estCookiesPerHour = [];
};

Store.prototype.calcCookiesHour = function() {
    const min = Math.ceil(this.minCust);
    const max = Math.floor(this.maxCust);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.floor(randomNumber * this.avgCookiesPerCust);
};

Store.prototype.populateCookiesArray = function() {
    let totalCookies = 0;

    for (let i = 0; i < 15; i++) {
        this.estCookiesPerHour[i] = this.calcCookiesHour();
        totalCookies += this.estCookiesPerHour[i];
    }

    this.estCookiesPerHour.push(totalCookies);
};

Store.prototype.createCookieTable = function () {
    const cookieSection = document.getElementById('cookie-table');
    const newTableRow = document.createElement('tr');
    cookieSection.appendChild(newTableRow);

    let newCell = document.createElement('td');
    newTableRow.appendChild(newCell);
    newCell.textContent = this.storeName;

    for (let i = 0; i < this.estCookiesPerHour.length; i++) {
        newCell = document.createElement('td');
        newTableRow.appendChild(newCell);
        newCell.textContent = this.estCookiesPerHour[i];
    }
};

const activateStore = function(object) {
    object.populateCookiesArray();
    object.createCookieTable();
};

const storePDX = new Store('PDX Airport', 23, 65, 6.3);
const storePioneer = new Store('Pioneer Square', 3, 24, 1.2);
const storePowells = new Store('Powell\'s', 11, 38, 3.7);
const storeStJohns = new Store('St. John\'s', 20, 38, 2.3);
const storeWaterfront = new Store('Waterfront', 2, 16, 4.6);

activateStore(storePDX);
activateStore(storePioneer);
activateStore(storePowells);
activateStore(storeStJohns);
activateStore(storeWaterfront);