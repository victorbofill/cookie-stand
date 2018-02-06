'use strict';

const hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm', 'Total'];

const storePDX = {
    storeName: 'PDX Airport',
    minCust: 23,
    maxCust: 65,
    avgCookiesPerCust: 6.3,
    estCookiesPerHour: [],
    calcCookiesHour: function () {
        const min = Math.ceil(this.minCust);
        const max = Math.floor(this.maxCust);
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return Math.floor(randomNumber * this.avgCookiesPerCust);
    }
};

const storePioneer = {
    storeName: 'Pioneer Square',
    minCust: 3,
    maxCust: 24,
    avgCookiesPerCust: 1.2,
    estCookiesPerHour: [],
    calcCookiesHour: function () {
        const min = Math.ceil(this.minCust);
        const max = Math.floor(this.maxCust);
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return Math.floor(randomNumber * this.avgCookiesPerCust);
    }
};

const storePowells = {
    storeName: 'Powell\'s',
    minCust: 11,
    maxCust: 38,
    avgCookiesPerCust: 3.7,
    estCookiesPerHour: [],
    calcCookiesHour: function () {
        const min = Math.ceil(this.minCust);
        const max = Math.floor(this.maxCust);
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return Math.floor(randomNumber * this.avgCookiesPerCust);
    }
};

const storeStJohns = {
    storeName: 'St. John\'s',
    minCust: 20,
    maxCust: 38,
    avgCookiesPerCust: 2.3,
    estCookiesPerHour: [],
    calcCookiesHour: function () {
        const min = Math.ceil(this.minCust);
        const max = Math.floor(this.maxCust);
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return Math.floor(randomNumber * this.avgCookiesPerCust);
    }
};

const storeWaterfront = {
    storeName: 'Waterfront',
    minCust: 2,
    maxCust: 16,
    avgCookiesPerCust: 4.6,
    estCookiesPerHour: [],
    calcCookiesHour: function () {
        const min = Math.ceil(this.minCust);
        const max = Math.floor(this.maxCust);
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return Math.floor(randomNumber * this.avgCookiesPerCust);
    }
};

const createCookiesList = function(object) {
    let totalCookies = 0;

    for (let i = 0; i < 15; i++) {
        object.estCookiesPerHour[i] = object.calcCookiesHour();
        totalCookies += object.estCookiesPerHour[i];
    }

    object.estCookiesPerHour.push(totalCookies);

    const cookieSection = document.getElementById('cookiesection');

    const newStoreName = document.createElement('p');
    newStoreName.textContent = object.storeName;
    cookieSection.appendChild(newStoreName);

    const newUl = document.createElement('ul');
    cookieSection.appendChild(newUl);

    const liArray = [];
    for (let i = 0; i < 16; i++) {
        liArray.push(object.estCookiesPerHour[i]);
        const newLi = document.createElement('li');
        newLi.textContent = hours[i] + ': ' + object.estCookiesPerHour[i] + ' cookies';
        newUl.appendChild(newLi);
    }
};

createCookiesList(storePDX);
createCookiesList(storePioneer);
createCookiesList(storePowells);
createCookiesList(storeStJohns);
createCookiesList(storeWaterfront);