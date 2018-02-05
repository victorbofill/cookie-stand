'use strict';

// hours 6a-8p
// min customers per hour
// max customers per hour
// avg cookies per customer

// be able to add and remove locations
// easily modify internal data
// data presented nicely formatted

// design an entire front-end website

const hours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm']

let storePDX = {
    storeName: 'PDX Airport',
    minCust: 23,
    maxCust: 65,
    avgCookiesPerCust: 6.3,
    custHour: function() {
        const min = Math.ceil(this.minCust);
        const max = Math.floor(this.maxCust);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
     cookiesPurchasedPerHour: []
};

const calculateCookiesPerHour = function(object) {
    let totalCookies = 0;
    for (let i = 0; i < 15; i++) {
        object.cookiesPurchasedPerHour[i] = object.custHour();
        totalCookies += object.cookiesPurchasedPerHour[i];
    }

    object.cookiesPurchasedPerHour.push(totalCookies);
}

const populateList = function(object) {
    const cookieSection = document.getElementById('cookiesection');

    const newStoreName = document.createElement('p');
    newStoreName.textContent = object.storeName;
    cookieSection.appendChild(newStoreName);

    const newUl = document.createElement('ul');
    cookieSection.appendChild(newUl);

    const liArray = [];
    for (let i = 0; i < 15; i++) {
        liArray.push(object.cookiesPurchasedPerHour[i]);
        const newLi = document.createElement('li');
        newLi.textContent = hours[i] + ': ' + object.cookiesPurchasedPerHour[i] + ' cookies';
        newUl.appendChild(newLi);
    }
}

calculateCookiesPerHour(storePDX);
populateList(storePDX);