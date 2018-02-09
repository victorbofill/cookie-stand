'use strict';

const hours = [
    '', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm',
    '5:00pm', '6:00pm', '7:00pm', '8:00pm', 'Daily Location Total'
];

let renderedStores = [];

let hourTotal = ['Total Cookies Needed Per Hour'];

for (let i = 0; i < (hours.length - 2); i++) {
    hourTotal.push(0);
}

const createTable = function(id) {
    const cookieSection = document.getElementById('cookie-section');
    const table = document.createElement('table');
    cookieSection.appendChild(table);
    table.setAttribute('id', id);

    const tableHead = document.createElement('thead');
    table.appendChild(tableHead);

    const tableRow = document.createElement('tr');
    tableHead.appendChild(tableRow);

    for (let i = 0; i < hours.length; i++) {
        const tableCell = document.createElement('th');
        tableRow.appendChild(tableCell);
        tableCell.textContent = hours[i];
    }
};

const createTableFooter = function () {
    const table = document.getElementById('cookie-table');
    const tableFoot = document.createElement('tfoot');
    table.appendChild(tableFoot);

    const tableRow = document.createElement('tr');
    tableFoot.appendChild(tableRow);

    for (let i = 0; i < hourTotal.length; i++) {
        const tableCell = document.createElement('td');
        tableRow.appendChild(tableCell);
        tableCell.textContent = hourTotal[i];
    }
};

const removeTableFooter = function () {
    const tfoot = document.querySelector('tfoot');
    tfoot.remove();
};

function Store(storeName, minCust, maxCust, avgCookiesPerCust) {
    this.storeName = storeName;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgCookiesPerCust = avgCookiesPerCust;
    this.estCookiesPerHour = [];
    this.employees = ['Employees per hour',2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
};

Store.prototype.calcCookiesHour = function() {
    let totalCookies = 0;

    for (let i = 0; i < 15; i++) {
        const min = Math.ceil(this.minCust);
        const max = Math.floor(this.maxCust);
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        const cookiesPerHour = Math.floor(randomNumber * this.avgCookiesPerCust);

        this.estCookiesPerHour[i] = cookiesPerHour;
        totalCookies += this.estCookiesPerHour[i];
        hourTotal[(i + 1)] += cookiesPerHour;
    }

    this.estCookiesPerHour.push(totalCookies);
};

Store.prototype.calcEmployeesHour = function() {
    for (let i = 1; i < this.employees.length ; i++) {
        const calcEmployees = Math.ceil(this.estCookiesPerHour[(i - 1)] / 20);
        if (calcEmployees > 2) {
            this.employees[i] = calcEmployees;
        }
    }
};

Store.prototype.render = function () {
    const cookieSection = document.getElementById('cookie-table');
    let newTableRow = document.createElement('tr');
    cookieSection.appendChild(newTableRow);

    let newCell = document.createElement('td');
    newTableRow.appendChild(newCell);
    newCell.textContent = this.storeName;

    for (let i = 0; i < this.estCookiesPerHour.length; i++) {
        newCell = document.createElement('td');
        newTableRow.appendChild(newCell);
        newCell.textContent = this.estCookiesPerHour[i];
    }

    newTableRow = document.createElement('tr');
    cookieSection.appendChild(newTableRow);

    newCell = document.createElement('td');
    newTableRow.appendChild(newCell);
    newCell.textContent = this.employees[0];

    for (let i = 0; i < 15; i++) {
        newCell = document.createElement('td');
        newTableRow.appendChild(newCell);
        newCell.textContent = this.employees[i + 1];
    }
};

const renderStore = function(object) {
    object.calcCookiesHour();
    object.calcEmployeesHour();
    object.render();
    renderedStores.push(object.storeName);
};

const form = document.querySelector('form');

form.addEventListener('submit', function () {
    console.log('Submitted!');
    event.preventDefault();

    const newStore = new Store(
        this.storelocation.value,
        this.mincust.value,
        this.maxcust.value,
        this.avgcookiespercust.value);

    renderStore(newStore);
    removeTableFooter();
    createTableFooter();
});


const storePDX = new Store('PDX Airport', 23, 65, 6.3);
const storePioneer = new Store('Pioneer Square', 3, 24, 1.2);
const storePowells = new Store('Powell\'s', 11, 38, 3.7);
const storeStJohns = new Store('St. John\'s', 20, 38, 2.3);
const storeWaterfront = new Store('Waterfront', 2, 16, 4.6);

const buildCookieTable = function() {
    createTable('cookie-table');
    renderStore(storePDX);
    renderStore(storePioneer);
    renderStore(storePowells);
    renderStore(storeStJohns);
    renderStore(storeWaterfront);
    createTableFooter();
};

buildCookieTable();