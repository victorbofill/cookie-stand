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

Store.prototype.createCookiesList = function() {
    const cookieSection = document.getElementById('cookiesection');

    const newStoreName = document.createElement('p');
    newStoreName.textContent = this.storeName;
    cookieSection.appendChild(newStoreName);

    const newUl = document.createElement('ul');
    cookieSection.appendChild(newUl);

    const liArray = [];
    for (let i = 0; i < 16; i++) {
        liArray.push(this.estCookiesPerHour[i]);
        const newLi = document.createElement('li');
        newLi.textContent = hours[i] + ': ' + this.estCookiesPerHour[i] + ' cookies';
        newUl.appendChild(newLi);
    }
};

const activateStore = function(object) {
    object.populateCookiesArray();
    object.createCookiesList();
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