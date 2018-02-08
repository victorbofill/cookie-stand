'use strict';


/*

code review goal: find out how we're updating the hourly totals of cookies when we add a new store!


*/

const hours = [
    '', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm',
    '5:00pm', '6:00pm', '7:00pm', '8:00pm', 'Daily Location Total'
];

const hourTotal = ['Total Cookies Needed Per Hour',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

const createTable = function(id) {
    const cookieSection = document.getElementById('cookie-section');
    const table = document.createElement('table');
    cookieSection.appendChild(table);
    table.setAttribute('id', id);

    const tableHead = document.createElement('thead');
    table.appendChild(tableHead);

    const tableRow = document.createElement('tr');
    tableHead.appendChild(tableRow);
    // console.log('this table row is: ', tableRow);

    for (let i = 0; i < hours.length; i++) {
        const tableCell = document.createElement('th');
        tableHead.appendChild(tableCell);
        tableCell.textContent = hours[i];
    }
};

// step 1: we found where the row is being created
// this function creates the footer row
const createTableFooter = function () {
    const table = document.getElementById('cookie-table');
    const tableFoot = document.createElement('tfoot');
    table.appendChild(tableFoot);

    const tableRow = document.createElement('tr');
    tableFoot.appendChild(tableRow);
    // console.log('this row is:', tableRow);

    for (let i = 0; i < hourTotal.length; i++) {
        const tableCell = document.createElement('td');
        tableRow.appendChild(tableCell);
        tableCell.textContent = hourTotal[i];
        // step 2: we found where the relevant data is being held
        // hourTotal = where we're getting the updated data from
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
        // cookesPerHour = 201

        // const cookiesPerHour = estimation;
        this.estCookiesPerHour[i] = cookiesPerHour; // estCookiesPerHour = [201]
        totalCookies += this.estCookiesPerHour[i]; // totalCookies = 201
        // totalCookies = totalCookies + 201;

        // step 5: we found the line that updates the hourTotal data!
        // this is where we update our hourTotal array!
        hourTotal[(i + 1)] += cookiesPerHour; // hourTotal = [211]
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
    // step 4: we found the function that changes the data in our hourTotal array
    object.calcCookiesHour();
    object.calcEmployeesHour();
    object.render();
};

const form = document.querySelector('form');

form.addEventListener('submit', function () {
    console.log('Submitted!');
    event.preventDefault();

    const newStore = new Store(
        form.storelocation.value,
        this.mincust.value,
        this.maxcust.value,
        this.avgcookiespercust.value
    );

    
    // possibly where data is updated?
    renderStore(newStore);
    
    // we assume removes footer so we can add it again
    removeTableFooter();

    // step 3: we found where the function that adds the data to our html is called
    // calling the function that adds info to footer
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