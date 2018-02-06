'use strict';

const hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm', 'Total']

let storePDX = {
    storeName: 'PDX Airport',
    minCust: 23,
    maxCust: 65,
    avgCookiesPerCust: 6.3,
    cookiesPurchasedPerHour: [],
    calcCookiesHour: function () {
        let min = Math.ceil(this.minCust);
        let max = Math.floor(this.maxCust);
        let randomNumber = Math.floor(Math.random() * (max - min +1)) + min;
        return Math.floor(randomNumber * this.avgCookiesPerCust);
    }
};

let storePioneer = {
    storeName: 'Pioneer Square',
    minCust: 3,
    maxCust: 24,
    avgCookiesPerCust: 1.2,
    cookiesPurchasedPerHour: [],
    calcCookiesHour: function () {
        let min = Math.ceil(this.minCust);
        let max = Math.floor(this.maxCust);
        let randomNumber = Math.floor(Math.random() * (max - min +1)) + min;
        return Math.floor(randomNumber * this.avgCookiesPerCust);
    }
}

let storePowells = {
    storeName: 'Powell\'s',
    minCust: 11,
    maxCust: 38,
    avgCookiesPerCust: 3.7,
    cookiesPurchasedPerHour: [],
    calcCookiesHour: function () {
        let min = Math.ceil(this.minCust);
        let max = Math.floor(this.maxCust);
        let randomNumber = Math.floor(Math.random() * (max - min +1)) + min;
        return Math.floor(randomNumber * this.avgCookiesPerCust);
    }
}

let storeStJohns = {
    storeName: 'St. John\'s',
    minCust: 20,
    maxCust: 38,
    avgCookiesPerCust: 2.3,
    cookiesPurchasedPerHour: [],
    calcCookiesHour: function () {
        let min = Math.ceil(this.minCust);
        let max = Math.floor(this.maxCust);
        let randomNumber = Math.floor(Math.random() * (max - min +1)) + min;
        return Math.floor(randomNumber * this.avgCookiesPerCust);
    }
}

let storeWaterfront = {
    storeName: 'Waterfront',
    minCust: 2,
    maxCust: 16,
    avgCookiesPerCust: 4.6,
    cookiesPurchasedPerHour: [],
    calcCookiesHour: function () {
        let min = Math.ceil(this.minCust);
        let max = Math.floor(this.maxCust);
        let randomNumber = Math.floor(Math.random() * (max - min +1)) + min;
        return Math.floor(randomNumber * this.avgCookiesPerCust);
    }
}

const createCookiesList = function(object) {
    let totalCookies = 0;

    for (let i = 0; i < 15; i++) {
        object.cookiesPurchasedPerHour[i] = object.calcCookiesHour();
        totalCookies += object.cookiesPurchasedPerHour[i];
    }

    object.cookiesPurchasedPerHour.push(totalCookies);

    const cookieSection = document.getElementById('cookiesection');

    const newStoreName = document.createElement('p');
    newStoreName.textContent = object.storeName;
    cookieSection.appendChild(newStoreName);

    const newUl = document.createElement('ul');
    cookieSection.appendChild(newUl);

    const liArray = [];
    for (let i = 0; i < 16; i++) {
        liArray.push(object.cookiesPurchasedPerHour[i]);
        const newLi = document.createElement('li');
        newLi.textContent = hours[i] + ': ' + object.cookiesPurchasedPerHour[i] + ' cookies';
        newUl.appendChild(newLi);
    }
}

createCookiesList(storePDX);
createCookiesList(storePioneer);
createCookiesList(storePowells);
createCookiesList(storeStJohns);
createCookiesList(storeWaterfront);