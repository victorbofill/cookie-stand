'use strict';

// hours 6a-8p
// min customers per hour
// max customers per hour
// avg cookies per customer

// be able to add and remove locations
// easily modify internal data
// data presented nicely formatted

// design an entire front-end website

let storePDX = {
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
    for (let i = 0; i < 15; i++) {
        object.cookiesPurchasedPerHour[i] = object.custHour();
    }
}

const populateList = function(object) {
    const cookieSection = document.getElementById('cookieSection');
    const newList = [];
    for (let i = 0; i < 15; i++) {
        newList.push(object.cookiesPurchasedPerHour[i]);
    }
    
    cookieSection.appendChild(newList);
}